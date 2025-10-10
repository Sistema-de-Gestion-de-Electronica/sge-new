import { Acta, PrismaClient } from "@/generated/prisma";
import { getAllConsejeros } from "../../repositories/actas/actas.repository";
import { sendEmail } from "./email";
import { ACTAS_ROUTE } from "@/shared/server-routes";

export const enviarMailNuevaVotacionAbiertaProcedure = async (ctx: { db: PrismaClient }, acta: Acta, cuerpoMail: String) => {
  const consejeros = getAllConsejeros(ctx);

  (await consejeros).forEach(async consejero => {
      if(!consejero.email) return;
      await sendEmail(ctx, {
        asunto: `Acta del ${formatearFecha(acta.fechaReunion)} disponible para votación`,
        to: consejero.email,
        usuario: {
          nombre: consejero.nombre ?? "Usuario",
          apellido: consejero.apellido ?? "",
        },
        textoMail: `<p style="text-align: center;"><strong>${cuerpoMail}</p>`,
        hipervinculo:
          ACTAS_ROUTE.href !== undefined ? String(ACTAS_ROUTE?.href) : "",
        detalle: "Ir a votar"
      });
  });
};

export const formatearFecha = (date: Date): String => {
  // Validar que la fecha sea válida
  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() devuelve 0-11
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}