import {
  inputAddSoftware,
  inputEditarSoftware,
  inputEliminarSoftware,
  inputGetSoftware,
  inputGetSoftwareFilter,
} from "@/shared/filters/laboratorio-filter.schema";
import { createAuthorizedProcedure, protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import {
  agregarSoftware,
  editarSoftware,
  getAllSoftware,
  getSoftwarePorId,
  eliminarSoftware,
} from "../../repositories/laboratorios/software.repository";
import { SgeNombre } from "@/generated/prisma";

export const getAllSoftwareProcedure = protectedProcedure
  .input(inputGetSoftwareFilter)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetSoftwareFilter, input);
    const libros = await getAllSoftware(ctx, input);

    return libros;
  });

export const getSoftwarePorIdProcedure = protectedProcedure.input(inputGetSoftware).query(async ({ ctx, input }) => {
  validarInput(inputGetSoftware, input);

  const libro = await getSoftwarePorId(ctx, input);

  return libro;
});

export const editarSoftwareProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_CONFIRMAR_RESERVAS])
  .input(inputEditarSoftware)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditarSoftware, input);

    const userId = ctx.session.user.id;

    const libro = await editarSoftware(ctx, input, userId);

    return libro;
  });

export const nuevoSoftwareProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_CONFIRMAR_RESERVAS])
  .input(inputAddSoftware)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAddSoftware, input);

    const userId = ctx.session.user.id;

    const libro = await agregarSoftware(ctx, input, userId);

    return libro;
  });

export const eliminarSoftwareProcedure = createAuthorizedProcedure([SgeNombre.RES_LAB_CONFIRMAR_RESERVAS])
  .input(inputEliminarSoftware)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarSoftware, input);

    const libro = await eliminarSoftware(ctx, input);

    return libro;
  });
