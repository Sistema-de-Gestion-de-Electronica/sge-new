import { createTRPCRouter } from "@/server/api/trpc";
import { getAllLaboratoriosProcedure } from "../services/laboratorios/laboratorios.service";

export const laboratoriosRouter = createTRPCRouter({
  getAll: getAllLaboratoriosProcedure,
});
