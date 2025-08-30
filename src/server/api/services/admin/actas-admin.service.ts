import { inputAgregarActa } from "@/shared/filters/admin-actas-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { agregarActa } from "../../repositories/admin/actas-admin.repository";
import { Buffer } from "buffer";
import { saveActaPDF } from "../../utils/pdfSaver";


export const agregarActaProcedure = protectedProcedure
  .input(inputAgregarActa)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarActa, input);

    if (!input.fileBase64) {
      throw new Error("No se ha proporcionado un archivo PDF en base64");
    }
    const fileBuffer = Buffer.from(input.fileBase64.split(',')[1], 'base64');
    console.log("Llegue service")
    await saveActaPDF(fileBuffer, input.fechaReunion);

    const acta = await agregarActa(ctx, input);
    return acta;
  });
