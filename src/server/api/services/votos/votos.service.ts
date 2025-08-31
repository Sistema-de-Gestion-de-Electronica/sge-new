import { TRPCError } from "@trpc/server";
import type { Prisma } from "@/generated/prisma";
import type { Voto } from "@/generated/prisma";
import { inputAgregarVoto } from "@/shared/filters/votos-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import {
  getActaAbierta,
  getVotosFromActaAbierta,
} from "../../repositories/admin/actas-admin.repository";
import { agregarVoto } from "../../repositories/votos/votos.repository";

export const agregarVotoProcedure = protectedProcedure
  .input(inputAgregarVoto)
  .mutation(async ({ ctx, input }) => {
    try {
      console.log("Entre al try");
      validarInput(inputAgregarVoto, input);
    } catch {
      
    }
    //   const userId = ctx.session?.user?.id;
    //   if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    //   const acta = await getActaAbierta(ctx);
    //   if (!acta?.id) {
    //     throw new TRPCError({ code: "BAD_REQUEST", message: "No hay un acta abierta" });
    //   }
    //   console.log("Obtuve acta")

    //   const votos = await getVotosFromActaAbierta(ctx, acta.id);
    //   console.log("Obtuve votos")
    //   await validarVoto(userId, votos); // lanza si ya votó
    //   console.log("Valido votos");

    //   const voto = await agregarVoto(ctx, input, userId, acta.id);
    //   console.log("Se creo el voto");
    //   return voto;
    // } catch (e) {
    //   console.error("[votos.createVoto] error:", e);

    //   // deja pasar TRPCError tal cual
    //   if (e instanceof TRPCError) throw e;

    //   // si viniera un P2002 desde el repo (índice único)
    //   const pe = e as Prisma.PrismaClientKnownRequestError;
    //   if (pe?.code === "P2002") {
    //     throw new TRPCError({ code: "CONFLICT", message: "El consejero ya votó en esta acta" });
    //   }

    //   throw new TRPCError({
    //     code: "INTERNAL_SERVER_ERROR",
    //     message: e instanceof Error ? e.message : "Error agregando voto",
    //   });
    // }
  });

async function validarVoto(userId: string, votos: Voto[]): Promise<void> {
  const yaVoto = votos.some((v) => v.consejeroId === userId);
  if (yaVoto) {
    // si querés, podés tirar TRPCError directamente
    // throw new TRPCError({ code: "CONFLICT", message: "El consejero ya votó en esta acta" });
    throw new Error("El consejero ya votó en esta acta");
  }
}
