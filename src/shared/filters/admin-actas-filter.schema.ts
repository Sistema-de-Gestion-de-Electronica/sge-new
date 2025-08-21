import { z } from "zod";

export const inputAgregarActa = z.object ({
    fechaReunion: z.date()
})

export const inputEliminarActa = z.object ({
    fechaReunion: z.date()
})

export const inputEliminarActas = z.object ({
    fechaInicio: z.date().nullable(), //Ver si debe ser opcional o nulleable
    fechaFin: z.date()
})

export const inputActualizarActaById = z.object({
  id: z.string(),                          // obligatorio
  estado: z.enum(["ABIERTA", "CERRADA"]).optional() // opcional
});

export const inputActualizarActaByDate = z.object({
  date: z.date(),                                 
  visibilidad: z.enum(["VISIBLE", "OCULTA"])
});

export const inputUpdateActas = z.object({
  // visible | oculta (opcional)
  visibilidad: z.enum(["VISIBLE", "OCULTA"]).optional(),
  fechaInicio: z.coerce.date().optional(),
  fechaFin: z.coerce.date().optional(),
}).refine(
    (v) =>
      v.fechaInicio === undefined ||
      v.fechaFin === undefined ||
      v.fechaFin >= v.fechaInicio,
    { message: "fechaFin debe ser mayor o igual a fechaInicio" }
  )
  .refine(
    (v) =>
      v.visibilidad !== undefined ||
      v.fechaInicio !== undefined ||
      v.fechaFin !== undefined,
    { message: "Debes enviar al menos un campo para actualizar" }
  );


