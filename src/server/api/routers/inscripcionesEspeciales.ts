import {
  nuevaInscripcionEspecialProcedure,
  getAllInscripcionesEspecialesProcedure,
  rechazarInscripcionEspecialProcedure,
  aprobarInscripcionEspecialProcedure,
  getInscripcionEspecialByIdProcedure,
  actualizarContactoAsistenciaProcedure,
  eliminarInscripcionEspecialProcedure,
} from "../services/inscripcionesEspeciales/inscripcionesEspeciales.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const inscripcionesEspecialesRouter = createTRPCRouter({
  nuevaInscripcionEspecial: nuevaInscripcionEspecialProcedure,
  getAllInscripcionesEspeciales: getAllInscripcionesEspecialesProcedure,
  rechazarInscripcionEspecial: rechazarInscripcionEspecialProcedure,
  aprobarInscripcionEspecial: aprobarInscripcionEspecialProcedure,
  getInscripcionEspecialPorId: getInscripcionEspecialByIdProcedure,
  actualizarContactoAsistencia: actualizarContactoAsistenciaProcedure,
  eliminarInscripcionEspecial: eliminarInscripcionEspecialProcedure,
});
