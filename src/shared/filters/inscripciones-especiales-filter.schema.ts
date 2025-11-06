import { z } from "zod";

export const inputAgregarInscripcion = z.object({
  legajo: z.string().min(1, { message: "Requerido" }),
  caso: z.string().min(1, { message: "Requerido" }),
  justificacion: z.string().min(1, { message: "Requerido" }).max(500, { message: "No debe superar 500 caracteres" }),
  detallesPreferenciasHorario: z.string().optional(),
  turnoAlternativa1: z.string().optional(),
  turnoAlternativa2: z.string().optional(),
  materiasAdeudadas: z.array(z.coerce.number()),
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
  pageIndex: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
  searchText: z.string().optional(),
  caso: z.string().optional(),
  estado: z.string().optional(),
  vinoPresencialmente: z.enum(["true", "false"]).optional(),
  fueContactado: z.enum(["true", "false"]).optional(),
  orderBy: z.string().optional(),
  orderDirection: z.enum(["asc", "desc"]).optional(),
});

export const inputGetInscripcionEspecialById = z.object({
  id: z.number(),
});

export const inputActualizarContactoAsistencia = z.object({
  id: z.number(),
  alumnoContactado: z.boolean(),
  alumnoAsistio: z.boolean(),
});

export const inputEliminarInscripcionEspecial = z.object({
  id: z.number(),
});

export const inputActualizarCursosInscripcionEspecial = z.object({
  id: z.number(),
  cursos: z.array(z.coerce.number()),
});

export const inputCrearPeriodoInscripcionEspecial = z
  .object({
    fechaInicio: z.date(),
    fechaFin: z.date(),
  })
  .refine((data) => data.fechaFin > data.fechaInicio, {
    message: "La fecha de fin debe ser posterior a la fecha de inicio",
    path: ["fechaFin"],
  });

export const inputActualizarPeriodoInscripcionEspecial = z
  .object({
    id: z.number(),
    fechaInicio: z.date(),
    fechaFin: z.date(),
  })
  .refine((data) => data.fechaFin > data.fechaInicio, {
    message: "La fecha de fin debe ser posterior a la fecha de inicio",
    path: ["fechaFin"],
  });

export const inputGetPeriodoInscripcionEspecialActual = z.object({});

export const inputGetUltimoPeriodoInscripcionEspecial = z.object({});

export const inputEnviarMailContactoInscripcionEspecial = z.object({
  id: z.number(),
  asunto: z.string().min(1, { message: "Requerido" }).max(200, { message: "Máximo 200 caracteres" }),
  mensaje: z.string().min(1, { message: "Requerido" }).max(5000, { message: "Máximo 5000 caracteres" }),
});

export const inputGetTodosPeriodosInscripcionEspecial = z.object({});

export const inputEliminarPeriodoInscripcionEspecial = z.object({
  id: z.number(),
});
