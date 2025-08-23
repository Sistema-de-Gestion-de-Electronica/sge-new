import { z } from "zod";

export const inputAgregarActa = z.object ({
    fechaReunion: z.date()
})

export const inputEliminarActa = z.object ({
    fechaReunion: z.date()
})

export const inputEliminarActas = z.object ({
    fechaInicio: z.date().optional(),
    fechaFin: z.date()
})

export const inputVisibilidadActa = z.object({
  date: z.date(),                                 
  visibilidad: z.enum(["VISIBLE", "OCULTA"])
});

export const inputVisibilidadActas = z.object({
  // visible | oculta (opcional)
  visibilidad: z.enum(["VISIBLE", "OCULTA"]),
  fechaInicio: z.coerce.date().optional(),
  fechaFin: z.coerce.date(),
}).refine(
    (v) =>
      v.fechaInicio === undefined ||
      v.fechaFin === undefined ||
      v.fechaFin > v.fechaInicio,
    { message: "fechaFin debe ser mayor a fechaInicio" }
  );


