import {
  eliminarMateriaProcedure,
  getAllMateriasProcedure,
  editarMateriaProcedure,
  nuevaMateriaProcedure,
  getMateriaByIdProcedure,
  getMateriasCorrelativasProcedure,
} from "../services/materia/materia.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const materiasRouter = createTRPCRouter({
  getAll: getAllMateriasProcedure,
  getMateriaById: getMateriaByIdProcedure,
  getMateriasCorrelativas: getMateriasCorrelativasProcedure,
  eliminarMateria: eliminarMateriaProcedure,
  editarMateria: editarMateriaProcedure,
  nuevaMateria: nuevaMateriaProcedure,
});
