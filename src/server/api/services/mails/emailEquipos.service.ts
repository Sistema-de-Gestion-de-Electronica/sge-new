import { sendEmail } from "./email";
import { EQUIPOS_ROUTE } from "@/shared/server-routes";
import { getReservaEquipoParaEmail } from "../../repositories/reservas/equipo.repository";
import { type PrismaClient } from "@/generated/prisma";
import { getDateISOString } from "@/shared/get-date";

export const enviarMailReservaEquipoProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaEquipoParaEmail(ctx, { id: reservaId });
  if (!reservaData) {
    throw new Error("No se encontró la reserva para enviar el mail");
  }

  const fechaInicio = getDateISOString(reservaData.fechaHoraInicio);
  const fechaFin = getDateISOString(reservaData.fechaHoraFin);

  await sendEmail(ctx, {
    asunto: `Reserva de equipo creada - ${reservaData.equipoTipo}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
        <p style="text-align: center;"><strong>¡Reserva confirmada!</strong></p>
        <p>Has reservado el equipo <strong>${reservaData.equipoTipo}</strong>.</p>
        <p>Duración de la reserva:</p>
        <ul>
          <li><strong>Desde:</strong> ${fechaInicio}</li>
          <li><strong>Hasta:</strong> ${fechaFin}</li>
        </ul>
      `,
    hipervinculo: EQUIPOS_ROUTE.misPrestamosRuta !== undefined ? String(EQUIPOS_ROUTE?.misPrestamosRuta) : "",
  });
};

export const enviarMailRenovarEquipoProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaEquipoParaEmail(ctx, { id: reservaId });
  if (!reservaData) {
    throw new Error("No se encontró la reserva para enviar el mail");
  }

  const fechaInicio = getDateISOString(reservaData.fechaHoraInicio);
  const fechaFin = getDateISOString(reservaData.fechaHoraFin);

  await sendEmail(ctx, {
    asunto: `Reserva de equipo renovada - ${reservaData.equipoTipo}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante?.nombre ?? "",
      apellido: reservaData.usuarioSolicitante?.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Préstamo renovado!</strong></p>
      <p>Has renovado el préstamo del equipo <strong>${reservaData.equipoTipo}</strong>.</p>
      <p>Nueva duración del préstamo:</p>
      <ul>
        <li><strong>Desde:</strong> ${fechaInicio}</li>
        <li><strong>Hasta:</strong> ${fechaFin}</li>
      </ul>
    `,
    hipervinculo: EQUIPOS_ROUTE.misPrestamosRuta !== undefined ? String(EQUIPOS_ROUTE?.misPrestamosRuta) : "",
  });
};

export const enviarMailDevolverEquipoProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaEquipoParaEmail(ctx, { id: reservaId });
  if (!reservaData) {
    throw new Error("No se encontró la reserva para enviar el mail");
  }

  await sendEmail(ctx, {
    asunto: `Devolución de equipo confirmada - ${reservaData.equipoTipo}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Devolución confirmada!</strong></p>
      <p>Has devuelto el equipo <strong>${reservaData.equipoTipo}</strong> con éxito.</p>
    `,
    hipervinculo: EQUIPOS_ROUTE.misPrestamosRuta !== undefined ? String(EQUIPOS_ROUTE?.misPrestamosRuta) : "",
  });
};
