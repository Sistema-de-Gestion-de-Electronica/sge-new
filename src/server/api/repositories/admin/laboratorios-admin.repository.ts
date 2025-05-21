import type {
  inputGetArmarios,
  inputGetEstantes,
  inputAgregarLaboratorio,
  inputEditarLaboratorio,
  inputEliminarLaboratorio,
  inputGetLaboratorio,
  inputGetLaboratorios,
  inputGetLaboratoriosConEstadoReserva,
} from "@/shared/filters/admin-laboratorios-filter.schema";
import { Prisma, type PrismaClient } from "@/generated/prisma";
import { type z } from "zod";
import { obtenerTodasLasReservasEnHorario } from "../reservas/laboratorioEnUso.repository";

type InputGetAll = z.infer<typeof inputGetLaboratorios>;
export const getAllLaboratorios = async (ctx: { db: PrismaClient }, input: InputGetAll) => {
  const { searchText, sedeId } = input;

  const laboratorios = await ctx.db.laboratorio.findMany({
    include: {
      armarios: {
        select: {
          id: true,
          nombre: true,
        },
      },
      sede: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
    where: {
      nombre: {
        contains: searchText ?? undefined,
        mode: "insensitive",
      },
      ...(sedeId !== undefined && sedeId !== null && sedeId !== ""
        ? {
            sedeId: Number(sedeId),
          }
        : {}),
    },
    orderBy: {
      nombre: "asc",
    },
  });

  return {
    count: laboratorios.length,
    laboratorios: laboratorios,
  };
};

export const getAllLaboratoriosConArmario = async (ctx: { db: PrismaClient }, input: InputGetAll) => {
  const { sedeId } = input;

  const laboratorios = await ctx.db.laboratorio.findMany({
    select: {
      id: true,
      nombre: true,
    },
    where: {
      ...(sedeId !== undefined && sedeId !== null
        ? {
            sedeId: Number(sedeId),
          }
        : {}),
      armarios: {
        some: {},
      },
    },
  });

  return laboratorios;
};

type InputGetAllConEstado = z.infer<typeof inputGetLaboratoriosConEstadoReserva>;
export const getAllLaboratoriosConEstadoReserva = async (ctx: { db: PrismaClient }, input: InputGetAllConEstado) => {
  const { searchText, sedeId, fechaHoraFin, fechaHoraInicio, excepcionReservaId, ignorarSede } = input;

  if (!fechaHoraFin || !fechaHoraInicio) {
    return {
      count: 0,
      laboratorios: [],
    };
  }

  const res = await obtenerTodasLasReservasEnHorario(ctx, {
    fechaHoraFin: fechaHoraFin,
    fechaHoraInicio: fechaHoraInicio,
    excepcionReservaId: excepcionReservaId,
    searchText,
    sedeId: ignorarSede ? undefined : sedeId ? Number(sedeId) : undefined,
  });

  return {
    count: res.length,
    laboratorios: res,
  };
};

export const getAllLaboratoriosReservables = async (ctx: { db: PrismaClient }, input: InputGetAll) => {
  const { searchText, sedeId } = input;

  const laboratorios = await ctx.db.laboratorio.findMany({
    include: {
      armarios: {
        select: {
          id: true,
          nombre: true,
        },
      },
      sede: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
    where: {
      esReservable: true,
      nombre: {
        contains: searchText ?? undefined,
        mode: "insensitive",
      },
      ...(sedeId !== undefined && sedeId !== null && sedeId !== ""
        ? {
            sedeId: Number(sedeId),
          }
        : {}),
    },
  });

  return {
    count: laboratorios.length,
    laboratorios: laboratorios,
  };
};

type InputGetLaboratorioPorId = z.infer<typeof inputGetLaboratorio>;
export const getLaboratorioPorId = async (ctx: { db: PrismaClient }, input: InputGetLaboratorioPorId) => {
  const { id } = input;

  const laboratorio = await ctx.db.laboratorio.findUnique({
    include: {
      armarios: {
        include: {
          estantes: {
            orderBy: {
              id: "asc",
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      },
      sede: true,
    },
    where: {
      id,
    },
  });

  return laboratorio;
};

type InputEliminarLaboratorio = z.infer<typeof inputEliminarLaboratorio>;
export const eliminarLaboratorio = async (ctx: { db: PrismaClient }, input: InputEliminarLaboratorio) => {
  const laboratorio = await ctx.db.$transaction(async (tx) => {
    const existeEquipoEnLaboratorio = await tx.equipo.findFirst({
      where: {
        laboratorioId: input.id,
      },
      select: {
        id: true,
      },
    });

    if (existeEquipoEnLaboratorio) {
      throw new Error("No se puede eliminar un laboratorio con equipos asignados");
    }

    const laboratorio = await tx.laboratorio.delete({
      where: {
        id: input.id,
      },
    });

    return laboratorio;
  });

  return laboratorio;
};

type InputEditarLaboratorio = z.infer<typeof inputEditarLaboratorio>;
export const editarLaboratorio = async (ctx: { db: PrismaClient }, input: InputEditarLaboratorio, userId: string) => {
  const laboratorio = await ctx.db.$transaction(async (tx) => {
    // UPDATE DEL LABORATORIO
    const laboratorioConArmariosYEstante = await ctx.db.laboratorio.update({
      data: {
        nombre: input.nombre,
        sedeId: parseInt(input.sedeId),
        esReservable: input.esReservable,
        tienePc: input.tienePc,
        usuarioModificadorId: userId,
      },
      where: {
        id: input.id,
      },
      select: {
        id: true,
        armarios: {
          select: {
            id: true,
            estantes: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    // Creo los armarios que no estan en el laboratorioActual
    const armariosNuevos = (input.armarios ?? [])
      .filter((armario) => !armario.id)
      .map((armario) => {
        return tx.armario.create({
          data: {
            nombre: armario.nombre,
            usuarioCreadorId: userId,
            usuarioModificadorId: userId,
            laboratorioId: laboratorioConArmariosYEstante.id,
            estantes: {
              createMany: {
                data: (armario.estantes ?? []).map((estante) => ({
                  nombre: estante.nombre,
                  usuarioCreadorId: userId,
                  usuarioModificadorId: userId,
                })),
              },
            },
          },
        });
      });

    // Elimino los armarios que existen en la base de datos pero no en el input
    // Nota @Alex: Va a fallar si tiene equipos en el laboratorio
    const armariosEliminados = laboratorioConArmariosYEstante.armarios
      .filter((armario) => {
        return !input.armarios?.find((inputArmario) => inputArmario.id === armario.id);
      })
      .map(async (armario) => {
        const armarioAEliminar = await tx.equipo.findFirst({
          where: {
            OR: [
              {
                estante: {
                  armarioId: armario.id,
                },
              },
              {
                armarioId: armario.id,
              },
            ],
          },
          select: {
            id: true,
          },
        });

        if (armarioAEliminar) {
          throw new Error(`Error: No se puede eliminar el armario porque contiene equipos`);
        }

        return tx.armario.delete({
          where: {
            id: armario.id,
          },
        });
      });

    // Modifico los armarios que existen en la base y que se encuentran en el input
    const armariosModificados = (input.armarios ?? [])
      .filter((armario) => armario.id)
      .map((armario) => {
        return tx.armario.update({
          data: {
            nombre: armario.nombre,
            usuarioModificadorId: userId,
          },
          where: {
            id: armario.id,
          },
        });
      });

    // Modifico los estantes de los armarios que existen en la base y que se encuentran en el input
    const estantesModificados = (input.armarios ?? [])
      .filter((armario) => armario.id)
      .map(async (armario) => {
        const armarioId = armario.id;

        if (!armarioId) return {};

        const estantesACrear = (armario.estantes ?? []).filter((estante) => !estante.id);
        const estantesAModificar = (armario.estantes ?? []).filter((estante) => estante.id);
        const estantesAEliminar = laboratorioConArmariosYEstante.armarios
          .find((armario) => {
            return armario.id === armarioId;
          })
          ?.estantes.filter((estante) => {
            return !input.armarios
              ?.find((inputArmario) => inputArmario.id === armarioId)
              ?.estantes?.find((inputEstante) => inputEstante.id === estante.id);
          });

        // Estantes nuevos de armario existente
        const estantesNuevos = estantesACrear.map((estante) => {
          return tx.estante.create({
            data: {
              nombre: estante.nombre,
              usuarioCreadorId: userId,
              usuarioModificadorId: userId,
              armarioId: armarioId,
            },
          });
        });

        // Estantes que existen en la base de datos, pero no en el input
        const estantesEliminados = (estantesAEliminar ?? []).map(async (estante) => {
          const estanteAEliminar = await tx.equipo.findFirst({
            where: {
              estanteId: estante.id,
            },
            select: {
              id: true,
              estante: {
                select: {
                  nombre: true,
                },
              },
            },
          });

          if (estanteAEliminar) {
            throw new Error(
              `Error: No se puede eliminar el estante ${estanteAEliminar?.estante?.nombre} porque contiene equipos`,
            );
          }

          return tx.estante.delete({
            where: {
              id: estante.id,
            },
          });
        });

        // Estantes que existen en la base de datos y que se encuentran en el input
        const estantesModificados = estantesAModificar.map((estante) => {
          return tx.estante.update({
            data: {
              nombre: estante.nombre,
              usuarioModificadorId: userId,
            },
            where: {
              id: estante.id,
            },
          });
        });

        await Promise.all([...estantesNuevos, ...estantesEliminados, ...estantesModificados]);

        return [...estantesNuevos, ...estantesEliminados, ...estantesModificados];
      });

    await Promise.all([...armariosNuevos, ...armariosEliminados, ...armariosModificados, ...estantesModificados]);

    return laboratorioConArmariosYEstante;
  });

  return laboratorio;
};

type InputAgregarLaboratorio = z.infer<typeof inputAgregarLaboratorio>;
export const agregarLaboratorio = async (ctx: { db: PrismaClient }, input: InputAgregarLaboratorio, userId: string) => {
  try {
    const laboratorio = await ctx.db.$transaction(async (tx) => {
      const laboratorio = await ctx.db.laboratorio.create({
        data: {
          nombre: input.nombre,
          sedeId: parseInt(input.sedeId),
          esReservable: input.esReservable,
          tienePc: input.tienePc,
          usuarioCreadorId: userId,
          usuarioModificadorId: userId,
        },
      });

      const armariosCreados = (input.armarios ?? []).map((armario) => {
        return tx.armario.create({
          data: {
            nombre: armario.nombre,
            usuarioCreadorId: userId,
            usuarioModificadorId: userId,
            laboratorioId: laboratorio.id,
            estantes: {
              createMany: {
                data: armario.estantes.map((estante) => ({
                  nombre: estante.nombre,
                  usuarioCreadorId: userId,
                  usuarioModificadorId: userId,
                })),
              },
            },
          },
        });
      });

      await Promise.all(armariosCreados);

      return laboratorio;
    });

    return laboratorio;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("El código de laboratorio ya existe");
      }
    }

    throw new Error("Error agregando laboratorio");
  }
};

export const getAllSedes = async (ctx: { db: PrismaClient }) => {
  const sedes = await ctx.db.sede.findMany({
    select: {
      id: true,
      nombre: true,
    },
    orderBy: {
      nombre: "asc",
    },
  });

  return sedes;
};

export const getAllSedesConLaboratorios = async (ctx: { db: PrismaClient }) => {
  const sedes = await ctx.db.sede.findMany({
    select: {
      id: true,
      nombre: true,
      laboratorios: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
    where: {
      laboratorios: {
        some: {},
      },
    },
    orderBy: {
      nombre: "asc",
    },
  });

  return sedes;
};

type InputGetAllArmarios = z.infer<typeof inputGetArmarios>;
export const getAllArmarios = async (ctx: { db: PrismaClient }, input: InputGetAllArmarios) => {
  const { laboratorioId } = input;

  const armarios = await ctx.db.armario.findMany({
    select: {
      id: true,
      nombre: true,
    },
    where: {
      laboratorioId,
    },
    orderBy: {
      nombre: "asc",
    },
  });

  return armarios;
};

type InputGetAllEstantes = z.infer<typeof inputGetEstantes>;
export const getAllEstantes = async (ctx: { db: PrismaClient }, input: InputGetAllEstantes) => {
  const { armarioId } = input;

  const estantes = await ctx.db.estante.findMany({
    select: {
      id: true,
      nombre: true,
    },
    where: {
      armarioId,
    },
    orderBy: {
      nombre: "asc",
    },
  });

  return estantes;
};
