import { z } from "zod";

export const inputEliminarReservaPantallas = z.object({ ids: z.array(z.string()) });

export const inputAgregarReservaPantalla = z.object({
  docente: z.string().min(1, { message: "Requerido" }),
  materia: z.string().min(1, { message: "Requerido" }),
  laboratorio: z.string().min(1, { message: "Requerido" }),
  horaInicio: z.string().min(1, { message: "Requerido" }),
  horaFin: z.string().min(1, { message: "Requerido" }),
  sedeId: z.string().min(1, { message: "Requerido" }),
});

export const inputGetReservasEnPntallaActivas = z.object({
  sedeId: z.string().optional(),
});
