import { sendEmail } from "./email";
import { type PrismaClient } from "@/generated/prisma";
import { LABORATORIO_ABIERTO_ROUTE } from "@/shared/server-routes";
import { getReservaLaboratorioAbiertoParaEmail } from "../../repositories/reservas/laboratorioAbierto.repository";
import { getFechaddddDDMMYYYY, getTimeISOStringSinOffset } from "@/shared/get-date";

export const enviarMailReservaLaboratorioAbiertoProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaLaboratorioAbiertoParaEmail(ctx, { id: reservaId });

  const fecha = getFechaddddDDMMYYYY(reservaData.fechaHoraInicio);
  const horaInicio = getTimeISOStringSinOffset(reservaData.fechaHoraInicio);
  const horaFin = getTimeISOStringSinOffset(reservaData.fechaHoraFin);

  await sendEmail(ctx, {
    asunto: "Reserva de laboratorio abierto confirmada",
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "Usuario",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Reserva creada!</strong></p>
      <p>Has creado una solicitud de reserva de laboratorio abierto para el día <strong>${fecha}</strong>.</p>
      <p><strong>Horario:</strong> desde las <strong>${horaInicio}</strong> hasta las <strong>${horaFin}</strong>.</p>
    `,
    hipervinculo:
      LABORATORIO_ABIERTO_ROUTE.misReservaRuta !== undefined ? String(LABORATORIO_ABIERTO_ROUTE?.misReservaRuta) : "",
  });
};

export const enviarMailRechazoLaboratorioAbiertoProcedure = async (
  ctx: { db: PrismaClient },
  reservaId: number,
  motivo: string,
) => {
  const reservaData = await getReservaLaboratorioAbiertoParaEmail(ctx, { id: reservaId });

  const fecha = getFechaddddDDMMYYYY(reservaData.fechaHoraInicio);

  await sendEmail(ctx, {
    asunto: "Reserva de laboratorio abierto rechazada",
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "Usuario",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>Reserva rechazada</strong></p>
      <p>Lamentamos informarte que no fue posible aprobar tu reserva para el laboratorio el día <strong>${fecha}</strong>.</p>
      <p><strong>Motivo:</strong> ${motivo}</p>
    `,
    hipervinculo:
      LABORATORIO_ABIERTO_ROUTE.misReservaRuta !== undefined ? String(LABORATORIO_ABIERTO_ROUTE?.misReservaRuta) : "",
  });
};

export const enviarMailAproboLaboratorioAbiertoProcedure = async (ctx: { db: PrismaClient }, reservaId: number) => {
  const reservaData = await getReservaLaboratorioAbiertoParaEmail(ctx, { id: reservaId });

  const fecha = getFechaddddDDMMYYYY(reservaData.fechaHoraInicio);
  const horaInicio = getTimeISOStringSinOffset(reservaData.fechaHoraInicio);
  const horaFin = getTimeISOStringSinOffset(reservaData.fechaHoraFin);
  const laboratorioNombre = reservaData.laboratorioNombre;

  await sendEmail(ctx, {
    asunto: "Reserva de laboratorio abierto confirmada",
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "Usuario",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Reserva aprobada!</strong></p>
      <p>Tu reserva para el laboratorio abierto <strong>${laboratorioNombre}</strong> ha sido aprobada.</p>
      <p><strong>Día:</strong> ${fecha}</p>
      <p><strong>Horario:</strong> desde las <strong>${horaInicio}</strong> hasta las <strong>${horaFin}</strong>.</p>
    `,
    hipervinculo:
      LABORATORIO_ABIERTO_ROUTE.misReservaRuta !== undefined ? String(LABORATORIO_ABIERTO_ROUTE?.misReservaRuta) : "",
  });
};

export const enviarMailCancelacionLaboratorioAbiertoProcedure = async (
  ctx: { db: PrismaClient },
  reservaId: number,
) => {
  const reservaData = await getReservaLaboratorioAbiertoParaEmail(ctx, { id: reservaId });

  const fecha = getFechaddddDDMMYYYY(reservaData.fechaHoraInicio);

  await sendEmail(ctx, {
    asunto: "Reserva de laboratorio abierto cancelada",
    to: reservaData.usuarioSolicitante.email ?? "",
    usuario: {
      nombre: reservaData.usuarioSolicitante.nombre ?? "Usuario",
      apellido: reservaData.usuarioSolicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>Reserva cancelada</strong></p>
      <p>Tu reserva para el laboratorio abierto ha sido cancelada.</p>
      <p><strong>Día:</strong> ${fecha}</p>
    `,
    hipervinculo:
      LABORATORIO_ABIERTO_ROUTE.misReservaRuta !== undefined ? String(LABORATORIO_ABIERTO_ROUTE?.misReservaRuta) : "",
  });
};
