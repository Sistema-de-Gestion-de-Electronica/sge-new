import {
  inputCrearPeriodoInscripcionEspecial,
  inputActualizarPeriodoInscripcionEspecial,
  inputGetPeriodoInscripcionEspecialActual,
  inputGetUltimoPeriodoInscripcionEspecial,
} from "../../../../shared/filters/inscripciones-especiales-filter.schema";

import {
  crearPeriodoInscripcionEspecial,
  actualizarPeriodoInscripcionEspecial,
  getPeriodoInscripcionEspecialActual,
  getUltimoPeriodoInscripcionEspecial,
  verificarPeriodoActivo,
} from "../../repositories/inscripcionesEspeciales/periodosInscripcionEspecial.repository";

import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { Prisma, SgeNombre } from "@/generated/prisma";
import { tienePermiso } from "../permisos/permisos.helper";

const handleDatabaseError = (error: unknown, operation: string): never => {
  console.error(`Error en ${operation}:`, error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new Error(`Error de base de datos: ${error.message}`);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new Error(`Error de validación: ${error.message}`);
  }

  if (error instanceof Error) {
    throw new Error(`${operation}: ${error.message}`);
  }

  throw new Error(`Error inesperado en ${operation}`);
};

export const crearPeriodoInscripcionEspecialProcedure = protectedProcedure
  .input(inputCrearPeriodoInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      validarInput(inputCrearPeriodoInscripcionEspecial, input);

      if (!(await tienePermiso(ctx, [SgeNombre.INSCRIPCIONES_ESPECIALES_ADMIN], ctx.session.user.id))) {
        throw new Error("No tiene permisos para crear períodos de inscripción especial");
      }

      const periodo = await crearPeriodoInscripcionEspecial(ctx, {
        ...input,
        usuarioCreadorId: ctx.session.user.id,
      });

      return periodo;
    } catch (error) {
      handleDatabaseError(error, "crear período de inscripción especial");
    }
  });

export const actualizarPeriodoInscripcionEspecialProcedure = protectedProcedure
  .input(inputActualizarPeriodoInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      validarInput(inputActualizarPeriodoInscripcionEspecial, input);

      if (!(await tienePermiso(ctx, [SgeNombre.INSCRIPCIONES_ESPECIALES_ADMIN], ctx.session.user.id))) {
        throw new Error("No tiene permisos para actualizar períodos de inscripción especial");
      }

      const periodo = await actualizarPeriodoInscripcionEspecial(ctx, input);

      return periodo;
    } catch (error) {
      handleDatabaseError(error, "actualizar período de inscripción especial");
    }
  });

export const getPeriodoInscripcionEspecialActualProcedure = protectedProcedure
  .input(inputGetPeriodoInscripcionEspecialActual)
  .query(async ({ ctx }) => {
    try {
      const periodo = await getPeriodoInscripcionEspecialActual(ctx);
      return periodo;
    } catch (error) {
      handleDatabaseError(error, "obtener período actual de inscripción especial");
    }
  });

export const getUltimoPeriodoInscripcionEspecialProcedure = protectedProcedure
  .input(inputGetUltimoPeriodoInscripcionEspecial)
  .query(async ({ ctx }) => {
    try {
      const periodo = await getUltimoPeriodoInscripcionEspecial(ctx);
      return periodo;
    } catch (error) {
      handleDatabaseError(error, "obtener último período de inscripción especial");
    }
  });

export const verificarPeriodoActivoProcedure = protectedProcedure.query(async ({ ctx }) => {
  try {
    const esActivo = await verificarPeriodoActivo(ctx);
    return esActivo;
  } catch (error) {
    handleDatabaseError(error, "verificar período activo");
  }
});
