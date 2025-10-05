import {
  inputGetAllFallas,
  inputReportarFallasInstrumento,
  inputReportarFallasPc,
  inputGetFallaPorId,
  inputGestionarFallas,
} from "@/shared/filters/fallas-filter.schema";
import { z } from "zod";
import {
  reportarInstrumento,
  reportarPC,
  getAllFallas,
  getFallaPorId,
  cambiarEstado as cambiarEstadoRepo,
  actualizarCampos as actualizarCamposRepo,
  eliminarFalla as eliminarFallaRepo,
} from "../../repositories/fallas/fallas.repository";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";

export const reportarInstrumentoProcedure = protectedProcedure
  .input(inputReportarFallasInstrumento)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputReportarFallasInstrumento, input);
    return await reportarInstrumento(ctx, input);
  });

export const reportarPCProcedure = protectedProcedure.input(inputReportarFallasPc).mutation(async ({ ctx, input }) => {
  validarInput(inputReportarFallasPc, input);
  return await reportarPC(ctx, input);
});

export const getAllFallasProcedure = protectedProcedure.input(inputGetAllFallas).query(async ({ ctx, input }) => {
  validarInput(inputGetAllFallas, input);
  return await getAllFallas(ctx);
});

export const getFallaPorIdProcedure = protectedProcedure.input(inputGetFallaPorId).query(async ({ ctx, input }) => {
  validarInput(inputGetFallaPorId, input);
  return await getFallaPorId(ctx, input);
});

export const cambiarEstadoProcedure = protectedProcedure
  .input(
    z.object({
      id: z.number(),
      estado: z.enum(["FALLADO", "EN_REPARACION", "REPARADO", "DESCARTADO"]),
      descripcionFalla: z.string().optional().or(z.literal("")),
      asignadoA: z.string().optional(),
      palabraClave: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { id, estado, descripcionFalla, asignadoA } = input;
    return await cambiarEstadoRepo(ctx, { id, estado, descripcionFalla, asignadoA });
  });

export const actualizarCamposProcedure = protectedProcedure
  .input(inputGestionarFallas)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputGestionarFallas, input);
    const { id, descripcionFalla, asignadoA } = input;
    return await actualizarCamposRepo(ctx, { id, descripcionFalla, asignadoA });
  });

export const eliminarFallaProcedure = protectedProcedure.input(inputGetFallaPorId).mutation(async ({ ctx, input }) => {
  validarInput(inputGetFallaPorId, input);
  return await eliminarFallaRepo(ctx, input);
});
