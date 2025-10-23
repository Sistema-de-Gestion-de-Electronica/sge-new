import {
  inputConsulta,
  inputGetAllConsultas,
  inputGestionarConsultas,
  inputGetConsultaById,
} from "@/shared/filters/ventanilla-filter.schema";
import { protectedProcedure, publicProcedure } from "../../trpc";
import { validarInput } from "../helper";
import {
  consultar,
  getAllConsultas,
  getConsultaById,
  gestionarConsulta,
} from "../../repositories/ventanilla/ventanilla.repository";
import { enviarMailRespuestaVentanillaProcedure } from "../mails/emailVentanilla.service";

export const consultarProcedure = publicProcedure.input(inputConsulta).mutation(async ({ ctx, input }) => {
  validarInput(inputConsulta, input);
  return await consultar(ctx, input);
});

export const getAllConsultasProcedure = protectedProcedure.input(inputGetAllConsultas).query(async ({ ctx, input }) => {
  validarInput(inputGetAllConsultas, input);
  return await getAllConsultas(ctx, input);
});

export const getConsultaByIdProcedure = protectedProcedure.input(inputGetConsultaById).query(async ({ ctx, input }) => {
  validarInput(inputGetConsultaById, input);
  return await getConsultaById(ctx, input);
});

export const gestionarConsultaProcedure = protectedProcedure
  .input(inputGestionarConsultas)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputGestionarConsultas, input);
    const resultado = await gestionarConsulta(ctx, input);

    if (input.respuesta && input.respuesta.trim().length > 0 && input.estado === "RESPONDIDA") {
      try {
        await enviarMailRespuestaVentanillaProcedure(ctx, input.id);
      } catch (error) {
        console.error("Error al enviar email de respuesta:", error);
      }
    }
    return resultado;
  });
