import { Prisma, type PrismaClient } from "@/generated/prisma";
import { type Session } from "next-auth";
import { type z } from "zod";
import {
  type inputAgregarInscripcion,
  type inputGetAllInscripcionesEspeciales,
  type inputGetInscripcionEspecialById,
  type inputActualizarContactoAsistencia,
  type inputEliminarInscripcionEspecial,
} from "@/shared/filters/inscripciones-especiales-filter.schema";

type DatabaseContext = { db: PrismaClient; session: Session };
type PrismaContext = { prisma: PrismaClient; session: Session };

interface InscripcionEspecialResponse {
  id: number;
  solicitante: {
    id: string;
    nombre: string | null;
    apellido: string | null;
    legajo: string | null;
    email: string;
    image: string | null;
    name: string | null;
  };
  caso: string;
  materias: string[];
  justificacion: string;
  turnoAlternativa1: string;
  turnoAlternativa2: string;
  estado: string;
  respuesta: string;
  fechaSolicitud: string;
  fechaRespuesta: string;
  vinoPresencialmente?: boolean | null;
  fueContactado?: boolean | null;
}

interface PaginatedResponse<T> {
  solicitudes: T[];
  count: number;
  pageIndex: number;
  pageSize: number;
}

type InputAgregarInscripcion = z.infer<typeof inputAgregarInscripcion>;

const formatDateToSeconds = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const formatDateToDays = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
};

const getSolicitanteSelect = () => ({
  id: true,
  nombre: true,
  apellido: true,
  legajo: true,
  email: true,
  image: true,
  name: true,
});

const buildInscripcionResponse = (
  inscripcion: {
    id: number;
    solicitante: {
      id: string;
      nombre: string | null;
      apellido: string | null;
      legajo: string | null;
      email: string;
      image: string | null;
      name: string | null;
    };
    caso: string;
    materias: number[];
    justificacion: string;
    turnoAlternativa1: string | null;
    turnoAlternativa2: string | null;
    estado: string;
    respuesta: string | null;
    fechaSolicitud: Date;
    fechaRespuesta: Date | null;
    vinoPresencialmente?: boolean | null;
    fueContactado?: boolean | null;
  },
  materias: { nombre: string }[],
  includeContactInfo = false,
): InscripcionEspecialResponse => ({
  id: inscripcion.id,
  solicitante: inscripcion.solicitante,
  caso: inscripcion.caso,
  materias: materias.map((m) => m.nombre),
  justificacion: inscripcion.justificacion,
  turnoAlternativa1: inscripcion.turnoAlternativa1 ?? "",
  turnoAlternativa2: inscripcion.turnoAlternativa2 ?? "",
  estado: inscripcion.estado,
  respuesta: inscripcion.respuesta ?? "",
  fechaSolicitud: formatDateToSeconds(inscripcion.fechaSolicitud),
  fechaRespuesta: inscripcion.fechaRespuesta ? formatDateToSeconds(inscripcion.fechaRespuesta) : "",
  ...(includeContactInfo && {
    vinoPresencialmente: inscripcion.vinoPresencialmente,
    fueContactado: inscripcion.fueContactado,
  }),
});

export const agregarInscripcionEspecial = async (ctx: DatabaseContext, input: InputAgregarInscripcion) => {
  try {
    return await ctx.db.$transaction(async (tx) => {
      const solicitante = await tx.user.findUnique({
        where: { legajo: input.legajo },
        select: { id: true },
      });

      if (!solicitante) {
        throw new Error(`No se encontró un usuario con el legajo ${input.legajo}`);
      }

      const todasLasMaterias = [...input.materias, ...input.materiasAdeudadas];

      if (todasLasMaterias.length === 0) {
        throw new Error("Debe seleccionar al menos una materia");
      }

      const materiasExistentes = await tx.materia.findMany({
        where: { id: { in: todasLasMaterias } },
        select: { id: true },
      });

      const materiasEncontradas = materiasExistentes.map((m) => m.id);
      const materiasNoEncontradas = todasLasMaterias.filter((id: number) => !materiasEncontradas.includes(id));

      if (materiasNoEncontradas.length > 0) {
        throw new Error(`Las siguientes materias no existen: ${materiasNoEncontradas.join(", ")}`);
      }

      return await tx.inscripcionEspecial.create({
        data: {
          solicitanteId: solicitante.id,
          caso: input.caso,
          justificacion: input.justificacion,
          turnoAlternativa1: input.turnoAlternativa1,
          turnoAlternativa2: input.turnoAlternativa2,
          estado: "PENDIENTE",
          materias: input.materias,
          materiasAdeudadas: input.materiasAdeudadas,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error inesperado al crear la inscripción especial");
  }
};

const gestionarInscripcionEspecial = async (
  ctx: DatabaseContext,
  id: number,
  estado: "ACEPTADA" | "ACEPTADA_CON_CONDICION" | "RECHAZADA",
  respuesta?: string,
): Promise<InscripcionEspecialResponse> => {
  try {
    const inscripcion = await ctx.db.inscripcionEspecial.update({
      where: { id },
      data: {
        estado,
        respuesta: respuesta ?? null,
        ...(estado !== "RECHAZADA" && { fechaRespuesta: new Date() }),
      },
      include: {
        solicitante: {
          select: getSolicitanteSelect(),
        },
      },
    });

    const materias = await ctx.db.materia.findMany({
      where: { id: { in: inscripcion.materias } },
      select: { nombre: true },
    });

    return buildInscripcionResponse(inscripcion, materias);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error(`No se encontró la inscripción especial con ID ${id}`);
      }
      throw new Error(`Error de base de datos: ${error.message}`);
    }
    throw error;
  }
};

export async function aprobarInscripcionEspecial(
  ctx: DatabaseContext,
  { id, respuesta }: { id: number; respuesta?: string },
): Promise<InscripcionEspecialResponse> {
  const contenidoRespuesta = respuesta?.trim().toLowerCase();
  const estado = !contenidoRespuesta || contenidoRespuesta === "null" ? "ACEPTADA" : "ACEPTADA_CON_CONDICION";

  return await gestionarInscripcionEspecial(ctx, id, estado, respuesta);
}

export async function rechazarInscripcionEspecial(
  ctx: DatabaseContext,
  { id, respuesta }: { id: number; respuesta?: string },
): Promise<InscripcionEspecialResponse> {
  return await gestionarInscripcionEspecial(ctx, id, "RECHAZADA", respuesta);
}

type InputGetAllInscripcionesEspeciales = z.infer<typeof inputGetAllInscripcionesEspeciales>;

export async function getAllInscripcionesEspeciales(
  ctx: PrismaContext,
  input: InputGetAllInscripcionesEspeciales,
  userId: string,
): Promise<PaginatedResponse<InscripcionEspecialResponse>> {
  try {
    const { filterByUserId } = input;

    const filtrosWhere: Prisma.InscripcionEspecialWhereInput = {
      ...(filterByUserId === "true" ? { solicitanteId: userId } : {}),
      estado: { not: "ELIMINADA" },
    };

    const [count, inscripciones] = await ctx.prisma.$transaction([
      ctx.prisma.inscripcionEspecial.count({ where: filtrosWhere }),
      ctx.prisma.inscripcionEspecial.findMany({
        where: filtrosWhere,
        include: {
          solicitante: {
            select: getSolicitanteSelect(),
          },
        },
        orderBy: { fechaSolicitud: "desc" },
      }),
    ]);

    const todasLasMateriasIds = inscripciones.flatMap((i) => i.materias);
    const materiasMap = new Map();

    if (todasLasMateriasIds.length > 0) {
      const materias = await ctx.prisma.materia.findMany({
        where: { id: { in: todasLasMateriasIds } },
        select: { id: true, nombre: true },
      });

      materias.forEach((m) => materiasMap.set(m.id, m.nombre));
    }

    const solicitudes = inscripciones.map((i) => {
      const materiasNombres = i.materias.map((id) => materiasMap.get(id) || `Materia ${id}`);

      return {
        id: i.id,
        solicitante: i.solicitante,
        caso: i.caso,
        materias: materiasNombres,
        vinoPresencialmente: i.vinoPresencialmente,
        fueContactado: i.fueContactado,
        justificacion: i.justificacion,
        turnoAlternativa1: i.turnoAlternativa1 ?? "",
        turnoAlternativa2: i.turnoAlternativa2 ?? "",
        estado: i.estado,
        respuesta: i.respuesta ?? "",
        fechaSolicitud: formatDateToDays(i.fechaSolicitud),
        fechaRespuesta: i.fechaRespuesta ? formatDateToDays(i.fechaRespuesta) : "",
      };
    });

    // TODO: Implementar paginado real
    const pageIndex = 0;
    const pageSize = 10;

    return {
      solicitudes,
      count,
      pageIndex,
      pageSize,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Error de base de datos: ${error.message}`);
    }
    throw new Error("Error inesperado al obtener las inscripciones especiales");
  }
}

type inputGetInscripcionEspecialById = z.infer<typeof inputGetInscripcionEspecialById>;

export async function getInscripcionEspecialById(
  ctx: DatabaseContext,
  input: inputGetInscripcionEspecialById,
): Promise<InscripcionEspecialResponse | null> {
  try {
    const inscripcion = await ctx.db.inscripcionEspecial.findUnique({
      where: { id: input.id },
      include: {
        solicitante: {
          select: getSolicitanteSelect(),
        },
      },
    });

    if (!inscripcion) return null;

    const materias = await ctx.db.materia.findMany({
      where: { id: { in: inscripcion.materias } },
      select: { nombre: true },
    });

    return buildInscripcionResponse(inscripcion, materias, true);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Error de base de datos: ${error.message}`);
    }
    throw new Error("Error inesperado al obtener la inscripción especial");
  }
}

type InputActualizarContactoAsistencia = z.infer<typeof inputActualizarContactoAsistencia>;

export async function actualizarContactoAsistencia(ctx: DatabaseContext, input: InputActualizarContactoAsistencia) {
  try {
    return await ctx.db.inscripcionEspecial.update({
      where: { id: input.id },
      data: {
        fueContactado: input.alumnoContactado,
        vinoPresencialmente: input.alumnoAsistio,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error(`No se encontró la inscripción especial con ID ${input.id}`);
      }
      throw new Error(`Error de base de datos: ${error.message}`);
    }
    throw new Error("Error inesperado al actualizar contacto y asistencia");
  }
}

type InputEliminarInscripcionEspecial = z.infer<typeof inputEliminarInscripcionEspecial>;

export async function eliminarInscripcionEspecial(ctx: DatabaseContext, input: InputEliminarInscripcionEspecial) {
  try {
    return await ctx.db.inscripcionEspecial.update({
      where: { id: input.id },
      data: {
        estado: "ELIMINADA",
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error(`No se encontró la inscripción especial con ID ${input.id}`);
      }
      throw new Error(`Error de base de datos: ${error.message}`);
    }
    throw new Error("Error inesperado al eliminar la inscripción especial");
  }
}
