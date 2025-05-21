import {
  agregarReservaPantallaProcedure,
  getReservasEnPntallaActivasProcedure,
  removerReservaPantallaProcedure,
  getSedeByIdProcedure,
} from "../../services/reservas/pantalla.service";
import { createTRPCRouter } from "../../trpc";

export const pantallaRouter = createTRPCRouter({
  getAllActivas: getReservasEnPntallaActivasProcedure,
  eliminarReservaPantalla: removerReservaPantallaProcedure,
  agregarReservaPantalla: agregarReservaPantallaProcedure,
  getSedeById: getSedeByIdProcedure,
});
