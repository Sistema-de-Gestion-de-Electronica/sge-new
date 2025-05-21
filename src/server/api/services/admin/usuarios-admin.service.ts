import { createAuthorizedProcedure, protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import {
  inputEditarUsuario,
  inputEliminarUsuario,
  inputGetUsuario,
  inputGetUsuarios,
  inputGetTutor,
  inputEditarTutor,
  inputGetUsuariosPorIds,
  inputCambiarAsistio,
  inputUserId,
} from "@/shared/filters/admin-usuarios-filter.schema";
import {
  editarUsuario,
  eliminarTutor,
  editarTutor,
  eliminarUsuario,
  getAllProfesores,
  getAllTutores,
  getAllUsuarios,
  getUsuarioPorId,
  getAllTutoresEspecialidades,
  getUsuariosPorIds,
  getReservasHechasEsteAnno,
  getNumeroReservasQueNoAsistioEsteAnno,
  cambiarAsistioReserva,
} from "../../repositories/admin/usuarios-admin.repository";
import { SgeNombre } from "@/generated/prisma";

export const getTodosLosUsuariosProcedure = protectedProcedure.input(inputGetUsuarios).query(async ({ ctx, input }) => {
  validarInput(inputGetUsuarios, input);

  const usuarios = await getAllUsuarios(ctx, input);

  return usuarios;
});

export const getUsuarioPorIdProcedure = protectedProcedure.input(inputGetUsuario).query(async ({ ctx, input }) => {
  validarInput(inputGetUsuario, input);

  const usuario = await getUsuarioPorId(ctx, input);

  return usuario;
});

export const getUsuariosPorIdsProcedure = protectedProcedure
  .input(inputGetUsuariosPorIds)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetUsuariosPorIds, input);

    const usuarios = await getUsuariosPorIds(ctx, input);

    return usuarios;
  });

export const getTutorPorIdProcedure = protectedProcedure.input(inputGetTutor).query(async ({ ctx, input }) => {
  console.log(ctx, input);
});

export const eliminarUsuarioProcedure = createAuthorizedProcedure([SgeNombre.ADMIN_MODIFICAR_ATRIBUTOS])
  .input(inputEliminarUsuario)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarUsuario, input);

    const usuario = await eliminarUsuario(ctx, input);

    return usuario;
  });

export const editarUsuarioProcedure = createAuthorizedProcedure([SgeNombre.ADMIN_MODIFICAR_ATRIBUTOS])
  .input(inputEditarUsuario)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditarUsuario, input);

    const userId = ctx.session.user.id;

    const usuario = await editarUsuario(ctx, input, userId);

    return usuario;
  });

export const editarTutorProcedure = createAuthorizedProcedure([SgeNombre.LAB_ABIERTO_TUTORES_ABM])
  .input(inputEditarTutor)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEditarTutor, input);

    const tutor = await editarTutor(ctx, input);

    return tutor;
  });

export const getAllTutoresProcedure = protectedProcedure.query(async ({ ctx }) => {
  const tutores = await getAllTutores(ctx);

  return tutores;
});

export const getAllTutoresEspecialidadesProcedure = protectedProcedure.query(async ({ ctx }) => {
  const especialidades = await getAllTutoresEspecialidades(ctx);

  return especialidades;
});

export const eliminarTutorProcedure = createAuthorizedProcedure([SgeNombre.LAB_ABIERTO_TUTORES_ABM])
  .input(inputEliminarUsuario)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarUsuario, input);

    const usuario = await eliminarTutor(ctx, input);

    return usuario;
  });

export const getAllProfesoresProcedure = protectedProcedure.query(async ({ ctx }) => {
  const profesores = await getAllProfesores(ctx);

  return profesores;
});

export const getNumeroReservasHechasEsteAnnoProcedure = protectedProcedure
  .input(inputUserId)
  .query(async ({ ctx, input }) => {
    validarInput(inputUserId, input);

    const reservas = await getReservasHechasEsteAnno(ctx, input);

    return reservas;
  });

export const reservasQueNoAsistioEsteAnnoProcedure = protectedProcedure
  .input(inputUserId)
  .query(async ({ ctx, input }) => {
    validarInput(inputUserId, input);

    const reservas = await getNumeroReservasQueNoAsistioEsteAnno(ctx, input);

    return reservas;
  });

export const cambiarAsistioReservaProcedure = protectedProcedure
  .input(inputCambiarAsistio)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputCambiarAsistio, input);

    const reserva = await cambiarAsistioReserva(ctx, input);

    return reserva;
  });
