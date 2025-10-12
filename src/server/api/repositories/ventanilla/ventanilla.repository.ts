import { Prisma, PrismaClient } from "@/generated/prisma";
import { inputConsulta, inputGetAllConsultas } from "@/shared/filters/ventanilla-filter.schema";
import { z } from "zod";
import { formatDateToSeconds, formatDateToDays } from "../../utils/dateFormat";

type InputConsulta = z.infer<typeof inputConsulta>;
type InputGetAllConsultas = z.infer<typeof inputGetAllConsultas>;

export const consultar = async (ctx: { db: PrismaClient }, input: InputConsulta) => {
    const consulta = await ctx.db.$transaction(async (tx) => {

    const consulta = await tx.consulta.create({
      data: {
        nombre: input.nombre,
        apellido: input.apellido,
        legajo: input.legajo,
        email: input.email,
        consulta: input.consulta,
        estado: "NUEVA",
      },
    });
    return consulta;
    })

    return consulta;
}

export const getAllConsultas = async (ctx: { db: PrismaClient }, input: InputGetAllConsultas) => {
  const consultas = await ctx.db.consulta.findMany({
    where: {
      NOT: { estado: "ELIMINADA" },
    },
    orderBy: {
      fechaConsulta: "desc",
    },
  });

  const consultasFormateadas = consultas.map((c) => ({
    ...c,
    fechaConsulta: formatDateToDays(c.fechaConsulta),
  }));

  return {
    count: consultas.length,
    consultas: consultasFormateadas,
    pageIndex: 0,
    pageSize: consultas.length,
  };
};


export const getConsultaById = async (ctx: { db: PrismaClient }, input: { id: number }) => {
  const consulta = await ctx.db.consulta.findUnique({
    where: { id: input.id },
  });

  if (!consulta) return null;

  return {
    ...consulta,
    fechaConsulta: formatDateToSeconds(consulta.fechaConsulta),
  };
};


export const gestionarConsulta = async (
  ctx: { db: PrismaClient },
  input: { id: number; estado?: string; respuesta?: string }
) => {
  const fechaRespuesta =
    input.respuesta && input.respuesta.trim().length > 0
      ? new Date()
      : null;

  const consulta = await ctx.db.consulta.update({
    where: { id: input.id },
    data: {
      estado: input.estado,
      respuesta: input.respuesta,
      fechaRespuesta,
    },
  });

  return consulta;
};
