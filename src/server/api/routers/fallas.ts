import {
  createFallaPCProcedure,
  createFallaInstrumentoProcedure,
  findAllFallasProcedure,
  findFallaByIdProcedure,
  updateEstadoFallaProcedure,
  updateFallaProcedure,
  deleteFallaProcedure,
  findHistorialByFallaIdProcedure,
  findHistorialByEquipoIdProcedure,
  getAllEstadosProcedure
} from "../services/fallas/fallas.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const fallasRouter = createTRPCRouter({
  // Crear fallas
  createFallaInstrumento: createFallaInstrumentoProcedure,
  createFallaPC: createFallaPCProcedure,

  // Consultar fallas
  findAllFallas: findAllFallasProcedure,
  findFallaById: findFallaByIdProcedure,

  // Actualizar fallas
  updateEstadoFalla: updateEstadoFallaProcedure,
  updateFalla: updateFallaProcedure,

  // Eliminar fallas
  deleteFalla: deleteFallaProcedure,

  // Historial
  findHistorialByFallaId: findHistorialByFallaIdProcedure,

  // Aliases para compatibilidad (deprecated)
  reportarInstrumento: createFallaInstrumentoProcedure,
  reportarPC: createFallaPCProcedure,
  getAllFallas: findAllFallasProcedure,
  getFallaPorId: findFallaByIdProcedure,
  cambiarEstado: updateEstadoFallaProcedure,
  actualizarCampos: updateFallaProcedure,
  eliminarFalla: deleteFallaProcedure,
  getHistorialPorFallaId: findHistorialByFallaIdProcedure,
  getHistorialPorEquipoId: findHistorialByEquipoIdProcedure,
  getAllEstados: getAllEstadosProcedure,
});
