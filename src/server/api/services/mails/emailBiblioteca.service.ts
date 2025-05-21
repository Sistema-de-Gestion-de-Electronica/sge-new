import { sendEmail } from "./email";
import { BIBLIOTECA_ROUTE } from "@/shared/server-routes";
import { type PrismaClient } from "@/generated/prisma";
import { getReservaParaEmail } from "../../repositories/reservas/biblioteca.repository";
import { getDateISOString } from "@/shared/get-date";

export const enviarMailReservaLibroProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaParaEmail(ctx, { id: reservaId });
  if (!reservaData) {
    throw new Error("No se encontró la reserva para enviar el mail");
  }

  const fechaInicio = getDateISOString(reservaData.fechaHoraInicio);
  const fechaFin = getDateISOString(reservaData.fechaHoraFin);

  await sendEmail(ctx, {
    asunto: `Reserva de libro creada - ${reservaData.libroNombre}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Reserva confirmada!</strong></p>
      <p>Has reservado el libro <strong>${reservaData.libroNombre}</strong>.</p>
      <p>Duración de la reserva:</p>
      <ul>
        <li><strong>Desde:</strong> ${fechaInicio}</li>
        <li><strong>Hasta:</strong> ${fechaFin}</li>
      </ul>
    `,
    hipervinculo: BIBLIOTECA_ROUTE.misPrestamosRuta !== undefined ? String(BIBLIOTECA_ROUTE?.misPrestamosRuta) : "",
  });
};

export const enviarMailRenovarLibroProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaParaEmail(ctx, { id: reservaId });
  if (!reservaData) {
    throw new Error("No se encontró la reserva para enviar el email.");
  }

  const fechaInicio = getDateISOString(reservaData.fechaHoraInicio);
  const fechaFin = getDateISOString(reservaData.fechaHoraFin);

  await sendEmail(ctx, {
    asunto: `Reserva de libro renovada - ${reservaData.libroNombre}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Préstamo renovado!</strong></p>
      <p>Has renovado el préstamo del libro <strong>${reservaData.libroNombre}</strong>.</p>
      <p>Nueva duración del préstamo:</p>
      <ul>
        <li><strong>Desde:</strong> ${fechaInicio}</li>
        <li><strong>Hasta:</strong> ${fechaFin}</li>
      </ul>
    `,
    hipervinculo: BIBLIOTECA_ROUTE.misPrestamosRuta !== undefined ? String(BIBLIOTECA_ROUTE?.misPrestamosRuta) : "",
  });
};

export const enviarMailDevolverLibroProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaParaEmail(ctx, { id: reservaId });
  if (!reservaData) {
    throw new Error("No se encontró la reserva para enviar el mail");
  }

  await sendEmail(ctx, {
    asunto: `Devolución de libro confirmada - ${reservaData.libroNombre}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Devolución confirmada!</strong></p>
      <p>Has devuelto el libro <strong>${reservaData.libroNombre}</strong> con éxito.</p>
    `,
    hipervinculo: BIBLIOTECA_ROUTE.misPrestamosRuta !== undefined ? String(BIBLIOTECA_ROUTE?.misPrestamosRuta) : "",
  });
};
