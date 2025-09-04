import { inputAgregarActa, inputVisibilidadActa, inputVisibilidadActas } from "@/shared/filters/admin-actas-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { agregarActa, getActaAbierta, getVotosFromActaAbierta, visibilidadActaHasta, visibilidadActasEntre } from "../../repositories/admin/actas-admin.repository";
import { Buffer } from "buffer";
import { saveActaPDF } from "../../utils/pdfSaver";
import { getUsuarioPorId } from "../../repositories/admin/usuarios-admin.repository";
import { enviarMailNuevaVotacionAbiertaProcedure } from "../mails/emailVotacionAbierta.service";


export const agregarActaProcedure = protectedProcedure
  .input(inputAgregarActa)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputAgregarActa, input);

    if (!input.fileBase64) {
      throw new Error("No se ha proporcionado un archivo PDF en base64");
    }
    const fileBuffer = Buffer.from(input.fileBase64.split(',')[1], 'base64');
    
    await saveActaPDF(fileBuffer, input.fechaReunion);

    const acta = await agregarActa(ctx, input);

    await enviarMailNuevaVotacionAbiertaProcedure(ctx, acta);

    return acta;
  });

export const getActaAbiertaProcedure = protectedProcedure.query(async ({ ctx }) => {
  const acta = await getActaAbierta(ctx);
  return acta;
});

export const getVotosFromActaAbiertaProcedure = protectedProcedure.query(async ({ ctx }) => {
  const acta = await getActaAbierta(ctx);
  if (!acta?.id) {
    throw new Error("No hay un acta abierta");
  }
  const votos = await getVotosFromActaAbierta(ctx, acta.id);
  return votos;
});

export const getActaAndVotosProcedure = protectedProcedure.query(async ({ ctx }) => {
  const acta = await getActaAbierta(ctx);
  if (!acta?.id) {
    throw new Error("No hay un acta abierta");
  }

  const votos = await getVotosFromActaAbierta(ctx, acta.id);

  const votosConPersona = await Promise.all(
    votos.map(async (voto) => {
      const user = await getUsuarioPorId(ctx, { id: voto.consejeroId });
      return {
        ...voto,
        persona: `${user?.nombre} ${user?.apellido}`,
      };
    })
  );
  return { acta, votos: votosConPersona };
});

export const visibilidadActaHastaProcedure = protectedProcedure
  .input(inputVisibilidadActa)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputVisibilidadActa, input);

    const acta = visibilidadActaHasta(ctx,input)

    return acta;
    }
  )

  export const visibilidadActaEntreProcedure = protectedProcedure
  .input(inputVisibilidadActas)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputVisibilidadActas, input);

    const acta = visibilidadActasEntre(ctx,input)

    return acta;
    }
  )