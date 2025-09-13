import { Acta, PrismaClient } from "@/generated/prisma";
import { getAllConsejeros } from "../../repositories/actas/actas.repository";
import { sendEmail } from "./email";
import { ACTAS_ROUTE } from "@/shared/server-routes";

export const enviarMailNuevaVotacionAbiertaProcedure = async (ctx: { db: PrismaClient }, acta: Acta) => {
  const consejeros = getAllConsejeros(ctx);

  (await consejeros).forEach(async consejero => {
      await sendEmail(ctx, {
        asunto: "Nuevo Acta de consejo disponible para votación",
        to: consejero.email ?? "",
        usuario: {
          nombre: consejero.nombre ?? "Usuario",
          apellido: consejero.apellido ?? "",
        },
        textoMail: `
          <p style="text-align: center;"><strong>¡Nueva votación disponible!</strong></p>
          <p>Le informamos que se encuenta disponible el Acta con fecha <strong>${acta.fechaReunion}</strong> en el sistema de gestión académica SGE.</p>
          <p>Por favor, inngrese al sistema para revisarla y emitir su voto correspondiente.</p>
          <p>Agradecemos su participación y compromiso con las acividades del Consejo.</p>
        `,
        hipervinculo:
          ACTAS_ROUTE.href !== undefined ? String(ACTAS_ROUTE?.href) : "",
      });
  });
};
