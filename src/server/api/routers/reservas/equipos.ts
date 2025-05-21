import { createTRPCRouter } from "@/server/api/trpc";
import {
  getReservaEquipoPorUserProcedure,
  crearPrestamoEquipoProcedure,
  verReservasProcedure,
  devolverEquipoProcedure,
  getTodasLasReservasProcedure,
  renovarEquipoProcedure,
  getReservaEquipoPorIdProcedure,
} from "@/server/api/services/reservas/equipos.service";

export const reservaEquipoRouter = createTRPCRouter({
  getAll: getTodasLasReservasProcedure,
  getReservaPorId: getReservaEquipoPorIdProcedure,
  getReservaPorUser: getReservaEquipoPorUserProcedure,
  crearReserva: crearPrestamoEquipoProcedure,
  verReservas: verReservasProcedure,
  devolverEquipo: devolverEquipoProcedure,
  renovarEquipo: renovarEquipoProcedure,
});
