import { type SgeNombre } from "@/generated/prisma";
import { getUsuarioYPermisos } from "../../repositories/permisos/permisos.repository";
import { protectedProcedure } from "../../trpc";
import { APP_ROUTES, type AppRoute, ZodRuta } from "@/shared/server-routes";
import { z } from "zod";
import { validarInput } from "../helper";

const zodRuta = z.object({
  subRutas: z.array(ZodRuta),
});

const getSetDePermisos = (permisos: SgeNombre[]) => {
  const mapaPermisos = permisos.reduce((acc, permiso) => {
    acc.add(permiso);

    return acc;
  }, new Set<SgeNombre>());

  return mapaPermisos;
};

const navBarQuePuedeVer = (listaElementos: AppRoute[], listaPermisos: SgeNombre[]) => {
  const mapaPermisos = getSetDePermisos(listaPermisos);

  const tienePermiso = (permisos: SgeNombre[]) => {
    return permisos.length === 0 || permisos.some((permiso) => mapaPermisos.has(permiso));
  };

  const navbarRutasPuedeVer = listaElementos
    .filter((item) => tienePermiso(item.permisos))
    .map((item) => ({
      ...item,
      subRutas: item.subRutas?.filter((subItem) => tienePermiso(subItem.permisos)),
    }));

  return navbarRutasPuedeVer;
};

// Retorna todas las rutas al navbar que el usuario puede ver con sus permisos
export const getNavbarElementsProcedure = protectedProcedure.query(async ({ ctx }) => {
  const userId = ctx.session.user.id;

  const listaPermisos = await getUsuarioYPermisos(ctx, { usuarioId: userId });

  const navbarRutasPuedeVer = navBarQuePuedeVer(APP_ROUTES, listaPermisos);

  return navbarRutasPuedeVer;
});

export const getNavbarChildrenProcedure = protectedProcedure.input(zodRuta).query(async ({ ctx, input }) => {
  validarInput(zodRuta, input);

  const userId = ctx.session.user.id;

  const listaPermisos = await getUsuarioYPermisos(ctx, { usuarioId: userId });

  const navbarRutasPuedeVer = navBarQuePuedeVer(input.subRutas, listaPermisos);

  return navbarRutasPuedeVer;
});
