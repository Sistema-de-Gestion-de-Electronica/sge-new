import { createTRPCRouter } from "@/server/api/trpc";
import { agregarActaProcedure, editarActaProcedure, eliminarActasEntreProcedure, eliminarActasHastaProcedure, eliminarActasIgualProcedure, eliminarActasMasivoProcedure, getActaAbiertaProcedure, getActaAndVotosProcedure, getAllActasProcedure, visibilidadActasEntreProcedure, visibilidadActasHastaProcedure, visibilidadActasIgualProcedure, visibilidadActasMasivoProcedure } from "../../services/admin/actas-admin.service";

export const actasRouter = createTRPCRouter({
    getAllActas: getAllActasProcedure,
    nuevaActa: agregarActaProcedure,
    editarActa: editarActaProcedure,
    actaAbierta: getActaAbiertaProcedure,
    actaYvotos: getActaAndVotosProcedure,
    eliminarHasta: eliminarActasHastaProcedure,
    eliminarEntre: eliminarActasEntreProcedure,
    eliminarIgual: eliminarActasIgualProcedure,
    eliminarMasivo: eliminarActasMasivoProcedure,
    visualizacionHasta: visibilidadActasHastaProcedure,
    visualizacionEntre: visibilidadActasEntreProcedure,
    visualizacionIgual: visibilidadActasIgualProcedure,
    visualizacionMasivo: visibilidadActasMasivoProcedure,
})