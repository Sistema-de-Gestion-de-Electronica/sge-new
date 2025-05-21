import { getReservasToday } from "../../services/reservas/reservas.service";
import { createTRPCRouter } from "../../trpc";

export const reservasHoy = createTRPCRouter({
  getAll: getReservasToday,
});
