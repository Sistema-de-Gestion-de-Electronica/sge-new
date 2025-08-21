import { Prisma, type PrismaClient } from "@/generated/prisma";
import { inputAgregarActa } from "@/shared/filters/admin-actas-filter.schema";
import { z } from "zod";

type InputAgregarActa = z.infer<typeof inputAgregarActa>;
export const agregarActa = async (ctx: { db: PrismaClient }, input: InputAgregarActa) => {
  try {
    const acta = await ctx.db.$transaction(async (tx) => {
      const nombreActa = new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(input.fechaReunion)
        .replaceAll("/","-");

      const acta = await tx.acta.create({
        data: {
          nombreActa,
          fechaReunion: input.fechaReunion
          // estado y visibilidad se dejan con DEFAULT de DB
        },
      });

      return acta;
    });

    return acta;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("El código de acta ya existe");
      }
    }

    throw new Error("Error agregando acta");
  }
};