import { protectedProcedure } from "../../trpc";
import { getUsuarioYPermisos } from "../../repositories/permisos/permisos.repository";
import { permisosSchema } from "@/shared/filters/permisos-filter";
import { tienePermiso } from "./permisos.helper";

export const getUsuarioPermiso = protectedProcedure.query(async ({ ctx }) => {
  const userId = ctx.session.user.id;

  const usuario = await getUsuarioYPermisos(ctx, { usuarioId: userId });

  return usuario;
});

export const usuarioTienePermisos = protectedProcedure.input(permisosSchema).query(async ({ ctx, input }) => {
  const userId = ctx.session.user.id;
  const permisos = input.permisos;

  return await tienePermiso(ctx, permisos, userId);
});
