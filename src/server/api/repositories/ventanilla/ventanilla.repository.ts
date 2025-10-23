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
  });

  return consulta;
};

export const getAllConsultas = async (ctx: { db: PrismaClient }, input: InputGetAllConsultas) => {
  const {
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
    searchText,
    nombre,
    apellido,
    legajo,
    email,
    estado,
    filterByUserId,
  } = input;

  const where: Prisma.ConsultaWhereInput = {
    NOT: { estado: "ELIMINADA" },
  };

  if (nombre) {
    where.nombre = { contains: nombre, mode: "insensitive" };
  }

  if (apellido) {
    where.apellido = { contains: apellido, mode: "insensitive" };
  }

  if (legajo) {
    where.legajo = { contains: legajo, mode: "insensitive" };
  }

  if (email) {
    where.email = { contains: email, mode: "insensitive" };
  }

  if (estado) {
    where.estado = estado;
  }

  if (searchText) {
    where.OR = [
      { nombre: { contains: searchText, mode: "insensitive" } },
      { apellido: { contains: searchText, mode: "insensitive" } },
      { legajo: { contains: searchText, mode: "insensitive" } },
      { email: { contains: searchText, mode: "insensitive" } },
      { consulta: { contains: searchText, mode: "insensitive" } },
    ];
  }

  const orderByConfig: Prisma.ConsultaOrderByWithRelationInput = {};
  switch (orderBy) {
    case "nombre":
      orderByConfig.nombre = orderDirection;
      break;
    case "apellido":
      orderByConfig.apellido = orderDirection;
      break;
    case "legajo":
      orderByConfig.legajo = orderDirection;
      break;
    case "email":
      orderByConfig.email = orderDirection;
      break;
    case "fechaConsulta":
      orderByConfig.fechaConsulta = orderDirection;
      break;
    case "estado":
      orderByConfig.estado = orderDirection;
      break;
    default:
      orderByConfig.id = orderDirection;
  }

  const skip = parseInt(pageIndex) * parseInt(pageSize);
  const take = parseInt(pageSize);

  const totalCount = await ctx.db.consulta.count({ where });

  const consultas = await ctx.db.consulta.findMany({
    where,
    orderBy: orderByConfig,
    skip,
    take,
  });

  const consultasFormateadas = consultas.map((c) => ({
    ...c,
    fechaConsulta: formatDateToDays(c.fechaConsulta),
  }));

  return {
    count: totalCount,
    consultas: consultasFormateadas,
    pageIndex: parseInt(pageIndex),
    pageSize: parseInt(pageSize),
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
  input: { id: number; estado?: string; respuesta?: string },
) => {
  const fechaRespuesta = input.respuesta && input.respuesta.trim().length > 0 ? new Date() : null;

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
