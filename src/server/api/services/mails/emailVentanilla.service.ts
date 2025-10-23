import { sendEmail } from "./email";
import { type PrismaClient } from "@/generated/prisma";
import { VENTANILLA_ROUTE } from "@/shared/server-routes";
import { getConsultaById } from "../../repositories/ventanilla/ventanilla.repository";
import { type Session } from "next-auth";
import { formatDateToDays } from "../../utils/dateFormat";

export const enviarMailRespuestaVentanillaProcedure = async (
  ctx: { db: PrismaClient; session: Session },
  consultaId: number,
) => {
  const consultaData = await getConsultaById(ctx, { id: consultaId });

  if (!consultaData) {
    throw new Error("Consulta no encontrada");
  }

  const fechaConsulta = consultaData?.fechaConsulta ?? "Fecha no disponible";
  const fechaRespuesta = consultaData?.fechaRespuesta
    ? formatDateToDays(new Date(consultaData.fechaRespuesta))
    : "Fecha no disponible";
  const consulta = consultaData?.consulta;
  const respuesta = consultaData?.respuesta;

  await sendEmail(ctx, {
    asunto: `SGE - Ventanilla - Respuesta a tu consulta - ${fechaRespuesta}`,
    to: consultaData?.email ?? "",
    usuario: {
      nombre: consultaData?.nombre ?? "",
      apellido: consultaData?.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Tu consulta ha sido respondida!</strong></p>
      <p>Hola <strong>${consultaData?.nombre} ${consultaData?.apellido}</strong>,</p>
      <p>Hemos respondido tu consulta realizada el día <strong>${fechaConsulta}</strong>.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #007bff;">
        <h4 style="margin-top: 0; color: #333;">Tu consulta:</h4>
        <p style="margin: 0; font-style: italic;">"${consulta}"</p>
      </div>
      
      <div style="background-color: #e8f5e8; padding: 15px; margin: 15px 0; border-left: 4px solid #28a745;">
        <h4 style="margin-top: 0; color: #333;">Nuestra respuesta:</h4>
        <p style="margin: 0;">${respuesta}</p>
      </div>
      
      <p>Si tienes alguna pregunta adicional, no dudes en contactarnos.</p>
      <p>Saludos cordiales,<br>Equipo del SGE</p>
    `,
    hipervinculo: VENTANILLA_ROUTE.href !== undefined ? String(VENTANILLA_ROUTE.href) : "/ventanilla/consultar",
    detalle: "Ir al SGE",
  });
};
