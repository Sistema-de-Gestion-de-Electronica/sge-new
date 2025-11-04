import { protectedProcedure } from "../../trpc";
import {
  getUsuariosConPermisoReportarFallas,
  getUsuariosConPermisoResolverFallas,
} from "../../repositories/usuarios/usuarios-fallas.repository";

export const getUsuariosConPermisoReportarFallasProcedure = protectedProcedure.query(async ({ ctx }) => {
  return await getUsuariosConPermisoReportarFallas(ctx);
});

export const getUsuariosConPermisoResolverFallasProcedure = protectedProcedure.query(async ({ ctx }) => {
  return await getUsuariosConPermisoResolverFallas(ctx);
});
