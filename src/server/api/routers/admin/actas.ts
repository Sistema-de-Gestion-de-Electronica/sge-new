import { createTRPCRouter } from "@/server/api/trpc";
import { agregarActaProcedure, getActaAbiertaProcedure } from "../../services/admin/actas-admin.service";

export const actasRouter = createTRPCRouter({
    nuevaActa: agregarActaProcedure,
    actaAbierta: getActaAbiertaProcedure 
})