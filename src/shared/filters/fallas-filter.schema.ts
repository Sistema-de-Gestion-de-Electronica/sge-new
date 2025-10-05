import { z } from "zod";

export const inputReportarFallasPc = z.object({
  laboratorio: z.string().optional(),
  nroEquipo: z.string().min(1, { message: "Requerido" }),
  marca: z.string().optional(),
  modelo: z.string().optional(),
  fallas: z.array(z.string().min(1, { message: "Requerido" })),
  descripcionFalla: z.string().min(1, { message: "Requerido" }),
});

export const inputReportarFallasInstrumento = z.object({
  esInventariado: z.boolean().default(true),
  tipoInstrumento: z.string().optional(),
  instrumento: z.string().optional(),
  descripcionEquipo: z.string().min(1, { message: "Requerido" }),
  descripcionFalla: z.string().min(1, { message: "Requerido" }).optional().or(z.literal("")),
  condicion: z.string().min(1).optional(),
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
