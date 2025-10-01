import { inputAgregarActa, inputEliminarActa, inputEliminarActas, inputEliminarActasMasivo, inputGetAllActasWithFilters, inputVisibilidadActa, inputVisibilidadActas, inputVisibilidadActasMasivo } from "@/shared/filters/admin-actas-filter.schema";
import { protectedProcedure } from "../../trpc";
import { validarInput } from "../helper";
import { agregarActa, eliminarActasEntre, eliminarActasHasta, eliminarActasIgual, eliminarActasMasivo, getActaAbierta, getAllActasWithFilters, getVotosFromActaAbierta, visibilidadActaHasta, visibilidadActaIgual, visibilidadActasEntre, visibilidadActasMasivo } from "../../repositories/admin/actas-admin.repository";
import { Buffer } from "buffer";
import { saveActaPDF, formatDate } from "../../utils/pdfSaver";
import { getUsuarioPorId } from "../../repositories/admin/usuarios-admin.repository";
import { enviarMailNuevaVotacionAbiertaProcedure } from "../mails/emailVotacionAbierta.service";
import { deleteActaPDF } from "../../utils/pdfDeleter";
import { getAllActas } from "../../repositories/actas/actas.repository";


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

  export const editarActaProcedure = protectedProcedure
  .input(inputAgregarActa)
  .mutation(async ({ input }) => {
    validarInput(inputAgregarActa, input);

    if (!input.fileBase64) {
      throw new Error("No se ha proporcionado un archivo PDF en base64");
    }

    await deleteActaPDF(formatDate(input.fechaReunion));
    
    const fileBuffer = Buffer.from(input.fileBase64.split(',')[1], 'base64');

    await saveActaPDF(fileBuffer, input.fechaReunion);
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
    return {acta: null, votos: []}
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

export const visibilidadActasHastaProcedure = protectedProcedure
  .input(inputVisibilidadActa)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputVisibilidadActa, input);

    const res = visibilidadActaHasta(ctx,input)

    return res;
    }
  )

  export const visibilidadActasEntreProcedure = protectedProcedure
  .input(inputVisibilidadActas)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputVisibilidadActas, input);

    const res = visibilidadActasEntre(ctx,input)

    return res;
    }
  )

  export const visibilidadActasIgualProcedure = protectedProcedure
  .input(inputVisibilidadActa)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputVisibilidadActa, input);

    const res = visibilidadActaIgual(ctx,input)

    return res;
    }
  )

  export const eliminarActasHastaProcedure = protectedProcedure
  .input(inputEliminarActa)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarActa, input);

    const { count, names } = await eliminarActasHasta(ctx,input)
    names.forEach(f => {deleteActaPDF(f)});
    return {count};
    }
  )

  export const eliminarActasEntreProcedure = protectedProcedure
  .input(inputEliminarActas)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarActas, input);

    const { count, names } = await eliminarActasEntre(ctx,input)
    names.forEach(f => {deleteActaPDF(f)});
    return {count};
    }
  )

  export const eliminarActasIgualProcedure = protectedProcedure
  .input(inputEliminarActa)
  .mutation(async ({ ctx, input }) => {
    validarInput(inputEliminarActa, input);

    const { count, names } = await eliminarActasIgual(ctx,input)
    names.forEach(f => {deleteActaPDF(f)});
    return {count};
    }
  )

  export const getAllActasProcedure = protectedProcedure
  .query(async ({ctx}) => {
        const actas = await getAllActas(ctx, {}, true,true,false);
        if (actas.length === 0)
          return [];
        else
          return actas;
  })

  export const getAllActasWithFiltersProcedure = protectedProcedure
  .input(inputGetAllActasWithFilters)
  .query(async ({ctx, input}) => {
    validarInput(inputGetAllActasWithFilters,input);
    const actas = await getAllActasWithFilters(ctx,input);
      if (actas.length === 0)
        return [];
      else
        return actas;
    }
  )

  export const visibilidadActasMasivoProcedure = protectedProcedure
  .input(inputVisibilidadActasMasivo)
  .mutation(async ({ctx, input}) => {
    validarInput(inputVisibilidadActasMasivo, input);
    const count = await visibilidadActasMasivo(ctx,input);
    return {count}
  })

  export const eliminarActasMasivoProcedure = protectedProcedure
  .input(inputEliminarActasMasivo)
  .mutation(async ({ctx, input}) => {
    validarInput(inputEliminarActasMasivo, input);
    const {count, names} = await eliminarActasMasivo(ctx,input);
    names.forEach(f => {deleteActaPDF(f)});
    return {count}
  })

