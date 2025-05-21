import { createAuthorizedProcedure, protectedProcedure } from "../../trpc";
import {
  crearPrestamoEquipo,
  devolverEquipo,
  getAllReservas,
  getReservaPorUsuarioId,
  renovarEquipo,
  verReservasDeEquipo,
  getReservaPorId,
} from "@/server/api/repositories/reservas/equipo.repository";
import { validarInput } from "@/server/api/services/helper";
import {
  inputGetAllPrestamosEquipos,
  inputGetReservaEquipoPorId,
  inputGetReservaEquipoPorUsuarioId,
  inputGetReservasEquiposPorEquipoId,
  inputPrestarEquipo,
} from "@/shared/filters/reservas-equipos-filter.schema";
import {
  enviarMailDevolverEquipoProcedure,
  enviarMailRenovarEquipoProcedure,
  enviarMailReservaEquipoProcedure,
} from "../mails/emailEquipos.service";
import { SgeNombre } from "@/generated/prisma";

export const getTodasLasReservasProcedure = protectedProcedure
  .input(inputGetAllPrestamosEquipos)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetAllPrestamosEquipos, input);

    const userId = ctx.session.user.id;

    const reservas = await getAllReservas(ctx, input, userId);

    return reservas;
  });

export const getReservaEquipoPorUserProcedure = protectedProcedure
  .input(inputGetReservaEquipoPorUsuarioId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservaEquipoPorUsuarioId, input);

    const reserva = await getReservaPorUsuarioId(ctx, input);

    return reserva;
  });

export const crearPrestamoEquipoProcedure = createAuthorizedProcedure([SgeNombre.EQUIPOS_PRESTAMO_PRESTAR])
  .input(inputPrestarEquipo)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputPrestarEquipo, input);

    const userId = ctx.session.user.id;

    const reserva = await crearPrestamoEquipo(ctx, input, userId);

    void enviarMailReservaEquipoProcedure(ctx, reserva.id);

    return reserva;
  });

export const verReservasProcedure = protectedProcedure
  .input(inputGetReservasEquiposPorEquipoId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservasEquiposPorEquipoId, input);

    const reservas = await verReservasDeEquipo(ctx, input);

    return reservas;
  });

export const devolverEquipoProcedure = createAuthorizedProcedure([SgeNombre.EQUIPOS_PRESTAMO_PRESTAR])
  .input(inputGetReservasEquiposPorEquipoId)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputGetReservasEquiposPorEquipoId, input);

    const userId = ctx.session.user.id;

    const reserva = await devolverEquipo(ctx, input, userId);

    void enviarMailDevolverEquipoProcedure(ctx, reserva.id);

    return reserva;
  });

export const renovarEquipoProcedure = createAuthorizedProcedure([SgeNombre.EQUIPOS_PRESTAMO_PRESTAR])
  .input(inputPrestarEquipo)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputPrestarEquipo, input);

    const userId = ctx.session.user.id;

    const reserva = await renovarEquipo(ctx, input, userId);

    void enviarMailRenovarEquipoProcedure(ctx, reserva.id);

    return reserva;
  });

export const getReservaEquipoPorIdProcedure = protectedProcedure
  .input(inputGetReservaEquipoPorId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservaEquipoPorId, input);

    const reserva = await getReservaPorId(ctx, input);

    return reserva;
  });
