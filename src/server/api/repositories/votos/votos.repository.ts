import { Prisma, PrismaClient } from "@/generated/prisma";
import { inputAgregarVoto } from "@/shared/filters/votos-filter.schema";
import { z } from "zod";

type InputAgregar = z.infer<typeof inputAgregarVoto>;
export const agregarVoto = async (ctx: { db: PrismaClient }, input: InputAgregar, userId: string, actaId: number) => {
  try {
    const voto = await ctx.db.$transaction(async (tx) => {
      const nuevoVoto = await tx.voto.create({
        data: {
          actaId,
          consejeroId: userId,
          posicion: input.posicion,
          comentario: input.comentario ?? null,
        },
      });
      return nuevoVoto;
    });
    return voto;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("El código de voto ya existe");
    }
    throw new Error(
      error instanceof Error ? error.message : "Error agregando voto"
    );
  }
};
