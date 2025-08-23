import { z } from "zod";


export const inputGetAllActas = z.object({
  anio: z.number().int().optional(),
});

export const inputGetActaById = z.object({
  id: z.string(),
});

export const inputGetActaByName = z.object({
  nombre: z.string().min(1),
});
