import { type Prisma, type PrismaClient } from "@/generated/prisma";
import { type Session } from "next-auth";

import { type z } from "zod";
import {
  type inputAgregarInscripcion,
  type inputGetAllInscripcionesEspeciales,
  type inputGetInscripcionEspecialById,
} from "@/shared/filters/inscripciones-especiales-filter.schema";
import { id } from "date-fns/locale";

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

type InputGetAllInscripcionesEspeciales = z.infer<typeof inputGetAllInscripcionesEspeciales>;

export async function getAllInscripcionesEspeciales(
  ctx: { prisma: PrismaClient; session: any },
  input: InputGetAllInscripcionesEspeciales,
  userId: string,
) {
  const { filterByUserId } = input;

  const filtrosWhere: Prisma.InscripcionEspecialWhereInput = {
    ...(filterByUserId === "true" ? { solicitanteId: userId } : {}),
  };

  const [count, inscripciones] = await ctx.prisma.$transaction([
    ctx.prisma.inscripcionEspecial.count({
      where: filtrosWhere,
    }),
    ctx.prisma.inscripcionEspecial.findMany({
      where: filtrosWhere,
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
      orderBy: { fechaSolicitud: "desc" },
    }),
  ]);

  const solicitudes = await Promise.all(
    inscripciones.map(async (i) => {
      const materias = await ctx.prisma.materia.findMany({
        where: { id: { in: i.materias } },
        select: { nombre: true },
      });
      return {
        id: i.id,
        solicitante: i.solicitante,
        caso: i.caso,
        materias: materias.map((m) => m.nombre),
        justificacion: i.justificacion,
        turnoAlternativa1: i.turnoAlternativa1 ?? "",
        turnoAlternativa2: i.turnoAlternativa2 ?? "",
        estado: i.estado,
        respuesta: i.respuesta ?? "",
        fechaSolicitud: formatDateToSeconds(i.fechaSolicitud),
        fechaRespuesta: i.fechaRespuesta ? formatDateToSeconds(i.fechaRespuesta) : "",
      };
    }),
  );
  const pageIndex = 0; // TODO SACAR O IMPLEMENTAR PAGINADO
  const pageSize = 10;

  return {
    solicitudes,
    count,
    pageIndex,
    pageSize,
  };
}

type inputGetInscripcionEspecialById = z.infer<typeof inputGetInscripcionEspecialById>;

export async function getInscripcionEspecialById(ctx: any, input: inputGetInscripcionEspecialById) {
  const i = await ctx.prisma.inscripcionEspecial.findUnique({
    where: { id: input.id },
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
  });

  if (!i) throw new Error("Modelo inscripcionEspecial no encontrado en prisma");

  const materias = await ctx.prisma.materia.findMany({
    where: { id: { in: i.materias } },
    select: { nombre: true },
  });

  return {
    id: i.id,
    solicitante: i.solicitante,
    caso: i.caso,
    materias: materias.map((m: any) => m.nombre),
    justificacion: i.justificacion,
    turnoAlternativa1: i.turnoAlternativa1 ?? "",
    turnoAlternativa2: i.turnoAlternativa2 ?? "",
    estado: i.estado,
    respuesta: i.respuesta ?? "",
    fechaSolicitud: formatDateToSeconds(i.fechaSolicitud),
    fechaRespuesta: i.fechaRespuesta ? formatDateToSeconds(i.fechaRespuesta) : "",
  };
}

function formatDateToSeconds(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
