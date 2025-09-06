import { createTRPCRouter } from "@/server/api/trpc";
import { agregarActaProcedure, eliminarActasEntreProcedure, eliminarActasHastaProcedure, eliminarActasIgualProcedure, getActaAbiertaProcedure, getActaAndVotosProcedure, visibilidadActasEntreProcedure, visibilidadActasHastaProcedure, visibilidadActasIgualProcedure } from "../../services/admin/actas-admin.service";

export const actasRouter = createTRPCRouter({
    nuevaActa: agregarActaProcedure,
    actaAbierta: getActaAbiertaProcedure,
    actaYvotos: getActaAndVotosProcedure,
    eliminarHasta: eliminarActasHastaProcedure,
    eliminarEntre: eliminarActasEntreProcedure,
    eliminarIgual: eliminarActasIgualProcedure,
    visualizacionHasta: visibilidadActasHastaProcedure,
    visualizacionEntre: visibilidadActasEntreProcedure,
    visualizacionIgual: visibilidadActasIgualProcedure,
})