import { z } from "zod";

export const inputReportarFallasPc = z.object({
  laboratorio: z.string().min(1, { message: "Requerido" }),
  nroEquipo: z.string().min(1, { message: "Requerido" }),
  marca: z.string().min(1, { message: "Requerido" }),
  modelo: z.string().min(1, { message: "Requerido" }),
  fallas: z.array(z.string().min(1, { message: "Requerido" })),
  descripcionFalla: z.string().min(1, { message: "Requerido" }),
});

export const inputReportarFallasInstrumento = z.object({
  tipoInstrumento: z.string().min(1, { message: "Requerido" }),
  instrumento: z.string().min(1, { message: "Requerido" }),
  descripcionEquipo: z.string().min(1, { message: "Requerido" }),
  descripcionFalla: z.string().min(1, { message: "Requerido" }),
  condicion: z.string().min(1).optional(),
});