import {
  nuevaInscripcionEspecialProcedure,
  getAllInscripcionesEspecialesProcedure,
  rechazarInscripcionEspecialProcedure,
  aprobarInscripcionEspecialProcedure,
  aprobarInscripcionEspecialConCondicionProcedure,
  getInscripcionEspecialByIdProcedure,
  actualizarContactoAsistenciaProcedure,
  eliminarInscripcionEspecialProcedure,
  enviarMailContactoInscripcionEspecialProcedure,
  actualizarCursosInscripcionEspecialProcedure,
} from "../services/inscripcionesEspeciales/inscripcionesEspeciales.service";

import {
  crearPeriodoInscripcionEspecialProcedure,
  actualizarPeriodoInscripcionEspecialProcedure,
  getPeriodoInscripcionEspecialActualProcedure,
  getUltimoPeriodoInscripcionEspecialProcedure,
  verificarPeriodoActivoProcedure,
  getTodosPeriodosInscripcionEspecialProcedure,
  eliminarPeriodoInscripcionEspecialProcedure as eliminarPeriodoIEProcedure,
} from "../services/inscripcionesEspeciales/periodosInscripcionEspecial.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const inscripcionesEspecialesRouter = createTRPCRouter({
  nuevaInscripcionEspecial: nuevaInscripcionEspecialProcedure,
  getAllInscripcionesEspeciales: getAllInscripcionesEspecialesProcedure,
  rechazarInscripcionEspecial: rechazarInscripcionEspecialProcedure,
  aprobarInscripcionEspecial: aprobarInscripcionEspecialProcedure,
  aprobarInscripcionEspecialConCondicion: aprobarInscripcionEspecialConCondicionProcedure,
  getInscripcionEspecialPorId: getInscripcionEspecialByIdProcedure,
  actualizarContactoAsistencia: actualizarContactoAsistenciaProcedure,
  eliminarInscripcionEspecial: eliminarInscripcionEspecialProcedure,
  enviarMailContacto: enviarMailContactoInscripcionEspecialProcedure,
  actualizarCursos: actualizarCursosInscripcionEspecialProcedure,
  crearPeriodoInscripcionEspecial: crearPeriodoInscripcionEspecialProcedure,
  actualizarPeriodoInscripcionEspecial: actualizarPeriodoInscripcionEspecialProcedure,
  getPeriodoInscripcionEspecialActual: getPeriodoInscripcionEspecialActualProcedure,
  getUltimoPeriodoInscripcionEspecial: getUltimoPeriodoInscripcionEspecialProcedure,
  verificarPeriodoActivo: verificarPeriodoActivoProcedure,
  getTodosPeriodosInscripcionEspecial: getTodosPeriodosInscripcionEspecialProcedure,
  eliminarPeriodoInscripcionEspecial: eliminarPeriodoIEProcedure,
});
