import {
  reportarPCProcedure,
  reportarInstrumentoProcedure,
  getAllFallasProcedure,
  getFallaPorIdProcedure,
} from "../services/fallas/fallas.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const fallasRouter = createTRPCRouter({
  reportarInstrumento: reportarInstrumentoProcedure,
  reportarPC: reportarPCProcedure,
  getAllFallas: getAllFallasProcedure,
  getFallaPorId: getFallaPorIdProcedure,
});
