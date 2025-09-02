import { createTRPCRouter } from "@/server/api/trpc";
import { agregarReunionProcedure, getUltimaReunionProcedure } from "../services/reunion/reunion.service";


export const reunionRouter = createTRPCRouter({
    agregarReunion: agregarReunionProcedure,
    getUltimaReunion: getUltimaReunionProcedure,
})