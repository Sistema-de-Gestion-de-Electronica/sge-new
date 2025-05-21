import { construirOrderByDinamico } from "@/shared/dynamic-orderby";
import {
  type inputGetUsuario,
  type inputEliminarUsuario,
  type inputGetUsuarios,
  type inputEditarUsuario,
  type inputEditarTutor,
  type inputGetTutor,
  type inputGetUsuariosPorIds,
  type inputCambiarAsistio,
  type inputUserId,
} from "@/shared/filters/admin-usuarios-filter.schema";
import { ReservaTipo, type Prisma, type PrismaClient } from "@/generated/prisma";
import { type z } from "zod";
import { informacionUsuario } from "../usuario-helper";

type InputGetAll = z.infer<typeof inputGetUsuarios>;
export const getAllUsuarios = async (ctx: { db: PrismaClient }, input: InputGetAll) => {
  const { pageIndex, pageSize, searchText, orderDirection, orderBy } = input ?? {};

  const ordenUsuario: Prisma.UserOrderByWithRelationInput = construirOrderByDinamico(
    orderBy ?? "",
    orderDirection ?? "",
  );

  const filtrosWhereUsuario: Prisma.UserWhereInput = {
    ...(searchText
      ? {
          OR: [
            {
              nombre: {
                contains: searchText ?? undefined,
                mode: "insensitive",
              },
            },
            {
              apellido: {
                contains: searchText ?? undefined,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: searchText ?? undefined,
                mode: "insensitive",
              },
            },
            {
              legajo: {
                contains: searchText ?? undefined,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
    ...(input?.rol
      ? {
          usuarioRol: {
            some: {
              rolId: parseInt(input?.rol),
            },
          },
        }
      : {}),
  };

  const [count, usuarios] = await ctx.db.$transaction([
    ctx.db.user.count({
      where: filtrosWhereUsuario,
    }),
    ctx.db.user.findMany({
      include: {
        usuarioRol: {
          include: {
            rol: true,
          },
        },
      },
      where: filtrosWhereUsuario,
      orderBy: ordenUsuario,
      ...(pageIndex && pageSize
        ? {
            skip: parseInt(pageIndex) * parseInt(pageSize),
            take: parseInt(pageSize),
          }
        : {}),
    }),
  ]);

  return {
    count,
    usuarios,
  };
};

type InputEliminarUsuario = z.infer<typeof inputEliminarUsuario>;
export const eliminarUsuario = async (ctx: { db: PrismaClient }, input: InputEliminarUsuario) => {
  try {
    const usuario = await ctx.db.user.update({
      where: {
        id: input.id,
      },
      data: {
        usuarioRol: {
          set: [],
        },
      },
    });

    return usuario;
  } catch (error) {
    throw new Error(`Error eliminando usuario ${input.id}`);
  }
};

type InputGetUsuarioPorId = z.infer<typeof inputGetUsuario>;
export const getUsuarioPorId = async (ctx: { db: PrismaClient }, input: InputGetUsuarioPorId) => {
  const { id } = input;

  const usuarioProm = ctx.db.user.findUnique({
    include: {
      usuarioRol: {
        include: {
          rol: true,
        },
      },
    },
    where: {
      id,
    },
  });

  const tieneMateriasProm = ctx.db.$queryRaw<{ tienematerias: boolean }[]>`
    SELECT
      EXISTS (SELECT 1 FROM "Materia" m WHERE m."directorUsuarioId" = ${id}) OR
      EXISTS (SELECT 1 FROM "Curso" c WHERE c."profesorId" = ${id}) OR
      EXISTS (SELECT 1 FROM "CursoAyudante" ca WHERE ca."userId" = ${id}) OR
      EXISTS (SELECT 1 FROM "MateriaJefeTp" mj WHERE mj."jefeTrabajoPracticoUsuarioId" = ${id}) AS tienematerias;
  `;

  const [usuario, tieneMaterias] = await Promise.all([usuarioProm, tieneMateriasProm]);

  if (!usuario) return null;

  const usuarioTieneMaterias = tieneMaterias.length > 0 ? (tieneMaterias[0]?.tienematerias ?? false) : false;

  return {
    ...usuario,
    tieneMaterias: usuarioTieneMaterias,
  };
};

type InputGetUsuariosPorIds = z.infer<typeof inputGetUsuariosPorIds>;
export const getUsuariosPorIds = async (ctx: { db: PrismaClient }, input: InputGetUsuariosPorIds) => {
  const { ids } = input;

  const usuarios = await ctx.db.user.findMany({
    select: {
      ...informacionUsuario,
    },
    where: {
      id: {
        in: ids,
      },
    },
  });

  return usuarios;
};

type InputGetTutorPorId = z.infer<typeof inputGetTutor>;
export const getTutorPorId = async (ctx: { db: PrismaClient }, input: InputGetTutorPorId) => {
  const { id } = input;

  console.log(id);

  return;
};

type InputEditarUsuario = z.infer<typeof inputEditarUsuario>;
export const editarUsuario = async (ctx: { db: PrismaClient }, input: InputEditarUsuario, userId: string) => {
  try {
    const usuario = await ctx.db.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.update({
        data: {
          esDocente: input.esDocente,
          esTutor: input.esTutor,
          usuarioRol: {
            deleteMany: {
              userId: input.id,
            },
            createMany: {
              data: input.roles.map((rolId) => ({
                rolId: parseInt(rolId),
                usuarioCreadorId: userId,
              })),
            },
          },
        },
        where: {
          id: input.id,
        },
      });

      if (input.esTutor) {
        await prisma.tutor.upsert({
          where: { userId: input.id },
          create: {
            userId: input.id,
            diasHorarios: "",
            especialidad: "",
            usuarioCreadorId: userId,
            activo: true,
          },
          update: {},
        });
      } else {
        // buscar si existe un tutor, si no existe no hacer nada, si existe eliminarlo
        const tutor = await prisma.tutor.findUnique({
          where: { userId: input.id },
        });
        if (tutor) {
          await prisma.tutor.delete({
            where: { userId: input.id },
          });
        }
      }

      return updatedUser;
    });

    return usuario;
  } catch (error) {
    console.error(error);
    throw new Error(`Error modificando usuario ${input.id}`);
  }
};

type InputEditarTutor = z.infer<typeof inputEditarTutor>;
export const editarTutor = async (ctx: { db: PrismaClient }, input: InputEditarTutor) => {
  try {
    const tutorActualizado = await ctx.db.tutor.update({
      data: {
        diasHorarios: input.diasHorarios,
        especialidad: input.especialidad,
      },
      where: {
        userId: input.id,
      },
    });

    return tutorActualizado;
  } catch (error) {
    throw new Error(`Error modificando tutor con ID ${input.id}`);
  }
};

export const getAllTutores = async (ctx: { db: PrismaClient }) => {
  const tutores = await ctx.db.tutor.findMany({
    include: {
      usuario: true,
    },
  });

  return tutores;
};

export const getAllTutoresEspecialidades = async (ctx: { db: PrismaClient }) => {
  const modelos = await ctx.db.tutor.findMany({
    orderBy: {
      especialidad: "asc",
    },
    select: {
      especialidad: true,
    },
    distinct: ["especialidad"],
    where: {
      especialidad: {
        not: "",
      },
    },
  });

  const modelosMapped = modelos.map(({ especialidad }) => especialidad);

  return modelosMapped;
};

type InputEliminarTutor = z.infer<typeof inputEliminarUsuario>;
export const eliminarTutor = async (ctx: { db: PrismaClient }, input: InputEliminarTutor) => {
  try {
    const tutor = await ctx.db.user.delete({
      where: {
        id: input.id,
      },
    });

    return tutor;
  } catch (error) {
    throw new Error(`Error eliminando tutor ${input.id}`);
  }
};

export const getAllProfesores = async (ctx: { db: PrismaClient }) => {
  const profesores = await ctx.db.user.findMany({
    where: {
      esDocente: true,
    },
    orderBy: {
      nombre: "asc",
    },
  });

  return {
    usuarios: profesores,
    count: profesores.length,
  };
};

type InputUserId = z.infer<typeof inputUserId>;
export const getReservasHechasEsteAnno = async (ctx: { db: PrismaClient }, input: InputUserId) => {
  const annoActual = new Date().getFullYear();

  const reservas = await ctx.db.$queryRaw<{ cantidad: bigint }[]>`
    SELECT COUNT(*) as cantidad
    FROM "Reserva" r
    WHERE
      r."usuarioSolicitoId" = ${input.userId} AND
      CAST(r.tipo AS TEXT) IN (${ReservaTipo.LABORATORIO_CERRADO}, ${ReservaTipo.LABORATORIO_ABIERTO}) AND
      r."fechaHoraInicio" BETWEEN '${annoActual}-01-01' AND '${annoActual}-12-31T23:59:59'
      LIMIT 1;
  `;

  if (!reservas || reservas.length === 0 || reservas[0] === undefined) {
    return 0;
  }

  const cantidad = Number(reservas[0].cantidad ?? 0);

  return cantidad;
};

export const getNumeroReservasQueNoAsistioEsteAnno = async (ctx: { db: PrismaClient }, input: InputUserId) => {
  const annoActual = new Date().getFullYear();

  const reservas = await ctx.db.$queryRaw<{ cantidad: bigint }[]>`
    SELECT COUNT(*) as cantidad
    FROM "Reserva" r
    WHERE
      r."usuarioSolicitoId" = ${input.userId} AND
      CAST(r.tipo AS TEXT) IN (${ReservaTipo.LABORATORIO_CERRADO}, ${ReservaTipo.LABORATORIO_ABIERTO}) AND
      r."fechaHoraInicio" BETWEEN '${annoActual}-01-01' AND '${annoActual}-12-31T23:59:59' AND
      r."asistio" = false
      LIMIT 1
  `;

  if (!reservas || reservas.length === 0 || reservas[0] === undefined) {
    return 0;
  }

  const cantidad = Number(reservas[0].cantidad ?? 0);

  return cantidad;
};

type InputCambiarAsistio = z.infer<typeof inputCambiarAsistio>;
export const cambiarAsistioReserva = async (ctx: { db: PrismaClient }, input: InputCambiarAsistio) => {
  try {
    const reserva = await ctx.db.reserva.update({
      where: {
        id: input.id,
      },
      data: {
        asistio: input.asistio,
      },
    });

    return reserva;
  } catch (error) {
    throw new Error(`Error cambiando asistió de reserva ${input.id}`);
  }
};
