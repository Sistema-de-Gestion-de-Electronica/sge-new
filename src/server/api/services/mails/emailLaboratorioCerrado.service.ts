import { sendEmail } from "./email";
import { type PrismaClient } from "@/generated/prisma";
import { LABORATORIO_ROUTE } from "@/shared/server-routes";
import { getReservaLaboratorioCerradoParaEmail } from "../../repositories/reservas/laboratorioCerrado.repository";
import { getFechaddddDDMMYYYY, getTimeISOStringSinOffset } from "@/shared/get-date";

export const enviarMailReservaLaboratorioCerradoCreadaProcedure = async (
  ctx: { db: PrismaClient },
  reservaId: number,
) => {
  const reservaData = await getReservaLaboratorioCerradoParaEmail(ctx, { id: reservaId });

  const esDiscrecional = reservaData.esDiscrecional;

  const fecha = getFechaddddDDMMYYYY(reservaData.fechaHoraInicio);
  const horaInicio = getTimeISOStringSinOffset(reservaData.fechaHoraInicio);
  const horaFin = getTimeISOStringSinOffset(reservaData.fechaHoraFin);

  const laboratorioNombre = reservaData.laboratorioNombre ? `<strong>${reservaData.laboratorioNombre}</strong>` : "";

  await sendEmail(ctx, {
    asunto: `Reserva ${esDiscrecional ? "discrecional" : ""} de laboratorio creada - ${fecha}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Reserva creada!</strong></p>
      <p>Has creado una solicitud de reserva de laboratorio ${laboratorioNombre} para el día <strong>${fecha}</strong>.</p>
      <p><strong>Horario:</strong> desde las <strong>${horaInicio}</strong> hasta las <strong>${horaFin}</strong>.</p>
    `,
    hipervinculo: LABORATORIO_ROUTE.misReservasRuta !== undefined ? String(LABORATORIO_ROUTE?.misReservasRuta) : "",
  });
};

export const enviarMailRechazoLaboratorioCerradoProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaLaboratorioCerradoParaEmail(ctx, { id: reservaId });

  const esDiscrecional = reservaData.esDiscrecional;
  const fecha = getFechaddddDDMMYYYY(reservaData.fechaHoraInicio);
  const horaInicio = getTimeISOStringSinOffset(reservaData.fechaHoraInicio);
  const horaFin = getTimeISOStringSinOffset(reservaData.fechaHoraFin);
  const motivoRechazo = reservaData.motivoRechazo;

  await sendEmail(ctx, {
    asunto: `Reserva ${esDiscrecional ? "discrecional" : ""} de laboratorio rechazada - ${fecha}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>Tu reserva ha sido rechazada.</strong></p>
      <p>Lamentamos informarte que no fue posible aprobar tu reserva para el laboratorio el día <strong>${fecha}</strong>.</p>
      <p><strong>Motivo:</strong> ${motivoRechazo}</p>
      <p><strong>Horario:</strong> desde las <strong>${horaInicio}</strong> hasta las <strong>${horaFin}</strong>.</p>
    `,
    hipervinculo: LABORATORIO_ROUTE.misReservasRuta !== undefined ? String(LABORATORIO_ROUTE?.misReservasRuta) : "",
  });
};

export const enviarMailAproboLaboratorioCerradoProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaLaboratorioCerradoParaEmail(ctx, { id: reservaId });

  const esDiscrecional = reservaData.esDiscrecional;
  const fecha = getFechaddddDDMMYYYY(reservaData.fechaHoraInicio);
  const horaInicio = getTimeISOStringSinOffset(reservaData.fechaHoraInicio);
  const horaFin = getTimeISOStringSinOffset(reservaData.fechaHoraFin);
  const laboratorioNombre = reservaData.laboratorioNombre ? `<strong>${reservaData.laboratorioNombre}</strong>` : "";

  await sendEmail(ctx, {
    asunto: `Reserva ${esDiscrecional ? "discrecional" : ""} de laboratorio  aprobada - ${fecha}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Reserva aprobada!</strong></p>
      <p>Tu reserva para de laboratorio ${laboratorioNombre} ha sido aprobada.</p>
      <p><strong>Día:</strong> ${fecha}</p>
      <p><strong>Horario:</strong> desde las <strong>${horaInicio}</strong> hasta las <strong>${horaFin}</strong>.</p>
    `,
    hipervinculo: LABORATORIO_ROUTE.misReservasRuta !== undefined ? String(LABORATORIO_ROUTE?.misReservasRuta) : "",
  });
};

export const enviarMailCancelacionLaboratorioCerradoProcedure = async (
  ctx: { db: PrismaClient },
  reservaId: number,
) => {
  const reservaData = await getReservaLaboratorioCerradoParaEmail(ctx, { id: reservaId });

  const esDiscrecional = reservaData.esDiscrecional;
  const fecha = getFechaddddDDMMYYYY(reservaData.fechaHoraInicio);
  const horaInicio = getTimeISOStringSinOffset(reservaData.fechaHoraInicio);
  const horaFin = getTimeISOStringSinOffset(reservaData.fechaHoraFin);

  await sendEmail(ctx, {
    asunto: `Reserva ${esDiscrecional ? "discrecional" : ""} de laboratorio cancelada - ${fecha}`,
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>Tu reserva ha sido cancelada.</strong></p>
      <p>La reserva para de laboratorio el día <strong>${fecha}</strong> ha sido cancelada.</p>
      <p><strong>Horario:</strong> desde las <strong>${horaInicio}</strong> hasta las <strong>${horaFin}</strong>.</p>
    `,
    hipervinculo: LABORATORIO_ROUTE.misReservasRuta !== undefined ? String(LABORATORIO_ROUTE?.misReservasRuta) : "",
  });
};
