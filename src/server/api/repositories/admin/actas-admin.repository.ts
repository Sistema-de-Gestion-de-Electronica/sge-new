import { Prisma, type PrismaClient } from "@/generated/prisma";
import { inputActualizarActa, inputAgregarActa, inputEliminarActa, inputEliminarActas } from "@/shared/filters/admin-actas-filter.schema";
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
export const eliminarActa = async (ctx: { db: PrismaClient }, input: InputEliminarActa) => {
  try {
    const acta = await ctx.db.acta.deleteMany({
      where: {
        fechaReunion: input.fechaReunion,
      },
    });
    return acta;
  } catch (error) {
    throw new Error(`Error eliminando acta ${input.fechaReunion}`);
  }
}

type InputEliminarActas = z.infer<typeof inputEliminarActas>;
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
export const eliminarActas = async (ctx: { db: PrismaClient }, input: InputEliminarActas) => {
  try {
    const gte = input.fechaInicio ? startOfDay(input.fechaInicio) : undefined;
    const lte = endOfDay(input.fechaFin);

    const where = input.fechaInicio
      ? { fechaReunion: { gte, lte } }
      : { fechaReunion: { lte } };

    const res = await ctx.db.acta.deleteMany({ where });
    // res.count => cantidad borrada
    return res; // devolvés { count: number }
  } catch (error) {
    throw new Error(`Error eliminando actas hasta/entre fechas: ${(error as Error).message}`);
  }
}