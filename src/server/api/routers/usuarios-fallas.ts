import { createTRPCRouter } from "@/server/api/trpc";
import {
  getUsuariosConPermisoReportarFallasProcedure,
  getUsuariosConPermisoResolverFallasProcedure,
} from "../services/usuarios/usuarios-fallas.service";

export const usuariosFallasRouter = createTRPCRouter({
  getUsuariosConPermisoReportarFallas: getUsuariosConPermisoReportarFallasProcedure,
  getUsuariosConPermisoResolverFallas: getUsuariosConPermisoResolverFallasProcedure,
});
