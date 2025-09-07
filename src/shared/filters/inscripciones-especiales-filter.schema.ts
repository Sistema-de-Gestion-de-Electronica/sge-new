import { z } from "zod";

export const inputAgregarInscripcion = z.object({
  caso: z.string().min(1, { message: "Requerido" }),
  justificacion: z.string().min(1, { message: "Requerido" }).max(500, { message: "No debe superar 500 caracteres" }),
  turnoAlternativa1: z.string().optional(),
  turnoAlternativa2: z.string().optional(),
  materias: z.array(z.coerce.number()).min(1, { message: "Debe seleccionar al menos una materia" }),
});

export const inputGestionarInscripcionEspecial = z.object({
  id: z.number(),
  respuesta: z.string().optional(),
});

export const inputGetAllInscripcionesEspeciales = z.object({
  filterByUserId: z.enum(["true", "false"]).optional(),
  pageIndex: z.number().optional(),
  pageSize: z.number().optional(),
});

export const inputGetInscripcionEspecialById = z.object({
  id: z.number(),
});
