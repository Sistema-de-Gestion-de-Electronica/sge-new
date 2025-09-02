import { inputAgregarReunion } from "@/shared/filters/reunion-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { agregarReunion, getUltimaReunion } from "../../repositories/reunion/reunion.repository";

export const agregarReunionProcedure = protectedProcedure
    .input(inputAgregarReunion)
    .mutation(async ({ ctx, input }) => {
        validarInput(inputAgregarReunion, input);
        
        return await agregarReunion(ctx,input,toYYYYMMDD(input.fecha))
    })

export const getUltimaReunionProcedure = protectedProcedure
    .query(async ({ ctx }) => {
        const reunion = await getUltimaReunion(ctx) 
        if (!reunion)
            return {id:0,fechaNormalizada:"Sin fecha prevista",link:""}
        else
            return reunion;
    })

function toYYYYMMDD(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
