import { sendEmail } from "./email";
import { type PrismaClient } from "@/generated/prisma";
import { INSCRIPCIONES_ESPECIALES_ROUTE } from "@/shared/server-routes";
import { getInscripcionEspecialById } from "../../repositories/inscripcionesEspeciales/inscripcionesEspeciales.repository";
import { type Session } from "next-auth";

export const enviarMailInscripcionEspecialCreadaProcedure = async (
  ctx: { db: PrismaClient; session: Session },
  solicitudId: number,
) => {
  const solicitudData = await getInscripcionEspecialById(ctx, { id: solicitudId });

  const fecha = solicitudData?.fechaSolicitud;
  const tipo = solicitudData?.caso;

  await sendEmail(ctx, {
    asunto: `Solicitud de inscripcion por ${tipo} - ${fecha}`,
    to: solicitudData?.solicitante.email ?? "",
    usuario: {
      nombre: solicitudData?.solicitante.nombre ?? "",
      apellido: solicitudData?.solicitante.apellido ?? "",
    },
    textoMail: `
      <p style="text-align: center;"><strong>¡Solicitud creada!</strong></p>
      <p>Has creado una solicitud de inscripcion especial por ${tipo} el día <strong>${fecha}</strong>.</p>
    `,
    hipervinculo:
      INSCRIPCIONES_ESPECIALES_ROUTE.mis_solicitudes !== undefined
        ? String(INSCRIPCIONES_ESPECIALES_ROUTE?.mis_solicitudes)
        : "",
  });
};
