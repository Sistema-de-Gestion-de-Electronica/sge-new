import { type PrismaClient } from "@/generated/prisma";
import { SgeNombre } from "@/generated/prisma";

type Context = { db: PrismaClient };

export const getUsuariosConPermisoReportarFallas = async (ctx: Context) => {
  const usuarios = await ctx.db.$queryRaw<
    {
      id: string;
      nombre: string;
      apellido: string;
      email: string;
    }[]
  >`
    SELECT DISTINCT u.id, u.nombre, u.apellido, u.email
    FROM "User" u
    INNER JOIN "UsuarioRol" ur ON ur."userId" = u.id
    INNER JOIN "Rol" r ON r.id = ur."rolId"
    INNER JOIN "RolPermiso" rp ON rp."rolId" = r.id
    INNER JOIN "Permiso" p ON p.id = rp."permisoId"
    WHERE p."sgeNombre" = ${SgeNombre.REP_FALLAS_REPORTAR_FALLAS}::"SgeNombre"
    ORDER BY u.nombre ASC
  `;

  return usuarios;
};

export const getUsuariosConPermisoResolverFallas = async (ctx: Context) => {
  const usuarios = await ctx.db.$queryRaw<
    {
      id: string;
      nombre: string;
      apellido: string;
      email: string;
    }[]
  >`
    SELECT DISTINCT u.id, u.nombre, u.apellido, u.email
    FROM "User" u
    INNER JOIN "UsuarioRol" ur ON ur."userId" = u.id
    INNER JOIN "Rol" r ON r.id = ur."rolId"
    INNER JOIN "RolPermiso" rp ON rp."rolId" = r.id
    INNER JOIN "Permiso" p ON p.id = rp."permisoId"
    WHERE p."sgeNombre" = ${SgeNombre.REP_FALLAS_RESOLVER_FALLAS}::"SgeNombre"
    ORDER BY u.nombre ASC
  `;

  return usuarios;
};
