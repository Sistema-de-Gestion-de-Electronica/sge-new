import { z } from "zod";

// 🔹 Obtener todas las actas (con filtros opcionales)
export const inputGetAllActas = z.object({
  estado: z.enum(["ABIERTA", "CERRADA"]).optional(),
  visibilidad: z.enum(["VISIBLE", "OCULTA"]).optional(),
  anio: z.number().int().optional(), // año específico
});

// 🔹 Obtener un acta por ID
export const inputGetActaById = z.object({
  id: z.string(),
});

// 🔹 Obtener un acta por nombre
export const inputGetActaByName = z.object({
  nombre: z.string().min(1),
});
