import { createTRPCRouter } from "@/server/api/trpc";
import { agregarActaProcedure, eliminarActasEntreProcedure, eliminarActasHastaProcedure, getActaAbiertaProcedure, getActaAndVotosProcedure, visibilidadActasEntreProcedure, visibilidadActasHastaProcedure } from "../../services/admin/actas-admin.service";

export const actasRouter = createTRPCRouter({
    nuevaActa: agregarActaProcedure,
    actaAbierta: getActaAbiertaProcedure,
    actaYvotos: getActaAndVotosProcedure,
    eliminarHasta: eliminarActasHastaProcedure,
    eliminarEntre: eliminarActasEntreProcedure,
    visualizacionHasta: visibilidadActasHastaProcedure,
    visualizacionEntre: visibilidadActasEntreProcedure,
})