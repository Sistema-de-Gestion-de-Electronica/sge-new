import { type PrismaClient } from "@/generated/prisma";
import { type EmailParams, fromEmail } from "./email";

export const cargarMailAuditoria = async (ctx: { db: PrismaClient }, emailParams: EmailParams) => {
  const auditMail = await ctx.db.mails.create({
    data: {
      emisor: fromEmail,
      para: emailParams.to,
      cc: emailParams.cc ?? "",
      cco: emailParams.cco ?? "",
      contenido: emailParams,
      fechaEnvio: new Date(),
      asunto: emailParams.asunto,
    },
  });

  return auditMail;
};
