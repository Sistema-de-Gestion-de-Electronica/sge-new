import { createTRPCRouter } from "@/server/api/trpc";
import { agregarVotoProcedure, existenActasProcedure, getAllActasProcedure, getAllAniosActasProcedure, yaVotoProcedure } from "../services/actas/actas.service";


export const actasRouter = createTRPCRouter({
    getAllActas: getAllActasProcedure,
    getAllAniosActas: getAllAniosActasProcedure,
    agregarVoto: agregarVotoProcedure,
    yaVoto: yaVotoProcedure,
    existenActas: existenActasProcedure,
})