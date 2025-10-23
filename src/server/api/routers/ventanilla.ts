import { createTRPCRouter } from "@/server/api/trpc";
import { consultarProcedure, getAllConsultasProcedure, getConsultaByIdProcedure, gestionarConsultaProcedure 
} from "../services/ventanilla/ventanilla.service";
import { get } from "lodash";


export const ventanillaRouter = createTRPCRouter({
    consultar: consultarProcedure,
    getAllConsultas: getAllConsultasProcedure,
    getConsultaById: getConsultaByIdProcedure,
    gestionarConsulta: gestionarConsultaProcedure,
})