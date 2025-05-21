import { type PrismaClient, type SgeNombre } from "@/generated/prisma";
import { verificarPermisoUsuario } from "../../repositories/permisos/permisos.repository";

export const tienePermiso = async (ctx: { db: PrismaClient }, permisos: SgeNombre[], userId: string) => {
  if (permisos.length === 0) {
    return true;
  }

  const tienePermiso = await verificarPermisoUsuario(ctx, userId, permisos);

  return tienePermiso;
};
