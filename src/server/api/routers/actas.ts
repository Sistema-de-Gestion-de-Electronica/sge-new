import { createTRPCRouter } from "@/server/api/trpc";
import { getAllActasProcedure, getAllAniosActasProcedure } from "../services/actas/actas.service";


export const actasRouter = createTRPCRouter({
    getAllActas: getAllActasProcedure,
    getAllAniosActas: getAllAniosActasProcedure,
})