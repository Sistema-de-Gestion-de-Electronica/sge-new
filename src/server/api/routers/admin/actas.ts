import { createTRPCRouter } from "@/server/api/trpc";
import { agregarActaProcedure } from "../../services/admin/actas-admin.service";

export const actasRouter = createTRPCRouter({
    nuevaActa: agregarActaProcedure
})