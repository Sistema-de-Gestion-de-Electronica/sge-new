import {
  nuevaInscripcionEspecialProcedure,
  getAllInscripcionesEspecialesProcedure,
  rechazarInscripcionEspecialProcedure,
  aprobarInscripcionEspecialProcedure,
  getInscripcionEspecialByIdProcedure,
  actualizarContactoAsistenciaProcedure,
  eliminarInscripcionEspecialProcedure,
} from "../services/inscripcionesEspeciales/inscripcionesEspeciales.service";

import {
  crearPeriodoInscripcionEspecialProcedure,
  actualizarPeriodoInscripcionEspecialProcedure,
  getPeriodoInscripcionEspecialActualProcedure,
  getUltimoPeriodoInscripcionEspecialProcedure,
  verificarPeriodoActivoProcedure,
} from "../services/inscripcionesEspeciales/periodosInscripcionEspecial.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const inscripcionesEspecialesRouter = createTRPCRouter({
  nuevaInscripcionEspecial: nuevaInscripcionEspecialProcedure,
  getAllInscripcionesEspeciales: getAllInscripcionesEspecialesProcedure,
  rechazarInscripcionEspecial: rechazarInscripcionEspecialProcedure,
  aprobarInscripcionEspecial: aprobarInscripcionEspecialProcedure,
  getInscripcionEspecialPorId: getInscripcionEspecialByIdProcedure,
  actualizarContactoAsistencia: actualizarContactoAsistenciaProcedure,
  eliminarInscripcionEspecial: eliminarInscripcionEspecialProcedure,
  crearPeriodoInscripcionEspecial: crearPeriodoInscripcionEspecialProcedure,
  actualizarPeriodoInscripcionEspecial: actualizarPeriodoInscripcionEspecialProcedure,
  getPeriodoInscripcionEspecialActual: getPeriodoInscripcionEspecialActualProcedure,
  getUltimoPeriodoInscripcionEspecial: getUltimoPeriodoInscripcionEspecialProcedure,
  verificarPeriodoActivo: verificarPeriodoActivoProcedure,
});
