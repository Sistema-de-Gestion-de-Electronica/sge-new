import type { z } from "zod";
import { Session, type PrismaClient } from "@/generated/prisma";
import type { inputReportarFallasInstrumento, inputReportarFallasPc } from "@/shared/filters/fallas-filter.schema";

type InputReportarFallasInstrumento = z.infer<typeof inputReportarFallasInstrumento>;
type InputReportarFallasPc = z.infer<typeof inputReportarFallasPc>;

export const reportarInstrumento = async (
  ctx: { db: PrismaClient; session: { user: { id: string } } },
  input: InputReportarFallasInstrumento,
) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  return ctx.db.falla.create({
    data: {
      equipoId: Number(input.instrumento),
      tipoFalla: "Instrumento",
      descripcionEquipo: input.descripcionEquipo,
      descripcionFalla: input.descripcionFalla ?? "No input",
      condicion: input.condicion ?? null,
      estado: "FALLADO",
      reportadoPorId: ctx.session.user.id,
    },
  });
};

export const reportarPC = async (
  ctx: { db: PrismaClient; session: { user: { id: string } } },
  input: InputReportarFallasPc,
) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const equipo = await ctx.db.equipo.findUnique({
    where: { id: Number(input.nroEquipo) },
  });

  if (!equipo) {
    throw new Error("El equipo indicado no existe");
  }

  return ctx.db.falla.create({
    data: {
      equipoId: equipo.id,
      tipoFalla: "PC",
      descripcionFalla: input.descripcionFalla,
      fallas: input.fallas,
      estado: "FALLADO",
      reportadoPorId: ctx.session.user.id,
    },
  });
};

export const getAllFallas = async (ctx: { db: PrismaClient }) => {
  const fallas = await ctx.db.falla.findMany({
    include: {
      equipo: {
        include: {
          laboratorio: true,
          marca: true,
          tipo: true,
          estado: true,
        },
      },
      reportadoPor: true,
      asignadoA: true,
    },
    orderBy: {
      fechaReporte: "desc",
    },
  });

  const fallasTransformadas = fallas.map((falla) => ({
    ...falla,
    laboratorio: falla.equipo?.laboratorio?.nombre ?? "-",
    equipo: falla.equipo?.inventarioId ?? `Equipo ${falla.equipoId}`,
    marca: falla.equipo?.marca?.nombre ?? "-",
    modelo: falla.equipo?.modelo ?? "-",
    reportadoPor: falla.reportadoPor ?? { nombre: "-", apellido: "" },
    asignadoA: falla.asignadoA ?? { nombre: "-", apellido: "" },
  }));

  return {
    count: fallasTransformadas.length,
    fallas: fallasTransformadas,
    pageIndex: 0,
    pageSize: fallasTransformadas.length,
  };
};
