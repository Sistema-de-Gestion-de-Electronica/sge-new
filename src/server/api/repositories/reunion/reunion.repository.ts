import { Prisma, PrismaClient } from "@/generated/prisma";
import { inputAgregarReunion } from "@/shared/filters/reunion-filter.schema";
import { z } from "zod";

type InputAgregar = z.infer<typeof inputAgregarReunion>;
export const agregarReunion = async (ctx: { db: PrismaClient }, input: InputAgregar, fechaSTR: string) => {
    const reunion = await ctx.db.$transaction(async (tx) => {

    const reunion = await tx.reunion.create({
      data: {
        fecha: input.fecha,
        fechaNormalizada: fechaSTR,
        link: input.link.trim(),
      },
    });
    return reunion;
    })

    return reunion;
}

export const getUltimaReunion = async (ctx: { db: PrismaClient }) => {
  const reunion = await ctx.db.reunion.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return reunion;
};



