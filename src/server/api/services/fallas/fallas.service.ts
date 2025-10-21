import {
  inputGetAllFallas,
  inputReportarFallasInstrumento,
  inputReportarFallasPc,
  inputGetFallaPorId,
  inputGestionarFallas,
  inputCambiarEstadoFalla,
  inputGetHistorialPorFallaId,
  inputGetHistorialPorEquipoId,
  inputEliminarFalla,
} from "@/shared/filters/fallas-filter.schema";
import {
  createFallaInstrumento,
  createFallaPC,
  findAllFallas,
  findFallaById,
  updateEstadoFalla,
  updateFalla,
  deleteFalla,
  findHistorialByFallaId,
  findHistorialByEquipoId
} from "../../repositories/fallas/fallas.repository";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";

export const createFallaInstrumentoProcedure = protectedProcedure
  .input(inputReportarFallasInstrumento)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputReportarFallasInstrumento, input);
    return await createFallaInstrumento(ctx, input);
  });

export const createFallaPCProcedure = protectedProcedure
  .input(inputReportarFallasPc)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputReportarFallasPc, input);
    return await createFallaPC(ctx, input);
  });

export const findAllFallasProcedure = protectedProcedure.input(inputGetAllFallas).query(async ({ ctx, input }) => {
  validarInput(inputGetAllFallas, input);
  return await findAllFallas(ctx);
});

export const findFallaByIdProcedure = protectedProcedure.input(inputGetFallaPorId).query(async ({ ctx, input }) => {
  validarInput(inputGetFallaPorId, input);
  return await findFallaById(ctx, input);
});

export const updateEstadoFallaProcedure = protectedProcedure
  .input(inputCambiarEstadoFalla)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputCambiarEstadoFalla, input);
    return await updateEstadoFalla(ctx, input);
  });

export const updateFallaProcedure = protectedProcedure.input(inputGestionarFallas).mutation(async ({ ctx, input }) => {
  validarInput(inputGestionarFallas, input);
  return await updateFalla(ctx, input);
});

export const deleteFallaProcedure = protectedProcedure.input(inputEliminarFalla).mutation(async ({ ctx, input }) => {
  validarInput(inputEliminarFalla, input);
  return await deleteFalla(ctx, input);
});

export const findHistorialByFallaIdProcedure = protectedProcedure
  .input(inputGetHistorialPorFallaId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetHistorialPorFallaId, input);
    return await findHistorialByFallaId(ctx, input);
  });

export const findHistorialByEquipoIdProcedure = protectedProcedure
  .input(inputGetHistorialPorEquipoId)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetHistorialPorEquipoId, input);
    return await findHistorialByEquipoId(ctx, input);
  });