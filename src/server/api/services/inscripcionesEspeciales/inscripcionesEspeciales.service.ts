import {
  inputGestionarInscripcionEspecial,
  inputAgregarInscripcion,
  inputGetAllInscripcionesEspeciales,
  inputGetInscripcionEspecialById,
  inputActualizarContactoAsistencia,
  inputEliminarInscripcionEspecial,
  inputEnviarMailContactoInscripcionEspecial,
} from "../../../../shared/filters/inscripciones-especiales-filter.schema";

import {
  agregarInscripcionEspecial,
  aprobarInscripcionEspecial,
  aprobarInscripcionEspecialConCondicion,
  rechazarInscripcionEspecial,
  getAllInscripcionesEspeciales,
  getInscripcionEspecialById,
  actualizarContactoAsistencia,
  eliminarInscripcionEspecial,
} from "../../repositories/inscripcionesEspeciales/inscripcionesEspeciales.repository";
import { enviarMailInscripcionEspecialCreadaProcedure } from "../mails/emailInscripcionEspecial.service";
import { transporter, fromEmail, type EmailParams } from "../mails/email";
import { cargarMailAuditoria } from "../mails/auditoria";

import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { Prisma, SgeNombre, type PrismaClient } from "@/generated/prisma";
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

const validateUserAuthorization = async (ctx: { db: PrismaClient }, sessionUserId: string, resourceUserId?: string) => {
  if (resourceUserId && sessionUserId !== resourceUserId) {
    const esAdministrador = await tienePermiso(ctx, [SgeNombre.ADMIN_VER_PANEL_ADMIN], sessionUserId);
    if (!esAdministrador) {
      throw new Error("No tienes autorización para acceder a este recurso");
    }
  }
};

export const nuevaInscripcionEspecialProcedure = protectedProcedure
  .input(inputAgregarInscripcion)
  .mutation(async ({ ctx, input }) => {
    try {
      validarInput(inputAgregarInscripcion, input);

      const inscripcion = await agregarInscripcionEspecial(ctx, { ...input });

      void enviarMailInscripcionEspecialCreadaProcedure(ctx, inscripcion.id);

      return inscripcion;
    } catch (error) {
      handleDatabaseError(error, "registrar inscripción especial");
    }
  });

export const aprobarInscripcionEspecialProcedure = protectedProcedure
  .input(inputGestionarInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      return await aprobarInscripcionEspecial(ctx, input);
    } catch (error) {
      handleDatabaseError(error, "aprobar inscripción especial");
    }
  });

export const aprobarInscripcionEspecialConCondicionProcedure = protectedProcedure
  .input(inputGestionarInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      return await aprobarInscripcionEspecialConCondicion(ctx, input);
    } catch (error) {
      handleDatabaseError(error, "aprobar inscripción especial con condición");
    }
  });

export const rechazarInscripcionEspecialProcedure = protectedProcedure
  .input(inputGestionarInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      return await rechazarInscripcionEspecial(ctx, input);
    } catch (error) {
      handleDatabaseError(error, "rechazar inscripción especial");
    }
  });

export const getAllInscripcionesEspecialesProcedure = protectedProcedure
  .input(inputGetAllInscripcionesEspeciales)
  .query(async ({ ctx, input }) => {
    try {
      return await getAllInscripcionesEspeciales(
        {
          prisma: ctx.db,
          session: ctx.session,
        },
        input,
        ctx.session.user.id,
      );
    } catch (error) {
      handleDatabaseError(error, "obtener inscripciones especiales");
    }
  });

export const getInscripcionEspecialByIdProcedure = protectedProcedure
  .input(inputGetInscripcionEspecialById)
  .query(async ({ ctx, input }) => {
    try {
      validarInput(inputGetInscripcionEspecialById, input);

      const inscripcion = await getInscripcionEspecialById(ctx, input);

      if (inscripcion) {
        await validateUserAuthorization(ctx, ctx.session.user.id, inscripcion.solicitante.id);
      }

      return inscripcion;
    } catch (error) {
      handleDatabaseError(error, "obtener inscripción especial por ID");
    }
  });

export const actualizarContactoAsistenciaProcedure = protectedProcedure
  .input(inputActualizarContactoAsistencia)
  .mutation(async ({ ctx, input }) => {
    try {
      validarInput(inputActualizarContactoAsistencia, input);

      // TODO: Validar que el usuario tenga permisos para actualizar esta inscripción

      return await actualizarContactoAsistencia(ctx, input);
    } catch (error) {
      handleDatabaseError(error, "actualizar contacto y asistencia");
    }
  });

export const eliminarInscripcionEspecialProcedure = protectedProcedure
  .input(inputEliminarInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      validarInput(inputEliminarInscripcionEspecial, input);

      // TODO: Validar que el usuario tenga permisos para eliminar esta inscripción

      return await eliminarInscripcionEspecial(ctx, input);
    } catch (error) {
      handleDatabaseError(error, "eliminar inscripción especial");
    }
  });

export const enviarMailContactoInscripcionEspecialProcedure = protectedProcedure
  .input(inputEnviarMailContactoInscripcionEspecial)
  .mutation(async ({ ctx, input }) => {
    try {
      const inscripcion = await getInscripcionEspecialById(ctx, { id: input.id });
      if (!inscripcion) {
        throw new Error("Inscripción especial no encontrada");
      }
      const to = inscripcion.solicitante.email;
      await transporter.sendMail({
        from: fromEmail,
        to,
        subject: input.asunto,
        text: input.mensaje,
      });

      const auditPayload: EmailParams = {
        asunto: input.asunto,
        to,
        usuario: {
          nombre: inscripcion.solicitante.nombre ?? "",
          apellido: inscripcion.solicitante.apellido ?? "",
        },
        textoMail: input.mensaje,
        hipervinculo: "",
      };
      await cargarMailAuditoria(ctx, auditPayload);
      return { ok: true } as const;
    } catch (error) {
      handleDatabaseError(error, "enviar mail de contacto de inscripción especial");
    }
  });
