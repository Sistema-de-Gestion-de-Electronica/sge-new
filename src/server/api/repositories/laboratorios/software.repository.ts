import type {
  inputAddSoftware,
  inputEditarSoftware,
  inputEliminarSoftware,
  inputGetSoftware,
  inputGetSoftwareFilter,
} from "@/shared/filters/laboratorio-filter.schema";
import { Prisma, type PrismaClient } from "@/generated/prisma";
import { type z } from "zod";

type InputGetAll = z.infer<typeof inputGetSoftwareFilter>;
export const getAllSoftware = async (ctx: { db: PrismaClient }, input: InputGetAll) => {
  const { searchText, sedeId } = input;

  const searchClause = searchText?.trim()
    ? Prisma.sql`AND (s.nombre ILIKE ${`%${searchText}%`} OR s.estado ILIKE ${`%${searchText}%`})`
    : Prisma.sql``;

  const sedeClause = sedeId ? Prisma.sql`AND l."sedeId" = ${sedeId}::int` : Prisma.sql``;

  const softwareQuery = Prisma.sql`
    SELECT
      s.id AS id,
      s.nombre AS nombre,
      s.version AS version,
      s.estado AS estado,
      s.windows AS windows,
      s.linux AS linux,
      json_object_agg(
        l.id,
        CASE WHEN sl."softwareId" IS NOT NULL THEN true ELSE false END
      ) AS laboratorios
    FROM "Software" s
    INNER JOIN "SoftwareLaboratorio" sl ON s.id = sl."softwareId"
    INNER JOIN "Laboratorio" l ON l.id = sl."laboratorioId"
    WHERE l."incluirEnReporte" = true ${searchClause} ${sedeClause}
    GROUP BY s.id, s.nombre
  `;

  type Software = {
    id: number;
    nombre: string;
    version: string;
    estado: string;
    windows: boolean;
    linux: boolean;
    laboratorios: Record<string, boolean>;
  };

  const [software, laboratorios] = await ctx.db.$transaction([
    ctx.db.$queryRaw<Software[]>(softwareQuery),
    ctx.db.laboratorio.findMany({
      select: {
        id: true,
        nombre: true,
      },
      where: {
        incluirEnReporte: true,
        sedeId: sedeId ? { equals: Number(sedeId) } : undefined,
      },
    }),
  ]);

  return { software, laboratorios };
};

type InputGetSoftware = z.infer<typeof inputGetSoftware>;
export const getSoftwarePorId = async (ctx: { db: PrismaClient }, input: InputGetSoftware) => {
  const { id } = input;

  const software = await ctx.db.software.findUnique({
    where: {
      id,
    },
    include: {
      laboratorios: {
        include: {
          laboratorio: {
            select: {
              id: true,
              nombre: true,
            },
          },
        },
      },
    },
  });

  return software;
};

type InputEditarSoftware = z.infer<typeof inputEditarSoftware>;
export const editarSoftware = async (ctx: { db: PrismaClient }, input: InputEditarSoftware, userId: string) => {
  const { id } = input;

  try {
    const software = await ctx.db.software.update({
      where: {
        id,
      },
      data: {
        nombre: input.nombre,
        version: input.version,
        estado: input.estado,
        windows: input.windows,
        linux: input.linux,
        laboratorios: {
          deleteMany: {},
          createMany: {
            data: input.laboratorios.map((laboratorioId) => ({
              laboratorioId: parseInt(laboratorioId),
              usuarioCreadorId: userId,
            })),
          },
        },

        usuarioModificadorId: userId,
      },
    });

    return software;
  } catch (error) {
    throw new Error(`Error modificando software ${input.id}`);
  }
};

type InputAddSoftware = z.infer<typeof inputAddSoftware>;
export const agregarSoftware = async (ctx: { db: PrismaClient }, input: InputAddSoftware, userId: string) => {
  try {
    const software = await ctx.db.software.create({
      data: {
        nombre: input.nombre,
        version: input.version,
        estado: input.estado,
        windows: input.windows,
        linux: input.linux,
        laboratorios: {
          createMany: {
            data: input.laboratorios.map((laboratorioId) => ({
              laboratorioId: parseInt(laboratorioId),
              usuarioCreadorId: userId,
            })),
          },
        },

        usuarioCreadorId: userId,
        usuarioModificadorId: userId,
      },
    });

    return software;
  } catch (error) {
    throw new Error(`Error agregando software`);
  }
};

type InputEliminarSoftware = z.infer<typeof inputEliminarSoftware>;
export const eliminarSoftware = async (ctx: { db: PrismaClient }, input: InputEliminarSoftware) => {
  try {
    const software = await ctx.db.software.delete({
      where: {
        id: input.id,
      },
    });

    return software;
  } catch (error) {
    throw new Error(`Error eliminando software ${input.id}`);
  }
};
