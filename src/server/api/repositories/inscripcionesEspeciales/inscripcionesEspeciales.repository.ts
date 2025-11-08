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
  materiasIds: number[];
  materiasAdeudadas: string[];
  justificacion: string;
  detallesPreferenciasHorario: string;
  turnoAlternativa1: string;
  turnoAlternativa2: string;
  estado: string;
  respuesta: string;
  fechaSolicitud: string;
  fechaRespuesta: string;
  vinoPresencialmente?: boolean | null;
  fueContactado?: boolean | null;
  cursos: number[];
  materiasInscripcion?: {
    materiaId: number;
    materiaNombre: string;
    materiasAdeudadasIds: number[];
    materiasAdeudadasNombres: string[];
    cursoId?: number | null;
  }[];
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
    cursos: number[];
    justificacion: string;
    detallesPreferenciasHorario: string | null;
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
  materiasAdeudadas: { nombre: string }[],
  includeContactInfo = false,
): InscripcionEspecialResponse => ({
  id: inscripcion.id,
  solicitante: inscripcion.solicitante,
  caso: inscripcion.caso,
  materias: materias.map((m) => m.nombre),
  materiasIds: inscripcion.materias,
  materiasAdeudadas: materiasAdeudadas.map((m) => m.nombre),
  justificacion: inscripcion.justificacion,
  detallesPreferenciasHorario: inscripcion.detallesPreferenciasHorario ?? "",
  turnoAlternativa1: inscripcion.turnoAlternativa1 ?? "",
  turnoAlternativa2: inscripcion.turnoAlternativa2 ?? "",
  estado: inscripcion.estado,
  respuesta: inscripcion.respuesta ?? "",
  fechaSolicitud: formatDateToSeconds(inscripcion.fechaSolicitud),
  fechaRespuesta: inscripcion.fechaRespuesta ? formatDateToSeconds(inscripcion.fechaRespuesta) : "",
  cursos: inscripcion.cursos ?? [],
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

      if (!input.materias || input.materias.length === 0) {
        throw new Error("Debe seleccionar al menos una materia");
      }

      const todasLasMateriasIds = [
        ...input.materias.map((m) => m.materiaId),
        ...input.materias.flatMap((m) => m.materiasAdeudadas ?? []),
      ];

      const materiasExistentes = await tx.materia.findMany({
        where: { id: { in: todasLasMateriasIds } },
        select: { id: true },
      });

      const materiasEncontradas = materiasExistentes.map((m) => m.id);
      const materiasNoEncontradas = todasLasMateriasIds.filter((id: number) => !materiasEncontradas.includes(id));

      if (materiasNoEncontradas.length > 0) {
        throw new Error(`Las siguientes materias no existen: ${materiasNoEncontradas.join(", ")}`);
      }

      const inscripcion = await tx.inscripcionEspecial.create({
        data: {
          solicitanteId: solicitante.id,
          caso: input.caso,
          justificacion: input.justificacion,
          detallesPreferenciasHorario: input.detallesPreferenciasHorario ?? null,
          turnoAlternativa1: input.turnoAlternativa1,
          turnoAlternativa2: input.turnoAlternativa2,
          estado: "PENDIENTE",
          materiasInscripcion: {
            create: input.materias.map((m) => ({
              materiaId: m.materiaId,
              materiasAdeudadas: m.materiasAdeudadas ?? [],
              cursoId: m.cursoId ?? null,
            })),
          },
        },
        include: {
          materiasInscripcion: {
            include: {
              materia: true,
            },
          },
          solicitante: {
            select: getSolicitanteSelect(),
          },
        },
      });

      // Construir la respuesta usando buildInscripcionResponse
      const materiasIds = inscripcion.materiasInscripcion.map((mi) => mi.materiaId);
      const todasLasMateriasAdeudadasIds = inscripcion.materiasInscripcion.flatMap((mi) => mi.materiasAdeudadas);

      const materiasRaw = await tx.materia.findMany({
        where: { id: { in: materiasIds } },
        select: { id: true, nombre: true },
      });

      const materiasAdeudadasRaw = await tx.materia.findMany({
        where: { id: { in: todasLasMateriasAdeudadasIds } },
        select: { nombre: true },
      });

      const materias = materiasIds.map((id) => materiasRaw.find((m) => m.id === id)!);
      const materiasAdeudadas = materiasAdeudadasRaw;

      // Crear un objeto compatible con el tipo esperado
      const inscripcionParaResponse = {
        ...inscripcion,
        materias: materiasIds,
        cursos: inscripcion.materiasInscripcion.map((mi) => mi.cursoId).filter((id): id is number => id !== null),
      };

      return buildInscripcionResponse(inscripcionParaResponse, materias, materiasAdeudadas);
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
    // Verificar el estado actual antes de actualizar
    const inscripcionActual = await ctx.db.inscripcionEspecial.findUnique({
      where: { id },
      select: { estado: true },
    });

    if (!inscripcionActual) {
      throw new Error(`No se encontró la inscripción especial con ID ${id}`);
    }

    if (inscripcionActual.estado === "ELIMINADA") {
      throw new Error("No se puede gestionar una inscripción especial que está en estado ELIMINADA");
    }

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
        materiasInscripcion: {
          include: {
            materia: true,
          },
        },
      },
    });

    const materiasIds = inscripcion.materiasInscripcion.map((mi) => mi.materiaId);
    const todasLasMateriasAdeudadasIds = inscripcion.materiasInscripcion.flatMap((mi) => mi.materiasAdeudadas);
    const cursosIds = inscripcion.materiasInscripcion.map((mi) => mi.cursoId).filter((id): id is number => id !== null);

    const materiasRaw = await ctx.db.materia.findMany({
      where: { id: { in: materiasIds } },
      select: { id: true, nombre: true },
    });

    const materias = materiasIds.map((id) => materiasRaw.find((m) => m.id === id)!);

    const materiasAdeudadas = await ctx.db.materia.findMany({
      where: { id: { in: todasLasMateriasAdeudadasIds } },
      select: { nombre: true },
    });

    const inscripcionParaResponse = {
      ...inscripcion,
      materias: materiasIds,
      cursos: cursosIds,
    };

    return buildInscripcionResponse(inscripcionParaResponse, materias, materiasAdeudadas);
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
  return await gestionarInscripcionEspecial(ctx, id, "ACEPTADA", respuesta);
}

export async function rechazarInscripcionEspecial(
  ctx: DatabaseContext,
  { id, respuesta }: { id: number; respuesta?: string },
): Promise<InscripcionEspecialResponse> {
  return await gestionarInscripcionEspecial(ctx, id, "RECHAZADA", respuesta);
}

export async function aprobarInscripcionEspecialConCondicion(
  ctx: DatabaseContext,
  { id, respuesta }: { id: number; respuesta?: string },
): Promise<InscripcionEspecialResponse> {
  return await gestionarInscripcionEspecial(ctx, id, "ACEPTADA_CON_CONDICION", respuesta);
}

type InputGetAllInscripcionesEspeciales = z.infer<typeof inputGetAllInscripcionesEspeciales>;

export async function getAllInscripcionesEspeciales(
  ctx: PrismaContext,
  input: InputGetAllInscripcionesEspeciales,
  userId: string,
): Promise<PaginatedResponse<InscripcionEspecialResponse>> {
  try {
    const {
      filterByUserId,
      pageIndex = 0,
      pageSize = 10,
      searchText,
      caso,
      estado,
      vinoPresencialmente,
      fueContactado,
      orderBy = "fechaSolicitud",
      orderDirection = "desc",
    } = input;

    const filtrosWhere: Prisma.InscripcionEspecialWhereInput = {
      ...(filterByUserId === "true" ? { solicitanteId: userId } : {}),
      estado: { not: "ELIMINADA" },
      ...(searchText && {
        OR: [
          { solicitante: { nombre: { contains: searchText, mode: "insensitive" } } },
          { solicitante: { apellido: { contains: searchText, mode: "insensitive" } } },
          { solicitante: { legajo: { contains: searchText, mode: "insensitive" } } },
        ],
      }),
      ...(caso && { caso }),
      ...(estado && { estado }),
      ...(vinoPresencialmente !== undefined && { vinoPresencialmente: vinoPresencialmente === "true" }),
      ...(fueContactado !== undefined && { fueContactado: fueContactado === "true" }),
    };

    const orderByClause: Prisma.InscripcionEspecialOrderByWithRelationInput = {};
    if (orderBy === "solicitante") {
      orderByClause.solicitante = { apellido: orderDirection };
    } else {
      orderByClause[orderBy as keyof Prisma.InscripcionEspecialOrderByWithRelationInput] = orderDirection;
    }

    const skip = pageIndex * pageSize;

    const [count, inscripciones] = await ctx.prisma.$transaction([
      ctx.prisma.inscripcionEspecial.count({ where: filtrosWhere }),
      ctx.prisma.inscripcionEspecial.findMany({
        where: filtrosWhere,
        include: {
          solicitante: {
            select: getSolicitanteSelect(),
          },
          materiasInscripcion: {
            include: {
              materia: true,
            },
          },
        },
        orderBy: orderByClause,
        skip,
        take: pageSize,
      }),
    ]);

    // Recopilar todas las materias y materias adeudadas
    const todasLasMateriasIds = inscripciones.flatMap((i) =>
      i.materiasInscripcion.flatMap((mi) => [mi.materiaId, ...mi.materiasAdeudadas]),
    );
    const materiasMap = new Map();

    if (todasLasMateriasIds.length > 0) {
      const materias = await ctx.prisma.materia.findMany({
        where: { id: { in: todasLasMateriasIds } },
        select: { id: true, nombre: true },
      });

      materias.forEach((m) => materiasMap.set(m.id, m.nombre));
    }

    const solicitudes = inscripciones.map((i) => {
      const materiasIds = i.materiasInscripcion.map((mi) => mi.materiaId);
      const materiasNombres = materiasIds.map((id) => materiasMap.get(id) || `Materia ${id}`);

      const todasLasMateriasAdeudadas = i.materiasInscripcion.flatMap((mi) => mi.materiasAdeudadas);
      const materiasAdeudadasNombres = todasLasMateriasAdeudadas.map((id) => materiasMap.get(id) || `Materia ${id}`);

      const cursosIds = i.materiasInscripcion.map((mi) => mi.cursoId).filter((id): id is number => id !== null);

      return {
        id: i.id,
        solicitante: i.solicitante,
        caso: i.caso,
        materias: materiasNombres,
        materiasIds: materiasIds,
        materiasAdeudadas: materiasAdeudadasNombres,
        vinoPresencialmente: i.vinoPresencialmente,
        fueContactado: i.fueContactado,
        justificacion: i.justificacion,
        detallesPreferenciasHorario: i.detallesPreferenciasHorario ?? "",
        turnoAlternativa1: i.turnoAlternativa1 ?? "",
        turnoAlternativa2: i.turnoAlternativa2 ?? "",
        estado: i.estado,
        respuesta: i.respuesta ?? "",
        fechaSolicitud: formatDateToDays(i.fechaSolicitud),
        fechaRespuesta: i.fechaRespuesta ? formatDateToDays(i.fechaRespuesta) : "",
        cursos: cursosIds,
      };
    });

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
        materiasInscripcion: {
          include: {
            materia: true,
          },
        },
      },
    });

    if (!inscripcion) return null;

    // Extraer datos de las relaciones
    const materiasIds = inscripcion.materiasInscripcion.map((mi) => mi.materiaId);
    const todasLasMateriasAdeudadas = inscripcion.materiasInscripcion.flatMap((mi) => mi.materiasAdeudadas);
    const cursosIds = inscripcion.materiasInscripcion.map((mi) => mi.cursoId).filter((id): id is number => id !== null);

    // Obtener nombres de materias
    const materiasRaw = await ctx.db.materia.findMany({
      where: { id: { in: materiasIds } },
      select: { id: true, nombre: true },
    });

    const materias = materiasIds.map((id) => materiasRaw.find((m) => m.id === id)!);

    // Obtener nombres de materias adeudadas
    const materiasAdeudadas = await ctx.db.materia.findMany({
      where: { id: { in: todasLasMateriasAdeudadas } },
      select: { id: true, nombre: true },
    });

    const inscripcionParaResponse = {
      ...inscripcion,
      materias: materiasIds,
      cursos: cursosIds,
    };

    const response = buildInscripcionResponse(inscripcionParaResponse, materias, materiasAdeudadas, true);

    const materiasInscripcionData = inscripcion.materiasInscripcion.map((mi) => {
      const materiaNombre = materias.find((m) => m.id === mi.materiaId)?.nombre ?? "";
      const materiasAdeudadasNombres = mi.materiasAdeudadas
        .map((id) => materiasAdeudadas.find((m) => m.id === id)?.nombre)
        .filter((nombre): nombre is string => nombre !== undefined);

      return {
        materiaId: mi.materiaId,
        materiaNombre,
        materiasAdeudadasIds: mi.materiasAdeudadas,
        materiasAdeudadasNombres,
        cursoId: mi.cursoId,
      };
    });

    return {
      ...response,
      materiasInscripcion: materiasInscripcionData,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Error de base de datos: ${error.message}`);
    }
    throw new Error("Error inesperado al obtener la inscripción especial");
  }
}

type InputActualizarCursos = { id: number; cursos: number[] };
export async function actualizarCursosInscripcionEspecial(ctx: DatabaseContext, input: InputActualizarCursos) {
  try {
    const inscripcionActual = await ctx.db.inscripcionEspecial.findUnique({
      where: { id: input.id },
      select: { estado: true, materiasInscripcion: { select: { id: true } } },
    });

    if (!inscripcionActual) {
      throw new Error(`No se encontró la inscripción especial con ID ${input.id}`);
    }

    if (inscripcionActual.estado === "ELIMINADA") {
      throw new Error("No se pueden actualizar los cursos de una inscripción especial que está en estado ELIMINADA");
    }

    const materiasInscripcion = inscripcionActual.materiasInscripcion;

    if (input.cursos.length !== materiasInscripcion.length) {
      throw new Error("La cantidad de cursos no coincide con la cantidad de materias");
    }

    await Promise.all(
      materiasInscripcion.map((mi, index) => {
        const cursoId = input.cursos[index];
        return ctx.db.inscripcionEspecialMateria.update({
          where: { id: mi.id },
          data: { cursoId: cursoId && cursoId > 0 ? cursoId : null },
        });
      }),
    );

    const updated = await ctx.db.inscripcionEspecial.findUnique({
      where: { id: input.id },
      include: {
        solicitante: { select: getSolicitanteSelect() },
        materiasInscripcion: {
          include: {
            materia: true,
          },
        },
      },
    });

    if (!updated) {
      throw new Error(`No se pudo obtener la inscripción actualizada con ID ${input.id}`);
    }

    const materiasIds = updated.materiasInscripcion.map((mi) => mi.materiaId);
    const todasLasMateriasAdeudadasIds = updated.materiasInscripcion.flatMap((mi) => mi.materiasAdeudadas);
    const cursosIds = updated.materiasInscripcion.map((mi) => mi.cursoId).filter((id): id is number => id !== null);

    const materiasRaw = await ctx.db.materia.findMany({
      where: { id: { in: materiasIds } },
      select: { id: true, nombre: true },
    });

    const materiasAdeudadasRaw = await ctx.db.materia.findMany({
      where: { id: { in: todasLasMateriasAdeudadasIds } },
      select: { nombre: true },
    });

    const materias = materiasIds.map((id) => materiasRaw.find((m) => m.id === id)!);

    const inscripcionParaResponse = {
      ...updated,
      materias: materiasIds,
      cursos: cursosIds,
    };

    return buildInscripcionResponse(inscripcionParaResponse, materias, materiasAdeudadasRaw, true);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error(`No se encontró la inscripción especial con ID ${input.id}`);
      }
      throw new Error(`Error de base de datos: ${error.message}`);
    }
    throw new Error("Error inesperado al actualizar los cursos de la inscripción especial");
  }
}

type InputActualizarContactoAsistencia = z.infer<typeof inputActualizarContactoAsistencia>;

export async function actualizarContactoAsistencia(ctx: DatabaseContext, input: InputActualizarContactoAsistencia) {
  try {
    const inscripcionActual = await ctx.db.inscripcionEspecial.findUnique({
      where: { id: input.id },
      select: { estado: true },
    });

    if (!inscripcionActual) {
      throw new Error(`No se encontró la inscripción especial con ID ${input.id}`);
    }

    if (inscripcionActual.estado === "ELIMINADA") {
      throw new Error("No se puede actualizar el contacto de una inscripción especial que está en estado ELIMINADA");
    }

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
