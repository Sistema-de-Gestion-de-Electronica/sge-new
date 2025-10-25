import { type PrismaClient } from "@/generated/prisma";

type DatabaseContext = { db: PrismaClient };

interface PeriodoInscripcionEspecialResponse {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
  usuarioCreadorId: string;
  usuarioCreador: {
    id: string;
    nombre: string | null;
    apellido: string | null;
    legajo: string | null;
    email: string;
  };
}

interface CrearPeriodoInput {
  fechaInicio: Date;
  fechaFin: Date;
  usuarioCreadorId: string;
}

interface ActualizarPeriodoInput {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
}

const buildPeriodoResponse = (periodo: {
  id: number;
  fechaInicio: Date;
  fechaFin: Date;
  usuarioCreadorId: string;
  usuarioCreador: {
    id: string;
    nombre: string | null;
    apellido: string | null;
    legajo: string | null;
    email: string;
  };
}): PeriodoInscripcionEspecialResponse => ({
  id: periodo.id,
  fechaInicio: periodo.fechaInicio,
  fechaFin: periodo.fechaFin,
  usuarioCreadorId: periodo.usuarioCreadorId,
  usuarioCreador: {
    id: periodo.usuarioCreador.id,
    nombre: periodo.usuarioCreador.nombre,
    apellido: periodo.usuarioCreador.apellido,
    legajo: periodo.usuarioCreador.legajo,
    email: periodo.usuarioCreador.email,
  },
});

export const crearPeriodoInscripcionEspecial = async (
  ctx: DatabaseContext,
  input: CrearPeriodoInput,
): Promise<PeriodoInscripcionEspecialResponse> => {
  try {
    const periodo = await ctx.db.inscripcionEspecialPeriodo.create({
      data: {
        fechaInicio: input.fechaInicio,
        fechaFin: input.fechaFin,
        usuarioCreadorId: input.usuarioCreadorId,
      },
      include: {
        usuarioCreador: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            legajo: true,
            email: true,
          },
        },
      },
    });

    return buildPeriodoResponse(periodo);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error inesperado al crear el período de inscripción especial");
  }
};

export const actualizarPeriodoInscripcionEspecial = async (
  ctx: DatabaseContext,
  input: ActualizarPeriodoInput,
): Promise<PeriodoInscripcionEspecialResponse> => {
  try {
    const periodo = await ctx.db.inscripcionEspecialPeriodo.update({
      where: { id: input.id },
      data: {
        fechaInicio: input.fechaInicio,
        fechaFin: input.fechaFin,
      },
      include: {
        usuarioCreador: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            legajo: true,
            email: true,
          },
        },
      },
    });

    return buildPeriodoResponse(periodo);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error inesperado al actualizar el período de inscripción especial");
  }
};

export const getPeriodoInscripcionEspecialActual = async (
  ctx: DatabaseContext,
): Promise<PeriodoInscripcionEspecialResponse | null> => {
  try {
    const ahora = new Date();

    const periodo = await ctx.db.inscripcionEspecialPeriodo.findFirst({
      where: {
        fechaInicio: { lte: ahora },
        fechaFin: { gte: ahora },
      },
      include: {
        usuarioCreador: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            legajo: true,
            email: true,
          },
        },
      },
      orderBy: {
        fechaInicio: "desc",
      },
    });

    if (!periodo) {
      return null;
    }

    return buildPeriodoResponse(periodo);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error inesperado al obtener el período actual de inscripción especial");
  }
};

export const getUltimoPeriodoInscripcionEspecial = async (
  ctx: DatabaseContext,
): Promise<PeriodoInscripcionEspecialResponse | null> => {
  try {
    const periodo = await ctx.db.inscripcionEspecialPeriodo.findFirst({
      include: {
        usuarioCreador: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            legajo: true,
            email: true,
          },
        },
      },
      orderBy: {
        fechaInicio: "desc",
      },
    });

    if (!periodo) {
      return null;
    }

    return buildPeriodoResponse(periodo);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error inesperado al obtener el último período de inscripción especial");
  }
};

export const verificarPeriodoActivo = async (ctx: DatabaseContext): Promise<boolean> => {
  try {
    const ahora = new Date();

    const periodoActivo = await ctx.db.inscripcionEspecialPeriodo.findFirst({
      where: {
        fechaInicio: { lte: ahora },
        fechaFin: { gte: ahora },
      },
    });

    return !!periodoActivo;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error inesperado al verificar el período activo");
  }
};
