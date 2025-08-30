import { inputGetAllActas } from "@/shared/filters/actas-filter.schema";
import { protectedProcedure, publicProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { getAllActas, getAllAniosActas } from "../../repositories/actas/actas.repository";
import { getUsuarioPorId } from "../../repositories/admin/usuarios-admin.repository";

export const getAllActasProcedure = publicProcedure
  .input(inputGetAllActas)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetAllActas, input);
    const esC = await esConsejero(ctx);
    const actas = await getAllActas(ctx, input, esC);
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

