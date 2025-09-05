import {
  nuevaInscripcionEspecialProcedure,
  getAllInscripcionesEspecialesProcedure,
  rechazarInscripcionEspecialProcedure,
  aprobarInscripcionEspecialProcedure,
} from "../services/inscripcionesEspeciales/inscripcionesEspeciales.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const inscripcionesEspecialesRouter = createTRPCRouter({
  nuevaInscripcionEspecial: nuevaInscripcionEspecialProcedure,
  getAllInscripcionesEspecialesProcedure: getAllInscripcionesEspecialesProcedure,
  rechazarInscripcionEspecialProcedure: rechazarInscripcionEspecialProcedure,
  aprobarInscripcionEspecialProcedure: aprobarInscripcionEspecialProcedure,
});
