import { inputGetAllActas } from "@/shared/filters/actas-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { getAllActas, getAllAniosActas } from "../../repositories/actas/actas.repository";
import { getUsuarioPorId } from "../../repositories/admin/usuarios-admin.repository";

export const getAllActasProcedure = protectedProcedure
  .input(inputGetAllActas)
  .query(async ({ ctx, input }) => {
    validarInput(inputGetAllActas, input);

    //const esC = await esConsejero(ctx, ctx.session.user.id);

    //const actas = await getAllActas(ctx, input, esC);
    const actas = await getAllActas(ctx, input, true);
    return actas;
  });

  export const getAllAniosActasProcedure = protectedProcedure
  .query(async ({ ctx }) => {
    //const esC = await esConsejero(ctx, ctx.session.user.id);

    //const anios = await getAllAniosActas(ctx, esC);
    const anios = await getAllAniosActas(ctx, true);

    return anios;
  });

async function esConsejero(ctx: any, id: string): Promise<boolean> {
  const user = await getUsuarioPorId(ctx, id);
  const roles = (user?.usuarioRol ?? []).map(r => r.rol.nombre);
  return roles.includes("CONSEJERO");
}

