import { z } from "zod";

export const inputAgregarInscripcion = z.object({
  nombre: z.string().min(1, { message: "Requerido" }),
  apellido: z.string().min(1, { message: "Requerido" }),
  legajo: z.string().min(1, { message: "Requerido" }),
  caso: z.string().min(1, { message: "Requerido" }),
  justificacion: z.string().min(1, { message: "Requerido" }).max(500, { message: "No debe superar 500 caracteres" }),
  turnoAlternativa1: z.string().optional(),
  turnoAlternativa2: z.string().optional(),
  materiasAdeudadas: z.array(z.coerce.number()).min(1, { message: "Debe seleccionar al menos una materia" }),
  materias: z.array(z.coerce.number()).min(1, { message: "Debe seleccionar al menos una materia" }),
});

export const inputGestionarInscripcionEspecial = z.object({
  id: z.number(),
  respuesta: z.string().optional(),
  alumnoContactado: z.boolean().optional(),
  alumnoAsistio: z.boolean().optional(),
});

export const inputGetAllInscripcionesEspeciales = z.object({
  filterByUserId: z.enum(["true", "false"]).optional(),
  pageIndex: z.number().optional(),
  pageSize: z.number().optional(),
});

export const inputGetInscripcionEspecialById = z.object({
  id: z.number(),
});

export const inputActualizarContactoAsistencia = z.object({
  id: z.number(),
  alumnoContactado: z.boolean(),
  alumnoAsistio: z.boolean(),
});
