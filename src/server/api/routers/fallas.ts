import {
  reportarPCProcedure,
  reportarInstrumentoProcedure,
  getAllFallasProcedure,
  getFallaPorIdProcedure,
  cambiarEstadoProcedure,
  actualizarCamposProcedure,
  eliminarFallaProcedure,
} from "../services/fallas/fallas.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const fallasRouter = createTRPCRouter({
  reportarInstrumento: reportarInstrumentoProcedure,
  reportarPC: reportarPCProcedure,
  getAllFallas: getAllFallasProcedure,
  getFallaPorId: getFallaPorIdProcedure,
  cambiarEstado: cambiarEstadoProcedure,
  actualizarCampos: actualizarCamposProcedure,
  eliminarFalla: eliminarFallaProcedure,
});
