import { z } from "zod";

export const inputReportarFallasPc = z.object({
  laboratorio: z.string().optional(),
  nroEquipo: z.string().min(1, { message: "Requerido" }),
  marca: z.string().optional(),
  modelo: z.string().optional(),
  fallas: z
    .array(z.string().min(1, { message: "Requerido" }))
    .min(1, { message: "Debe seleccionar al menos una falla" }),
  descripcionFalla: z.string().min(1, { message: "Requerido" }),
});

export const inputReportarFallasInstrumento = z
  .object({
    esInventariado: z.boolean().default(true),
    tipoInstrumento: z.string().optional(),
    instrumento: z.string().optional(),
    descripcionEquipo: z.string().min(1).optional(),
    descripcionFalla: z.string().min(1, { message: "Requerido" }),
    condicion: z.string().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.esInventariado) {
      if (!data.tipoInstrumento || data.tipoInstrumento.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tipoInstrumento"],
          message: "Requerido",
        });
      }
      if (!data.instrumento || data.instrumento.toString().trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["instrumento"],
          message: "Requerido",
        });
      }
    }
  });

export const inputGetAllFallas = z.object({
  filterByUserId: z.enum(["true", "false"]).optional(),
  pageIndex: z.number().optional(),
  pageSize: z.number().optional(),
});

export const inputGestionarFallas = z.object({
  id: z.number(),
  asignadoA: z.string().optional(),
  descripcionFalla: z.string().optional().or(z.literal("")),
  palabraClave: z.string().optional(),
});

export const inputGetFallaPorId = z.object({
  id: z.number(),
});

export const inputCambiarEstadoFalla = z.object({
  id: z.number(),
  estado: z.enum(["FALLADO", "EN_REPARACION", "REPARADO", "DESCARTADO"]),
  descripcionFalla: z.string().optional().or(z.literal("")),
  asignadoA: z.string().optional(),
  palabraClave: z.string().optional(),
});

export const inputGetHistorialPorFallaId = z.object({
  fallaId: z.number(),
});

export const inputEliminarFalla = z.object({
  id: z.number(),
});

export const enumEstadoFalla = z.enum(["FALLADO", "EN_REPARACION", "REPARADO", "DESCARTADO", "ELIMINADO"]);
export const enumTipoFalla = z.enum(["PC", "Instrumento"]);
