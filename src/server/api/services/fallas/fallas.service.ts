import {
  inputGetAllFallas,
  inputReportarFallasInstrumento,
  inputReportarFallasPc,
} from "@/shared/filters/fallas-filter.schema";
import { reportarInstrumento, reportarPC, getAllFallas } from "../../repositories/fallas/fallas.repository";
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
