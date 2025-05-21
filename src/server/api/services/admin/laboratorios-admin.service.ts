import { createAuthorizedProcedure, protectedProcedure, publicProcedure } from "../../trpc";
import { validarInput } from "../helper";
import {
  inputAgregarLaboratorio,
  inputEditarLaboratorio,
  inputEliminarLaboratorio,
  inputGetArmarios,
  inputGetEstantes,
  inputGetLaboratorio,
  inputGetLaboratorios,
  inputGetLaboratoriosConEstadoReserva,
} from "@/shared/filters/admin-laboratorios-filter.schema";
import {
  agregarLaboratorio,
  editarLaboratorio,
  eliminarLaboratorio,
  getAllLaboratorios,
  getAllSedes,
  getLaboratorioPorId,
  getAllArmarios,
  getAllEstantes,
  getAllLaboratoriosConEstadoReserva,
  getAllLaboratoriosConArmario,
  getAllLaboratoriosReservables,
  getAllSedesConLaboratorios,
} from "../../repositories/admin/laboratorios-admin.repository";
import { SgeNombre } from "@/generated/prisma";

export const getTodosLosLaboratoriosProcedure = protectedProcedure
  .input(inputGetLaboratorios)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetLaboratorios, input);

    const laboratorios = await getAllLaboratorios(ctx, input);

    return laboratorios;
  });

export const getTodosLosLaboratoriosConArmarioProcedure = protectedProcedure
  .input(inputGetLaboratorios)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetLaboratorios, input);

    const laboratorios = await getAllLaboratoriosConArmario(ctx, input);

    return laboratorios;
  });

export const getTodosLosLaboratoriosConEstadoReservaProcedure = protectedProcedure
  .input(inputGetLaboratoriosConEstadoReserva)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetLaboratoriosConEstadoReserva, input);

    const laboratorios = await getAllLaboratoriosConEstadoReserva(ctx, input);

    return laboratorios;
  });

export const getTodosLosLaboratoriosReservablesProcedure = protectedProcedure
  .input(inputGetLaboratorios)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetLaboratorios, input);

    const laboratorios = await getAllLaboratoriosReservables(ctx, input);

    return laboratorios;
  });

export const getTodosLosSedesProcedure = protectedProcedure.query(async ({ ctx }) => {
  const sedes = await getAllSedes(ctx);

  return sedes;
});

export const getTodosLosArmariosProcedure = protectedProcedure.input(inputGetArmarios).query(async ({ ctx, input }) => {
  validarInput(inputGetArmarios, input);

  const armarios = await getAllArmarios(ctx, input);

  return armarios;
});

export const getTodosLosEstantesProcedure = protectedProcedure.input(inputGetEstantes).query(async ({ ctx, input }) => {
  validarInput(inputGetEstantes, input);

  const estantes = await getAllEstantes(ctx, input);

  return estantes;
});

export const getTodosLosSedesConLaboratoriosProcedure = publicProcedure.query(async ({ ctx }) => {
  const sedes = await getAllSedesConLaboratorios(ctx);

  return sedes;
});

export const getLaboratorioPorIdProcedure = protectedProcedure
  .input(inputGetLaboratorio)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetLaboratorio, input);

    const laboratorio = await getLaboratorioPorId(ctx, input);

    return laboratorio;
  });

export const eliminarLaboratorioProcedure = createAuthorizedProcedure([SgeNombre.ADMIN_MODIFICAR_ATRIBUTOS])
  .input(inputEliminarLaboratorio)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarLaboratorio, input);

    const laboratorio = await eliminarLaboratorio(ctx, input);

    return laboratorio;
  });

export const editarLaboratorioProcedure = createAuthorizedProcedure([SgeNombre.ADMIN_MODIFICAR_ATRIBUTOS])
  .input(inputEditarLaboratorio)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditarLaboratorio, input);

    const userId = ctx.session.user.id;

    const laboratorio = await editarLaboratorio(ctx, input, userId);

    return laboratorio;
  });

export const nuevoLaboratorioProcedure = protectedProcedure
  .input(inputAgregarLaboratorio)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarLaboratorio, input);

    const userId = ctx.session.user.id;

    const laboratorio = await agregarLaboratorio(ctx, input, userId);

    return laboratorio;
  });
