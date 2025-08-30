import { inputAgregarVoto } from "@/shared/filters/votos-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import type { Voto } from "@/generated/prisma";
import {
  getActaAbierta,
  getVotosFromActaAbierta,
} from "../../repositories/admin/actas-admin.repository";
import { agregarVoto } from "../../repositories/votos/votos.repository";

export const agregarVotoProcedure = protectedProcedure
  .input(inputAgregarVoto)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarVoto, input);

    const userId = ctx.session?.user?.id;
    if (!userId) throw new Error("Sesión inválida");

    // 1) Buscar acta abierta
    const acta = await getActaAbierta(ctx);
    if (!acta?.id) throw new Error("No hay un acta abierta");

    // 2) Traer votos del acta y validar doble voto
    const votos = await getVotosFromActaAbierta(ctx, acta.id);
    await validarVoto(userId, votos);

    // 3) Crear voto
    const voto = await agregarVoto(ctx, input, userId, acta.id);
    return voto;
  });

async function validarVoto(userId: string, votos: Voto[]): Promise<void> {
  const yaVoto = votos.some((v) => v.consejeroId === userId);
  if (yaVoto) {
    throw new Error("El consejero ya votó en esta acta");
  }
}
