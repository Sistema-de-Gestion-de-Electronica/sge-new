import { Acta, PrismaClient } from "@/generated/prisma";
import { getAllConsejeros } from "../../repositories/actas/actas.repository";
import { sendEmail } from "./email";
import { ACTAS_ROUTE } from "@/shared/server-routes";

export const enviarMailNuevaVotacionAbiertaProcedure = async (ctx: { db: PrismaClient }, acta: Acta, cuerpoMail: String) => {
  const consejeros = getAllConsejeros(ctx);

  (await consejeros).forEach(async consejero => {
      if(!consejero.email) return;
      await sendEmail(ctx, {
        asunto: `Acta del ${acta.fechaReunion} disponible para votación`,
        to: consejero.email,
        usuario: {
          nombre: consejero.nombre ?? "Usuario",
          apellido: consejero.apellido ?? "",
        },
        textoMail: `<p style="text-align: center;"><strong>${cuerpoMail}</p>`,
        hipervinculo:
          ACTAS_ROUTE.href !== undefined ? String(ACTAS_ROUTE?.href) : "",
      });
  });
};
