import {
  reportarPCProcedure,
  reportarInstrumentoProcedure,
  getAllFallasProcedure,
} from "../services/fallas/fallas.service";

import { createTRPCRouter } from "@/server/api/trpc";

export const fallasRouter = createTRPCRouter({
  reportarInstrumento: reportarInstrumentoProcedure,
  reportarPC: reportarPCProcedure,
  getAllFallas: getAllFallasProcedure,
});
