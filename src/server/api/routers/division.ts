import {
  eliminarDivisionProcedure,
  getTodasLasDivisiones,
  editarDivisionProcedure,
  nuevaDivisionProcedure,
  getDivisionByIdProcedure,
  getDivisionesFiltradas,
} from "../services/division/division.service";
import { createTRPCRouter } from "../trpc";

export const divisionRouter = createTRPCRouter({
  getAll: getTodasLasDivisiones,
  getFiltered: getDivisionesFiltradas,
  getDivisionById: getDivisionByIdProcedure,
  eliminarDivision: eliminarDivisionProcedure,
  editarDivision: editarDivisionProcedure,
  nuevaDivision: nuevaDivisionProcedure,
});
