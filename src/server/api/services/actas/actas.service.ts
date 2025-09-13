import { inputGetAllActas } from "@/shared/filters/actas-filter.schema";
import { protectedProcedure, publicProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { getActas, getAllActas, getAllAniosActas } from "../../repositories/actas/actas.repository";
import { getUsuarioPorId } from "../../repositories/admin/usuarios-admin.repository";
import { Prisma } from "@/generated/prisma";
import { inputAgregarVoto } from "@/shared/filters/votos-filter.schema";
import { getActaAbierta, getVotosFromActaAbierta } from "../../repositories/admin/actas-admin.repository";
import { agregarVoto } from "../../repositories/votos/votos.repository";

export const existenActasProcedure = publicProcedure
  .query(async ({ctx}) => {
    const esC = await esConsejero(ctx);
    const actas = await getActas(ctx, esC);
    if (actas.length === 0)
      return false;
    else
      return true;
  })

export const getAllActasProcedure = publicProcedure
  .input(inputGetAllActas)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetAllActas, input);
    const esC = await esConsejero(ctx);
    const actas = await getAllActas(ctx, input, esC);
    if (actas.length === 0)
      return [];
    else
      return actas;
  });

  export const getAllAniosActasProcedure = publicProcedure
  .query(async ({ ctx }) => {
    const esC = await esConsejero(ctx);
    const anios = await getAllAniosActas(ctx, esC);
    return anios;
  });

  export const tieneRolConsejero = publicProcedure
    .query(async ({ ctx }) => {
    const consejero = await esConsejero(ctx);
    console.log(consejero)
    return consejero;
  });

async function esConsejero(ctx: any): Promise<boolean> {
  const userId = ctx.session?.user?.id;
  if (!userId) return false;
  const user = await getUsuarioPorId(ctx, { id: userId });
  const roles = (user?.usuarioRol ?? []).map((r) => r.rol.nombre);
  return roles.some((n) => n?.toUpperCase() === "CONSEJERO");
}

export const agregarVotoProcedure = protectedProcedure
  .input(inputAgregarVoto)
  .mutation(async ({ ctx, input }) => {
    try {
      validarInput(inputAgregarVoto, input);

      const userId = ctx.session?.user?.id;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const acta = await getActaAbierta(ctx);
      if (!acta?.id) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "No hay un acta abierta" });
      }
      
      const yaVoto = await validarVoto(ctx, userId, acta.id);
      if (yaVoto) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "El usuario ya voto" });
      }

      const voto = await agregarVoto(ctx, input, userId, acta.id);
      console.log("Se creo el voto");
      return voto;
    } catch (e) {
      console.error("[votos.createVoto] error:", e);

      // deja pasar TRPCError tal cual
      if (e instanceof TRPCError) throw e;

      // si viniera un P2002 desde el repo (índice único)
      const pe = e as Prisma.PrismaClientKnownRequestError;
      if (pe?.code === "P2002") {
        throw new TRPCError({ code: "CONFLICT", message: "El consejero ya votó en esta acta" });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: e instanceof Error ? e.message : "Error agregando voto",
      });
    }
  });

export const yaVotoProcedure = protectedProcedure
    .query(async ({ ctx, input }) => {
      const acta = await getActaAbierta(ctx);
      if (!acta?.id) {
        return false
      }
    return await validarVoto(ctx, ctx.session?.user?.id, acta.id);
    })

async function validarVoto(ctx: any, userId: string, actaId: number) : Promise<Boolean>{
    const votos = await getVotosFromActaAbierta(ctx, actaId);
    return votos.some((v) => v.consejeroId === userId);
}

