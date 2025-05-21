import { createAuthorizedProcedure, protectedProcedure } from "../../trpc";
import {
  getAllLibros,
  addLibro,
  editLibro,
  deleteLibro,
  getLibroPorId,
  getAllEditorial,
  getAllIdiomas,
  getAllAutores,
  agregarAutor,
  agregarEditorial,
} from "../../repositories/biblioteca/biblioteca.repository";
import {
  inputAddBooks,
  inputAgregarAutor,
  inputAgregarEditorial,
  inputEditBooks,
  inputEliminarLibro,
  inputGetBooks,
  inputGetLibro,
} from "@/shared/filters/biblioteca-filter.schema";
import { validarInput } from "../helper";
import { SgeNombre } from "@/generated/prisma";

export const getTodosLosLibrosProcedure = protectedProcedure.input(inputGetBooks).query(async ({ ctx, input }) => {
  validarInput(inputGetBooks, input);

  const libros = await getAllLibros(ctx, input);

  return libros;
});

export const getTodosLosEditorialProcedure = protectedProcedure.query(async ({ ctx }) => {
  const editorial = await getAllEditorial(ctx);

  return editorial;
});

export const getTodosLosIdiomasProcedure = protectedProcedure.query(async ({ ctx }) => {
  const idiomas = await getAllIdiomas(ctx);

  return idiomas;
});

export const libroPorIdProcedure = protectedProcedure.input(inputGetLibro).query(async ({ ctx, input }) => {
  validarInput(inputGetLibro, input);

  const libro = await getLibroPorId(ctx, input);

  return libro;
});

export const nuevoLibroProcedure = createAuthorizedProcedure([SgeNombre.BIBLIOTECA_ABM_LIBRO])
  .input(inputAddBooks)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAddBooks, input);

    const userId = ctx.session.user.id;

    const libro = await addLibro(ctx, input, userId);

    return libro;
  });

export const editarLibroProcedure = createAuthorizedProcedure([SgeNombre.BIBLIOTECA_ABM_LIBRO])
  .input(inputEditBooks)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditBooks, input);

    const userId = ctx.session.user.id;

    const libro = await editLibro(ctx, input, userId);

    return libro;
  });

export const eliminarLibroProcedure = createAuthorizedProcedure([SgeNombre.BIBLIOTECA_ABM_LIBRO])
  .input(inputEliminarLibro)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarLibro, input);

    const libro = await deleteLibro(ctx, input);

    return libro;
  });

export const getTodosLosAutoresProcedure = protectedProcedure.query(async ({ ctx }) => {
  const autores = await getAllAutores(ctx);

  return autores;
});

export const crearAutorProcedure = createAuthorizedProcedure([SgeNombre.BIBLIOTECA_ABM_LIBRO])
  .input(inputAgregarAutor)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarAutor, input);

    const userId = ctx.session.user.id;

    const autor = await agregarAutor(ctx, input, userId);

    return autor;
  });

export const crearEditorialProcedure = createAuthorizedProcedure([SgeNombre.BIBLIOTECA_ABM_LIBRO])
  .input(inputAgregarEditorial)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarEditorial, input);

    const userId = ctx.session.user.id;

    const editorial = await agregarEditorial(ctx, input, userId);

    return editorial;
  });
