import { createTRPCRouter } from "@/server/api/trpc";
import {
  cursoPorIdProcedure,
  editarCursoProcedure,
  eliminarCursoProcedure,
  getTodosLosCursosProcedure,
  nuevoCursoBulkInsertProcedure,
  nuevoCursoProcedure,
} from "../services/cursos/cursos.service";

export const cursosRouter = createTRPCRouter({
  getAll: getTodosLosCursosProcedure,
  cursoPorId: cursoPorIdProcedure,
  nuevoCurso: nuevoCursoProcedure,
  nuevoCursoBulkInsert: nuevoCursoBulkInsertProcedure,
  editarCurso: editarCursoProcedure,
  eliminarCurso: eliminarCursoProcedure,
});
