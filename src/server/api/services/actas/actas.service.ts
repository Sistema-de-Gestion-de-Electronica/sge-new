import { inputGetAllActas } from "@/shared/filters/actas-filter.schema";
import { protectedProcedure, publicProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { getActas, getAllActas, getAllAniosActas } from "../../repositories/actas/actas.repository";
import { getUsuarioPorId } from "../../repositories/admin/usuarios-admin.repository";
import { Prisma } from "@/generated/prisma";
import { inputAgregarVoto } from "@/shared/filters/votos-filter.schema";
import { getActaAbierta, getVotosFromActaAbierta } from "../../repositories/admin/actas-admin.repository";
import { agregarVoto } from "../../repositories/votos/votos.repository";
import { verificarPermisoUsuario } from "../../repositories/permisos/permisos.repository";
import { SgeNombre, type PrismaClient } from "@/generated/prisma";


export const existenActasProcedure = publicProcedure
  .query(async ({ctx}) => {
    const esC = await verificarPermisoUsuario(ctx, ctx.session?.user?.id ?? "", [SgeNombre.ACTA_VOTAR]);
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
    const esC = await verificarPermisoUsuario(ctx, ctx.session?.user?.id ?? "", [SgeNombre.ACTA_VOTAR]);
    const esA = await esRol(ctx,"ADMINISTRACIÓN")
    const actas = await getAllActas(ctx, input, esC, esA, true);
    if (actas.length === 0)
      return [];
    else
      return actas;
  });

  export const getAllAniosActasProcedure = publicProcedure
  .query(async ({ ctx }) => {
    const esC = await verificarPermisoUsuario(ctx, ctx.session?.user?.id ?? "", [SgeNombre.ACTA_VOTAR]);
    const anios = await getAllAniosActas(ctx, esC);
    return anios;
  });

  // export const tieneRolConsejero = publicProcedure
  //   .query(async ({ ctx }) => {
  //   const consejero = await esRol(ctx, "CONSEJERO");
  //   return consejero;
  // });

async function esRol(ctx: any, rol: string) {
    const userId = ctx.session?.user?.id;
  if (!userId) return false;
  const user = await getUsuarioPorId(ctx, { id: userId });
  const roles = (user?.usuarioRol ?? []).map((r) => r.rol.nombre);
  return roles.some((n) => n?.toUpperCase() === rol);
}

export const agregarVotoProcedure = protectedProcedure
  .input(inputAgregarVoto)
  .mutation(async ({ ctx, input }) => {
    try {
      validarInput(inputAgregarVoto, input);

      const userId = ctx.session?.user?.id;
      const acta = await getActaAbierta(ctx);
      if (!acta?.id) {
        throw new Error("No hay actas abiertas para votar");
      }
      const yaVoto = await validarVoto(ctx, userId, acta.id);
      if (yaVoto) {
        throw new Error("El usuario ya voto" );
      }

      const voto = await agregarVoto(ctx, input, userId, acta.id);
      console.log("Se creo el voto");
      return voto;
    } catch (e) {
      console.error("[votos.createVoto] error:", e);
    }
  });

export const yaVotoProcedure = protectedProcedure
    .query(async ({ ctx }) => {
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

