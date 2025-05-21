import { ReservaEstatus, ReservaTipo, SgeNombre, type PrismaClient } from "@/generated/prisma";
import { tienePermiso } from "../../services/permisos/permisos.helper";

export type Notificacion = {
  id: number;
  tipo: ReservaTipo;
  fechaHoraInicio: Date;
  fechaHoraFin: Date;
};

export const getAllPendientesNotificaciones = async (
  ctx: { db: PrismaClient },
  userId: string,
): Promise<Notificacion[]> => {
  const reservasLaboratoriosPendientes = getReservasPendientesAprobacion(ctx, userId);
  const reservasEquipoCercanas = getReservasEquipoCercanas(ctx, userId);

  const notificaciones = await Promise.allSettled([reservasLaboratoriosPendientes, reservasEquipoCercanas]);

  // Si falla alguna de las peticiones, no queremos retornar errores porque no es critico
  const notificacionesFullfilled = notificaciones.filter((notificacion) => notificacion.status === "fulfilled");
  if (notificacionesFullfilled.length < 2) {
    console.error("No se pudieron obtener todas las notificaciones");
  }

  const valueNotificaciones = notificacionesFullfilled.flatMap((notificacion) => notificacion.value);

  return valueNotificaciones;
};

export const getReservasPendientesAprobacion = async (
  ctx: { db: PrismaClient },
  userId: string,
): Promise<Notificacion[]> => {
  const puedeAprobarCerradoPromise = tienePermiso(ctx, [SgeNombre.RES_LAB_CONFIRMAR_RESERVAS], userId);
  const puedeAprobarAbiertoPromise = tienePermiso(ctx, [SgeNombre.LAB_ABIERTO_CONFIRMAR_RESERVAS], userId);

  const [puedeAprobarCerrado, puedeAprobarAbierto] = await Promise.all([
    puedeAprobarCerradoPromise,
    puedeAprobarAbiertoPromise,
  ]);

  const reservaTipo: ReservaTipo[] = [];
  if (puedeAprobarCerrado) {
    reservaTipo.push(ReservaTipo.LABORATORIO_CERRADO);
  }
  if (puedeAprobarAbierto) {
    reservaTipo.push(ReservaTipo.LABORATORIO_ABIERTO);
  }

  const hoyALas0 = new Date();
  hoyALas0.setHours(0, 0, 0, 0);

  const reservasPendientesDeAprobacion = await ctx.db.reserva.findMany({
    where: {
      tipo: {
        in: reservaTipo,
      },
      estatus: ReservaEstatus.PENDIENTE,
      fechaHoraInicio: {
        gte: hoyALas0,
      },
    },
    select: {
      id: true,
      fechaHoraInicio: true,
      fechaHoraFin: true,
      tipo: true,
    },
    orderBy: {
      fechaHoraInicio: "desc",
    },
  });

  return reservasPendientesDeAprobacion;
};

export const getReservasEquipoCercanas = async (ctx: { db: PrismaClient }, userId: string): Promise<Notificacion[]> => {
  const diasABuscar = 1;
  const fechaABuscar = new Date();
  fechaABuscar.setDate(fechaABuscar.getDate() + diasABuscar);

  const reservasCreadasProximasVencer = await ctx.db.reserva.findMany({
    where: {
      tipo: {
        in: [ReservaTipo.INVENTARIO, ReservaTipo.LIBRO],
      },
      estatus: ReservaEstatus.PENDIENTE,
      usuarioSolicitoId: userId,
      fechaHoraFin: {
        lte: fechaABuscar,
      },
    },
    select: {
      id: true,
      fechaHoraInicio: true,
      fechaHoraFin: true,
      tipo: true,
    },
    orderBy: {
      fechaHoraInicio: "asc",
    },
  });

  return reservasCreadasProximasVencer;
};
