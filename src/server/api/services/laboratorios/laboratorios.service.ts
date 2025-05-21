import { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";
import { getAllReservas } from "../../repositories/laboratorios/laboratorios.repository";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";

export const getAllLaboratoriosProcedure = protectedProcedure
  .input(inputGetAllLaboratorios)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetAllLaboratorios, input);
    return await getAllReservas(ctx, input);
  });
