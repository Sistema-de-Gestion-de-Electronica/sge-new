import { api } from "@/trpc/server";
import { getServerAuthSession } from "./auth";
import { type SgeNombre } from "@/generated/prisma";

export const tienePermisoBack = async (permisos: SgeNombre[]) => {
  const tienePermiso = await api.permisos.usuarioTienePermisos({ permisos });

  return tienePermiso;
};

export const getSession = async () => {
  const session = await getServerAuthSession();

  return session;
};

export const estaLogueadoYConPermiso = async (permisos: SgeNombre[]) => {
  const sesionProm = getSession();
  const tienePermisoProm = tienePermisoBack(permisos);

  const [sesion, tienePermiso] = await Promise.all([sesionProm, tienePermisoProm]);

  if (!sesion) {
    return false;
  }

  if (!tienePermiso) {
    return false;
  }

  return true;
};
