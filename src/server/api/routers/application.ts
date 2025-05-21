import { createTRPCRouter } from "@/server/api/trpc";
import { getNavbarChildrenProcedure, getNavbarElementsProcedure } from "../services/application/application.service";

export const applicationRouter = createTRPCRouter({
  getNavbarElements: getNavbarElementsProcedure,
  getNavbarChildren: getNavbarChildrenProcedure,
});
