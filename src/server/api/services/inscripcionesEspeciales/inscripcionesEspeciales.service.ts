import {
  inputGestionarInscripcionEspecial,
  inputAgregarInscripcion,
  inputGetAllInscripcionesEspeciales,
  inputGetInscripcionEspecialById,
} from "../../../../shared/filters/inscripciones-especiales-filter.schema";

import {
  agregarInscripcionEspecial,
  aprobarInscripcionEspecial,
  rechazarInscripcionEspecial,
  getAllInscripcionesEspeciales,
  getInscripcionEspecialById,
} from "../../repositories/inscripcionesEspeciales/inscripcionesEspeciales.repository";
import { enviarMailInscripcionEspecialCreadaProcedure } from "../mails/emailInscripcionEspecial.service";

import { createAuthorizedProcedure, protectedProcedure, publicProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { Prisma, SgeNombre } from "@/generated/prisma";

export const nuevaInscripcionEspecialProcedure = protectedProcedure
  .input(inputAgregarInscripcion)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarInscripcion, input);

    try {
      const inscripcion = await agregarInscripcionEspecial(ctx, { ...input });
      void enviarMailInscripcionEspecialCreadaProcedure(ctx, inscripcion.id);
      return inscripcion;
    } catch (error) {
      console.error("Error detallado en inscripción especial:", error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Error de base de datos: ${error.message}`);
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new Error(`Error de validación: ${error.message}`);
      }
      if (error instanceof Error) {
        throw new Error(`Error al registrar la inscripción especial: ${error.message}`);
      }

      throw new Error("Error al registrar la inscripción especial");
    }
  });

export const aprobarInscripcionEspecialProcedure = protectedProcedure
  .input(inputGestionarInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      return await aprobarInscripcionEspecial(ctx, input);
    } catch (error) {
      console.error("Error al aprobar inscripción especial:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Error de base de datos: ${error.message}`);
      }
      throw new Error("Error inesperado al aprobar inscripción especial");
    }
  });

export const rechazarInscripcionEspecialProcedure = protectedProcedure
  .input(inputGestionarInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      return await rechazarInscripcionEspecial(ctx, input);
    } catch (error) {
      console.error("Error al rechazar inscripción especial:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Error de base de datos: ${error.message}`);
      }
      throw new Error("Error inesperado al rechazar inscripción especial");
    }
  });

export const getAllInscripcionesEspecialesProcedure = protectedProcedure
  .input(inputGetAllInscripcionesEspeciales)
  .query(async ({ ctx, input }) => {
    return await getAllInscripcionesEspeciales(
      {
        prisma: ctx.db,
        session: ctx.session,
      },
      input,
      ctx.session.user.id,
    );
  });

export const getInscripcionEspecialByIdProcedure = protectedProcedure
  .input(inputGetInscripcionEspecialById)
  .query(async ({ ctx, input }) => {
    //validarInput(inputGetInscripcionEspecialById, input); //TODO
    return await getInscripcionEspecialById(ctx, input); //validar session con el input ctx,input
  });
