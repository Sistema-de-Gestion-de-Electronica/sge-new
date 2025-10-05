import type { z } from "zod";
import { type PrismaClient } from "@/generated/prisma";
import type {
  inputReportarFallasInstrumento,
  inputReportarFallasPc,
  inputGetFallaPorId,
} from "@/shared/filters/fallas-filter.schema";
import { formatDateToSeconds, formatDateToDays } from "../../utils/dateFormat";

type InputReportarFallasInstrumento = z.infer<typeof inputReportarFallasInstrumento>;
type InputReportarFallasPc = z.infer<typeof inputReportarFallasPc>;
type InputGetFallaPorId = z.infer<typeof inputGetFallaPorId>;

export const reportarInstrumento = async (
  ctx: { db: PrismaClient; session: { user: { id: string } } },
  input: InputReportarFallasInstrumento,
) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const equipoId = input.esInventariado && input.instrumento ? Number(input.instrumento) : null;

  return ctx.db.falla.create({
    data: {
      equipoId: equipoId ?? undefined,
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

  const equipo = await ctx.db.equipo.findFirst({
    where: { numeroSerie: input.nroEquipo },
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
    where: {
      NOT: { estado: "ELIMINADO" },
    },
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
    equipo: falla.equipo?.inventarioId ?? (falla.equipoId ? `Equipo ${falla.equipoId}` : "-"),
    marca: falla.equipo?.marca?.nombre ?? "-",
    modelo: falla.equipo?.modelo ?? "-",
    reportadoPor: falla.reportadoPor ?? { nombre: "-", apellido: "" },
    asignadoA: falla.asignadoA ?? { nombre: "-", apellido: "" },
    fechaReporte: falla.fechaReporte ? formatDateToDays(new Date(falla.fechaReporte)) : "-",
  }));

  return {
    count: fallasTransformadas.length,
    fallas: fallasTransformadas,
    pageIndex: 0,
    pageSize: fallasTransformadas.length,
  };
};

export const getFallaPorId = async (ctx: { db: PrismaClient }, input: InputGetFallaPorId) => {
  const falla = await ctx.db.falla.findUnique({
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
    where: {
      id: input.id,
    },
  });

  if (!falla) return null;

  return {
    id: falla.id,
    laboratorio: falla.equipo?.laboratorio?.nombre ?? "-",
    nroEquipo: falla.equipo?.inventarioId ?? (falla.equipoId ? `Equipo ${falla.equipoId}` : "-"),
    marca: falla.equipo?.marca?.nombre ?? "-",
    modelo: falla.equipo?.modelo ?? "-",
    fallas: falla.fallas ?? [],
    descripcionFalla: falla.descripcionFalla ?? "-",
    reportadoPor: falla.reportadoPor ?? null,
    asignadoA: falla.asignadoA ?? null,
    fechaReporte: falla.fechaReporte ? formatDateToSeconds(new Date(falla.fechaReporte)) : "-",
    estado: falla.estado ?? "-",
  };
};

type CambiarEstadoInput = { id: number; estado: string; descripcionFalla?: string | null; asignadoA?: string | null };
type ActualizarCamposInput = { id: number; descripcionFalla?: string | null; asignadoA?: string | null };

export const cambiarEstado = async (
  ctx: { db: PrismaClient; session: { user: { id: string } } },
  input: CambiarEstadoInput,
) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const updateData: {
    estado: string;
    descripcionFalla?: string;
    asignadoA?: { connect: { id: string } } | { disconnect: true };
  } = {
    estado: input.estado,
  };

  if (typeof input.descripcionFalla === "string") {
    updateData.descripcionFalla = input.descripcionFalla;
  }

  if (typeof input.asignadoA === "string") {
    updateData.asignadoA = input.asignadoA ? { connect: { id: input.asignadoA } } : { disconnect: true };
  }

  return ctx.db.falla.update({
    where: { id: input.id },
    data: updateData,
  });
};

export const actualizarCampos = async (
  ctx: { db: PrismaClient; session: { user: { id: string } } },
  input: ActualizarCamposInput,
) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const updateData: { descripcionFalla?: string; asignadoA?: { connect: { id: string } } | { disconnect: true } } = {};

  if (typeof input.descripcionFalla === "string") {
    updateData.descripcionFalla = input.descripcionFalla;
  }

  if (typeof input.asignadoA === "string") {
    updateData.asignadoA = input.asignadoA ? { connect: { id: input.asignadoA } } : { disconnect: true };
  }

  return ctx.db.falla.update({
    where: { id: input.id },
    data: updateData,
  });
};

export const eliminarFalla = async (
  ctx: { db: PrismaClient; session: { user: { id: string } } },
  input: { id: number },
) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  return ctx.db.falla.update({ where: { id: input.id }, data: { estado: "ELIMINADO" } });
};
