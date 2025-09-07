import { Prisma, type PrismaClient } from "@/generated/prisma";
import { inputAgregarActa, inputEliminarActa, inputEliminarActas, inputVisibilidadActa, inputVisibilidadActas } from "@/shared/filters/admin-actas-filter.schema";
import { z } from "zod";

type InputAgregarActa = z.infer<typeof inputAgregarActa>;
export const agregarActa = async (ctx: { db: PrismaClient }, input: InputAgregarActa) => {
  try {
    const acta = await ctx.db.$transaction(async (tx) => {

        await tx.acta.updateMany({
          data: {
            estado: 'CERRADA',
          },
          where: {
            estado: 'ABIERTA',
          }
        });

      const nombreActa = new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(input.fechaReunion)
        .replaceAll("/","-");

      const acta = await tx.acta.create({
        data: {
          nombreActa,
          fechaReunion: input.fechaReunion
        },
      });

      return acta;
    });

    return acta;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("El código de acta ya existe");
      }
    }

    throw new Error("Error agregando acta");
  }
};

type InputEliminarActa = z.infer<typeof inputEliminarActa>;
export const eliminarActasHasta = async (ctx: { db: PrismaClient }, input: InputEliminarActa) => {
  try {
    const lte = endOfDay(input.fechaReunion);
    const filas = await ctx.db.$queryRaw<{ nombreActa: string }[]>`
      DELETE FROM "Acta"
      WHERE "fechaReunion" <= ${lte}
        AND "estado" = 'CERRADA'
      RETURNING "nombreActa";
    `;
    return { count: filas.length, names: filas.map(f => f.nombreActa) };
  } catch (error) {
    throw new Error(`Error eliminando actas hasta la fecha: ${input.fechaReunion}`);
  }
}

export const eliminarActasIgual = async (ctx: { db: PrismaClient }, input: InputEliminarActa) => {
  try {
    const { start, next } = dayRangeUTC(input.fechaReunion);
    const filas = await ctx.db.$queryRaw<{ nombreActa: string }[]>`
      DELETE FROM "Acta"
      WHERE "fechaReunion" >= ${start}
        AND "fechaReunion" <  ${next}
        AND "estado" = 'CERRADA'
      RETURNING "nombreActa";
    `;
    return { count: filas.length, names: filas.map(f => f.nombreActa) };
  } catch {
    throw new Error(`Error eliminando actas del día ${input.fechaReunion.toISOString().slice(0,10)}`);
  }
};

type InputEliminarActas = z.infer<typeof inputEliminarActas>;
export const eliminarActasEntre = async (ctx: { db: PrismaClient }, input: InputEliminarActas) => {
  try {
    const start = input.fechaInicio ? dayRangeUTC(input.fechaInicio).start : null;
    const end = dayRangeUTC(input.fechaFin).next;

    const filas = start
      ? await ctx.db.$queryRaw<{ nombreActa: string }[]>`
          DELETE FROM "Acta"
          WHERE "fechaReunion" >= ${start}
            AND "fechaReunion" <  ${end}
            AND "estado" = 'CERRADA'
          RETURNING "nombreActa";
        `
      : await ctx.db.$queryRaw<{ nombreActa: string }[]>`
          DELETE FROM "Acta"
          WHERE "fechaReunion" < ${end}
            AND "estado" = 'CERRADA'
          RETURNING "nombreActa";
        `;
    return { count: filas.length, names: filas.map(f => f.nombreActa) };
  } catch (error) {
    throw new Error(`Error eliminando actas hasta/entre fechas: ${(error as Error).message}`);
  }
}

export const getActaAbierta = async (ctx: { db: PrismaClient }) => {
  try {
    const acta = await ctx.db.$transaction(async (tx) => {
      return tx.acta.findFirst({
        where: {
          estado: "ABIERTA",
        },
      });
    });

    return acta;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("No existe Acta");
      }
    }
    throw error;
  }
};

type InputVisibilidadActas = z.infer<typeof inputVisibilidadActas>;
export const visibilidadActasEntre = async (ctx: { db: PrismaClient }, input: InputVisibilidadActas) => {
  try {
    const gte = input.fechaInicio ? startOfDay(input.fechaInicio) : undefined;
    const lte = endOfDay(input.fechaFin);

    const where = input.fechaInicio
      ? { fechaReunion: { gte, lte } }
      : { fechaReunion: { lte } };

    const res = await ctx.db.acta.updateMany({
      where,
      data: { visibilidad: input.visibilidad },
    });
    return res;
  } catch (error) {
    throw new Error(`Error actualizando actas entre fechas: ${(error as Error).message}`);
  }
}

type InputVisibilidadActa = z.infer<typeof inputVisibilidadActa>;
export const visibilidadActaHasta = async (ctx: { db: PrismaClient }, input: InputVisibilidadActa) => {
  try {
    const lte = endOfDay(input.fechaReunion);
    const res = await ctx.db.$executeRaw`
      UPDATE "Acta"
      SET "visibilidad" = ${input.visibilidad}::"Visibilidad"
      WHERE "fechaReunion" <= ${lte}
        AND "estado" = 'CERRADA';

    `;
    return { count: res };
  } catch (error) {
    throw new Error(`Error actualizando actas hasta ${input.fechaReunion}`);
  }
}

export const visibilidadActaIgual = async (ctx: { db: PrismaClient }, input: InputVisibilidadActa) => {
  try {
    const { start, next } = dayRangeUTC(input.fechaReunion);
    const count = await ctx.db.$executeRaw`
      UPDATE "Acta"
      SET "visibilidad" = ${input.visibilidad}::"Visibilidad"
      WHERE "fechaReunion" >= ${start}
        AND "fechaReunion" <  ${next}
        AND "estado" = 'CERRADA';
    `;
    return { count };
  } catch {
    throw new Error(`Error actualizando visibilidad del día ${input.fechaReunion.toISOString().slice(0,10)}`);
  }
};

export const getVotosFromActaAbierta = async (
  ctx: { db: PrismaClient },
  id: number
) => {
  return ctx.db.voto.findMany({
    where: { actaId: id, acta: { estado: "ABIERTA" } },
    orderBy: { fechaEmision: "desc" },
  });
};

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const endOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};

function dayRangeUTC(d: Date) {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const day = d.getUTCDate();
  const start = new Date(Date.UTC(y, m, day, 0, 0, 0, 0));
  const next  = new Date(Date.UTC(y, m, day + 1, 0, 0, 0, 0));
  return { start, next };
}
