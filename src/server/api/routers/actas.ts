import { createTRPCRouter } from "@/server/api/trpc";
import { agregarVotoProcedure, existenActasProcedure, getAllActasProcedure, getAllAniosActasProcedure, tieneRolConsejero, yaVotoProcedure } from "../services/actas/actas.service";


export const actasRouter = createTRPCRouter({
    getAllActas: getAllActasProcedure,
    getAllAniosActas: getAllAniosActasProcedure,
    tieneRolConsejero: tieneRolConsejero,
    agregarVoto: agregarVotoProcedure,
    yaVoto: yaVotoProcedure,
    existenActas: existenActasProcedure,
})