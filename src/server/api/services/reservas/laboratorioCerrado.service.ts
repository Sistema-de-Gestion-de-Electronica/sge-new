import {
  inputAprobarReservaLaboratorioCerradoSchema,
  inputEditarReservaLaboratorioCerradoSchema,
  inputGetAllSolicitudesReservaLaboratorioCerrado,
  inputGetReservaLaboratorioPorId,
  inputGetReservaLaboratorioPorUsuarioId,
  inputRechazarReservaLaboratorioCerrado,
  inputReservaLaboratorioCerrado,
  inputReservaLaboratorioDiscrecional,
} from "@/shared/filters/reserva-laboratorio-filter.schema";
import {
  aprobarReserva,
  cancelarReserva,
  crearReservaLaboratorioCerrado,
  crearReservaLaboratorioCerradoDiscrecional,
  editarReserva,
  getAllReservas,
  getReservaPorId,
  getReservaPorUsuarioId,
  rechazarReserva,
} from "../../repositories/reservas/laboratorioCerrado.repository";
import { createAuthorizedProcedure, protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import {
  enviarMailAproboLaboratorioCerradoProcedure,
  enviarMailCancelacionLaboratorioCerradoProcedure,
  enviarMailRechazoLaboratorioCerradoProcedure,
  enviarMailReservaLaboratorioCerradoCreadaProcedure,
} from "../mails/emailLaboratorioCerrado.service";
import { revalidatePath } from "next/cache";
import { SgeNombre } from "@/generated/prisma";

export const getReservaLaboratorioCerradoPorUserProcedure = protectedProcedure
  .input(inputGetReservaLaboratorioPorUsuarioId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservaLaboratorioPorUsuarioId, input);

    const reserva = await getReservaPorUsuarioId(ctx, input);

    return reserva;
  });

export const getTodasLasReservasProcedure = protectedProcedure
  .input(inputGetAllSolicitudesReservaLaboratorioCerrado)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetAllSolicitudesReservaLaboratorioCerrado, input);

    const userId = ctx.session.user.id;

    const reservas = await getAllReservas(ctx, input, userId);

    return reservas;
  });

export const getReservaLaboratorioCerradoPorIdProcedure = protectedProcedure
  .input(inputGetReservaLaboratorioPorId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservaLaboratorioPorId, input);

    const reserva = await getReservaPorId(ctx, input);

    return reserva;
  });

export const aprobarReservaProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_CONFIRMAR_RESERVAS])
  .input(inputAprobarReservaLaboratorioCerradoSchema)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAprobarReservaLaboratorioCerradoSchema, input);

    const userId = ctx.session.user.id;

    const reserva = await aprobarReserva(ctx, input, userId);

    void enviarMailAproboLaboratorioCerradoProcedure(ctx, reserva.id);

    revalidatePath("/");

    return reserva;
  });

export const rechazarReservaProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_CONFIRMAR_RESERVAS])
  .input(inputRechazarReservaLaboratorioCerrado)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputRechazarReservaLaboratorioCerrado, input);

    const userId = ctx.session.user.id;

    const reserva = await rechazarReserva(ctx, input, userId);

    void enviarMailRechazoLaboratorioCerradoProcedure(ctx, reserva.id);

    revalidatePath("/");

    return reserva;
  });

export const cancelarReservaProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_CONFIRMAR_RESERVAS])
  .input(inputRechazarReservaLaboratorioCerrado)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputRechazarReservaLaboratorioCerrado, input);

    const userId = ctx.session.user.id;

    const reserva = await cancelarReserva(ctx, input, userId);

    void enviarMailCancelacionLaboratorioCerradoProcedure(ctx, reserva.id);

    return reserva;
  });

export const editarReservaProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_CONFIRMAR_RESERVAS])
  .input(inputEditarReservaLaboratorioCerradoSchema)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditarReservaLaboratorioCerradoSchema, input);

    const userId = ctx.session.user.id;

    const reserva = await editarReserva(ctx, input, userId);

    return reserva;
  });

export const inputCrearReservaLaboratorioCerradoProcedure = protectedProcedure
  .input(inputReservaLaboratorioCerrado)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputReservaLaboratorioCerrado, input);

    const userId = ctx.session.user.id;

    const reserva = await crearReservaLaboratorioCerrado(ctx, input, userId);

    void enviarMailReservaLaboratorioCerradoCreadaProcedure(ctx, reserva.id);

    return reserva;
  });

export const inputCrearReservaLaboratorioCerradoDiscrecionalProcedure = protectedProcedure
  .input(inputReservaLaboratorioDiscrecional)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputReservaLaboratorioDiscrecional, input);

    const userId = ctx.session.user.id;

    const reserva = await crearReservaLaboratorioCerradoDiscrecional(ctx, input, userId);
    void enviarMailReservaLaboratorioCerradoCreadaProcedure(ctx, reserva.id);

    return reserva;
  });
