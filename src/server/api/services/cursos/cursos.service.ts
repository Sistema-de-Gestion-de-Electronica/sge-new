import { SgeNombre } from "@/generated/prisma";
import {
  agregarCurso,
  agregarCursoBulkInsert,
  editarCurso,
  eliminarCurso,
  getAllCursos,
  getCursoPorId,
} from "../../repositories/cursos/cursos.repository";
import { createAuthorizedProcedure, protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import {
  inputAgregarCurso,
  inputAgregarCursoBulkInsert,
  inputEditarCurso,
  inputEliminarCurso,
  inputGetCurso,
  inputGetCursos,
} from "@/shared/filters/cursos-filter.schema";

export const getTodosLosCursosProcedure = protectedProcedure.input(inputGetCursos).query(async ({ ctx, input }) => {
  validarInput(inputGetCursos, input);

  const userId = ctx.session.user.id;

  const cursos = await getAllCursos(ctx, input, userId);

  return cursos;
});

export const cursoPorIdProcedure = protectedProcedure.input(inputGetCurso).query(async ({ ctx, input }) => {
  validarInput(inputGetCurso, input);

  const curso = await getCursoPorId(ctx, input);

  return curso;
});

export const nuevoCursoProcedure = createAuthorizedProcedure([SgeNombre.CURSOS_ABM])
  .input(inputAgregarCurso)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarCurso, input);

    const userId = ctx.session.user.id;

    const curso = await agregarCurso(ctx, input, userId);

    return curso;
  });

export const nuevoCursoBulkInsertProcedure = createAuthorizedProcedure([SgeNombre.CURSOS_ABM])
  .input(inputAgregarCursoBulkInsert)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarCursoBulkInsert, input);
    const userId = ctx.session.user.id;
    const curso = await agregarCursoBulkInsert(ctx, input, userId);
    return curso;
  });

export const editarCursoProcedure = createAuthorizedProcedure([SgeNombre.CURSOS_ABM])
  .input(inputEditarCurso)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditarCurso, input);

    const userId = ctx.session.user.id;

    const curso = await editarCurso(ctx, input, userId);

    return curso;
  });

export const eliminarCursoProcedure = createAuthorizedProcedure([SgeNombre.CURSOS_ABM])
  .input(inputEliminarCurso)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarCurso, input);

    const curso = await eliminarCurso(ctx, input);

    return curso;
  });
