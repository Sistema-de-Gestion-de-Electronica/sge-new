import { createTRPCRouter } from "@/server/api/trpc";
import { agregarActaProcedure, editarActaProcedure, eliminarActasEntreProcedure, eliminarActasHastaProcedure, eliminarActasIgualProcedure, getActaAbiertaProcedure, getActaAndVotosProcedure, getAllActasProcedure, visibilidadActasEntreProcedure, visibilidadActasHastaProcedure, visibilidadActasIgualProcedure } from "../../services/admin/actas-admin.service";

export const actasRouter = createTRPCRouter({
    getAllActas: getAllActasProcedure,
    nuevaActa: agregarActaProcedure,
    editarActa: editarActaProcedure,
    actaAbierta: getActaAbiertaProcedure,
    actaYvotos: getActaAndVotosProcedure,
    eliminarHasta: eliminarActasHastaProcedure,
    eliminarEntre: eliminarActasEntreProcedure,
    eliminarIgual: eliminarActasIgualProcedure,
    visualizacionHasta: visibilidadActasHastaProcedure,
    visualizacionEntre: visibilidadActasEntreProcedure,
    visualizacionIgual: visibilidadActasIgualProcedure,
})