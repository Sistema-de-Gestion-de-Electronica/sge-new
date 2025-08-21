import { inputAgregarActa } from "@/shared/filters/admin-actas-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { agregarActa } from "../../repositories/admin/actas-admin.repository";

export const agregarActaProcedure = protectedProcedure
  .input(inputAgregarActa)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarActa, input);

    const acta = await agregarActa(ctx, input);

    return acta;
  });
