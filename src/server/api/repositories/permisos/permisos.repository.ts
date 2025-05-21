import { type SgeNombre, type PrismaClient } from "@/generated/prisma";
import { type z } from "zod";
import { type inputGetUsuarioYRol } from "@/shared/filters/permisos-filter";

type InputGetUsuarioYRol = z.infer<typeof inputGetUsuarioYRol>;

export const getUsuarioYPermisos = async (ctx: { db: PrismaClient }, input: InputGetUsuarioYRol) => {
  const { usuarioId } = input;

  const permisosResult = await ctx.db.$queryRaw<{ sgeNombre: SgeNombre }[]>`
    SELECT DISTINCT p."sgeNombre"
    FROM "User" u
    INNER JOIN "UsuarioRol" ur ON ur."userId" = u.id
    INNER JOIN "Rol" r ON r.id = ur."rolId"
    INNER JOIN "RolPermiso" rp ON rp."rolId" = r.id
    INNER JOIN "Permiso" p ON p.id = rp."permisoId"
    WHERE u.id = ${usuarioId};
  `;

  if (!permisosResult || permisosResult.length === 0) {
    return [];
  }

  const permisosSgeNombre = permisosResult.map((permiso) => permiso.sgeNombre);

  return permisosSgeNombre;
};

export const verificarPermisoUsuario = async (
  ctx: { db: PrismaClient },
  usuarioId: string,
  sgePermisoNombre: SgeNombre[],
) => {
  const permisos = Array.isArray(sgePermisoNombre) ? sgePermisoNombre : [sgePermisoNombre];

  const result = await ctx.db.$queryRaw<{ existe: boolean }[]>`SELECT 
  EXISTS (
      SELECT 1
        FROM "User" u
      JOIN "UsuarioRol" ur ON ur."userId" = u.id
      JOIN "Rol" r ON r.id = ur."rolId"
      JOIN "RolPermiso" rp ON rp."rolId" = r.id
      JOIN "Permiso" p ON p.id = rp."permisoId"
        WHERE 
          u.id = ${usuarioId} AND 
          p."sgeNombre" = ANY(ARRAY[${permisos}]::"SgeNombre"[])
    ) AS "existe";
  `;

  return result[0]?.existe ?? false;
};
