import {
  getReservasEnPantalla,
  removerReservaPantalla,
  crearReservaPantalla,
  getSedePorId,
} from "../../repositories/reservas/pantalla.repository";
import { createAuthorizedProcedure, publicProcedure } from "../../trpc";
import {
  inputAgregarReservaPantalla,
  inputEliminarReservaPantallas,
  inputGetReservasEnPntallaActivas,
} from "@/shared/filters/reserva-pantalla-filter.schema";
import { validarInput } from "../helper";
import { SgeNombre } from "@/generated/prisma";

export const getReservasEnPntallaActivasProcedure = publicProcedure
  .input(inputGetReservasEnPntallaActivas)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservasEnPntallaActivas, input);

    const reservas = await getReservasEnPantalla(ctx, input);

    return reservas;
  });

export const removerReservaPantallaProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_ABM_PANTALLA])
  .input(inputEliminarReservaPantallas)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarReservaPantallas, input);

    const reservasPantallaEliminadas = await removerReservaPantalla(ctx, input);

    return reservasPantallaEliminadas;
  });

export const agregarReservaPantallaProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_ABM_PANTALLA])
  .input(inputAgregarReservaPantalla)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarReservaPantalla, input);

    const userId = ctx.session.user.id;

    const reservaPantallaCreada = await crearReservaPantalla(ctx, input, userId);

    return reservaPantallaCreada;
  });

export const getSedeByIdProcedure = publicProcedure
  .input(inputGetReservasEnPntallaActivas)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetReservasEnPntallaActivas, input);

    const sede = await getSedePorId(ctx, input);

    return sede;
  });
