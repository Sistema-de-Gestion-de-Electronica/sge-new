import { revalidatePath } from "next/cache";
import {
  getReservaPorUsuarioId,
  getAllReservas,
  getReservaPorId,
  aprobarReserva,
  rechazarReserva,
  crearReservaLaboratorioAbierto,
  cancelarReserva,
  editarReserva,
} from "../../repositories/reservas/laboratorioAbierto.repository";
import { createAuthorizedProcedure, protectedProcedure } from "../../trpc";
import { validarFechaReserva, validarInput } from "../helper";
import {
  inputAprobarReservaLaboratorioAbiertoSchema,
  inputReservaLaboratorioAbierto,
  inputEditarReservaLaboratorioAbiertoSchema,
  inputGetAllSolicitudesReservaLaboratorioAbierto,
  inputRechazarReservaLaboratorioAbierto,
  inputGetReservaLaboratorioPorUsuarioId,
  inputGetReservaLaboratorioPorId,
  inputCancelarReservaLaboratorioAbierto,
} from "@/shared/filters/reserva-laboratorio-filter.schema";
import {
  enviarMailAproboLaboratorioAbiertoProcedure,
  enviarMailCancelacionLaboratorioAbiertoProcedure,
  enviarMailReservaLaboratorioAbiertoProcedure,
  enviarMailRechazoLaboratorioAbiertoProcedure,
} from "../mails/emailLaboratorioAbierto.service";
import { SgeNombre } from "@/generated/prisma";

export const getReservaLaboratorioAbiertoPorUserProcedure = protectedProcedure
  .input(inputGetReservaLaboratorioPorUsuarioId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservaLaboratorioPorUsuarioId, input);

    const reserva = await getReservaPorUsuarioId(ctx, input);

    return reserva;
  });

export const getTodasLasReservasProcedure = protectedProcedure
  .input(inputGetAllSolicitudesReservaLaboratorioAbierto)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetAllSolicitudesReservaLaboratorioAbierto, input);

    const userId = ctx.session.user.id;

    const reservas = await getAllReservas(ctx, input, userId);

    return reservas;
  });

export const getReservaLaboratorioAbiertoPorIdProcedure = protectedProcedure
  .input(inputGetReservaLaboratorioPorId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservaLaboratorioPorId, input);

    const reserva = await getReservaPorId(ctx, input);

    return reserva;
  });

export const aprobarReservaProcedure = createAuthorizedProcedure([SgeNombre.LAB_ABIERTO_CONFIRMAR_RESERVAS])
  .input(inputAprobarReservaLaboratorioAbiertoSchema)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAprobarReservaLaboratorioAbiertoSchema, input);

    const userId = ctx.session.user.id;

    const reserva = await aprobarReserva(ctx, input, userId);

    void enviarMailAproboLaboratorioAbiertoProcedure(ctx, reserva.reserva.id);

    return reserva;
  });

export const rechazarReservaProcedure = createAuthorizedProcedure([SgeNombre.LAB_ABIERTO_CONFIRMAR_RESERVAS])
  .input(inputRechazarReservaLaboratorioAbierto)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputRechazarReservaLaboratorioAbierto, input);

    const userId = ctx.session.user.id;

    const reserva = await rechazarReserva(ctx, input, userId);

    void enviarMailRechazoLaboratorioAbiertoProcedure(ctx, reserva.reserva.id, input.motivo);

    return reserva;
  });

export const cancelarReservaProcedure = createAuthorizedProcedure([SgeNombre.LAB_ABIERTO_CONFIRMAR_RESERVAS])
  .input(inputCancelarReservaLaboratorioAbierto)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputCancelarReservaLaboratorioAbierto, input);

    const userId = ctx.session.user.id;

    const reserva = await cancelarReserva(ctx, input, userId);

    void enviarMailCancelacionLaboratorioAbiertoProcedure(ctx, reserva.id);

    return reserva;
  });

export const editarReservaProcedure = createAuthorizedProcedure([SgeNombre.LAB_ABIERTO_CONFIRMAR_RESERVAS])
  .input(inputEditarReservaLaboratorioAbiertoSchema)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditarReservaLaboratorioAbiertoSchema, input);
    validarFechaReserva(input.fechaReserva);

    const userId = ctx.session.user.id;

    const reserva = await editarReserva(ctx, input, userId);

    return reserva;
  });

export const inputCrearReservaLaboratorioAbiertoProcedure = protectedProcedure
  .input(inputReservaLaboratorioAbierto)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputReservaLaboratorioAbierto, input);
    validarFechaReserva(input.fechaReserva);

    const userId = ctx.session.user.id;

    const reserva = await crearReservaLaboratorioAbierto(ctx, input, userId);

    revalidatePath("/");

    void enviarMailReservaLaboratorioAbiertoProcedure(ctx, reserva.id);

    return reserva;
  });
