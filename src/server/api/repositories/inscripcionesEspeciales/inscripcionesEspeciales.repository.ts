import { type Prisma, type PrismaClient } from "@/generated/prisma";
import { type Session } from "next-auth";

import { type z } from "zod";
import { type inputAgregarInscripcion } from "@/shared/filters/inscripciones-especiales-filter.schema";

type InputAgregarInscripcion = z.infer<typeof inputAgregarInscripcion>;
export const agregarInscripcionEspecial = async (
  ctx: { db: PrismaClient; session: Session },
  input: InputAgregarInscripcion,
) => {
  return await ctx.db.$transaction(async (tx) => {
    const materiasExistentes = await tx.materia.findMany({
      where: {
        id: {
          in: input.materias,
        },
      },
      select: {
        id: true,
      },
    });

    const materiasEncontradas = materiasExistentes.map((m) => m.id);
    const materiasNoEncontradas = input.materias.filter((id: number) => !materiasEncontradas.includes(id));

    if (materiasNoEncontradas.length > 0) {
      throw new Error(`Las siguientes materias no existen: ${materiasNoEncontradas.join(", ")}`);
    }

    return await tx.inscripcionEspecial.create({
      data: {
        solicitanteId: ctx.session.user.id,
        caso: input.caso,
        justificacion: input.justificacion,
        turnoAlternativa1: input.turnoAlternativa1,
        turnoAlternativa2: input.turnoAlternativa2,
        estado: "PENDIENTE",
        materias: input.materias,
      },
    });
  });
};

export async function aprobarInscripcionEspecial(ctx: any, { id, respuesta }: { id: number; respuesta?: string }) {
  return await ctx.prisma.inscripcionEspecial.update({
    where: { id },
    data: {
      estado: "APROBADA",
      respuesta: respuesta ?? null,
    },
  });
}

export async function rechazarInscripcionEspecial(ctx: any, { id, respuesta }: { id: number; respuesta?: string }) {
  return await ctx.prisma.inscripcionEspecial.update({
    where: { id },
    data: {
      estado: "RECHAZADA",
      respuesta: respuesta ?? null,
    },
  });
}

export async function getAllInscripcionesEspeciales(ctx: any) {
  const inscripciones = await ctx.prisma.inscripcionEspecial.findMany({
    include: {
      solicitante: {
        select: {
          id: true,
          nombre: true,
          apellido: true,
          legajo: true,
          email: true,
          image: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const result = await Promise.all(
    inscripciones.map(
      async (i: {
        materias: any;
        id: any;
        solicitante: any;
        caso: any;
        justificacion: any;
        turnoAlternativa1: any;
        turnoAlternativa2: any;
        estado: any;
        respuesta: any;
        fechaSolicitud: { toISOString: () => any };
        fechaRespuesta: { toISOString: () => any };
      }) => {
        const materias = await ctx.prisma.materia.findMany({
          where: { id: { in: i.materias } },
          select: { nombre: true },
        });

        return {
          id: i.id,
          solicitante: i.solicitante,
          caso: i.caso,
          materias: materias.map((m: { nombre: String }) => m.nombre),
          justificacion: i.justificacion,
          turnoAlternativa1: i.turnoAlternativa1 ?? "",
          turnoAlternativa2: i.turnoAlternativa2 ?? "",
          estado: i.estado,
          respuesta: i.respuesta ?? "",
          fechaSolicitud: i.fechaSolicitud.toISOString(),
          fechaRespuesta: i.fechaRespuesta ? i.fechaRespuesta.toISOString() : "",
        };
      },
    ),
  );

  return result;
}
