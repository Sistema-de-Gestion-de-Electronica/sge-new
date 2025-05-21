import { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { getAllReservasToday } from "../../repositories/reservas/reserva.repository";
import { calcularTurnoTexto } from "@/shared/get-date";

export const getReservasToday = protectedProcedure.input(inputGetAllLaboratorios).query(async ({ ctx, input }) => {
  validarInput(inputGetAllLaboratorios, input);
  const reservas = await getAllReservasToday(ctx, input);

  const reservasMaped = reservas
    .map((reserva) => ({
      fechaHoraInicio: reserva.fechaHoraInicio,
      fechaHoraFin: reserva.fechaHoraFin,
      turnoTexto: calcularTurnoTexto(reserva.fechaHoraInicio),
      id: reserva.id,
      ...(reserva.reservaLaboratorioCerrado && {
        tipo: reserva.reservaLaboratorioCerrado.esDiscrecional ? "Discrecional" : "Cerrado",
        laboratorio: reserva.reservaLaboratorioCerrado.laboratorio?.nombre,
        descripcion: reserva.reservaLaboratorioCerrado.descripcion,
        equipos: reserva.reservaLaboratorioCerrado.equipoReservado
          .map((equipo) => `${equipo.cantidad} ${equipo.equipoTipo.nombre}`)
          .concat([
            ...(reserva.reservaLaboratorioCerrado.requierePC ? [`1 PC`] : []),
            ...(reserva.reservaLaboratorioCerrado.requiereProyector ? [`1 Proyector`] : []),
          ]),
        sede: reserva.reservaLaboratorioCerrado.sede?.nombre,
        division: reserva.reservaLaboratorioCerrado.curso?.division.nombre,
        materia: reserva.reservaLaboratorioCerrado.curso?.materia.nombre,
        profesor: reserva.reservaLaboratorioCerrado.curso && reserva.reservaLaboratorioCerrado.curso?.profesor,

        esDiscrecional: reserva.reservaLaboratorioCerrado.esDiscrecional,
        discrecionalDocente: reserva.reservaLaboratorioCerrado.discrecionalDocente,
        discrecionalMateria: reserva.reservaLaboratorioCerrado.discrecionalMateria,
        discrecionalTitulo: reserva.reservaLaboratorioCerrado.discrecionalTitulo,
      }),
      ...(reserva.reservaLaboratorioAbierto && {
        tipo: reserva.reservaLaboratorioAbierto.laboratorioAbiertoTipo,
        laboratorio: reserva.reservaLaboratorioAbierto.laboratorio?.nombre,
        descripcion: reserva.reservaLaboratorioAbierto.descripcion,
        equipos: reserva.reservaLaboratorioAbierto.equipoReservado.map(
          (equipo) => `${equipo.cantidad} ${equipo.equipoTipo.nombre}`,
        ),
        sede: reserva.reservaLaboratorioAbierto.sede?.nombre,
        profesor: reserva?.usuarioTutor && reserva.usuarioTutor,
      }),
    }))
    .filter((reserva) => reserva.laboratorio);

  return reservasMaped;
});
