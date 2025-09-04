import { z } from "zod";

export const inputAgregarActa = z.object ({
    fechaReunion: z.date(),
    fileBase64: z.string().optional(),
})

export const inputEliminarActa = z.object ({
    fechaReunion: z.date()
})

export const inputEliminarActas = z.object ({
    fechaInicio: z.date().optional(),
    fechaFin: z.date()
}).refine(
  (v) => !v.fechaInicio || v.fechaInicio < v.fechaFin,
  { message: "fechaInicio no puede ser mayor que fechaFin", path: ["fechaInicio"] }
);

export const inputVisibilidadActa = z.object({
  date: z.date(),                                 
  visibilidad: z.enum(["VISIBLE", "OCULTA"])
});

export const inputVisibilidadActas = z.object({
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

export const inputActualizarActa = z.object ({
  id: z.string(),
})


