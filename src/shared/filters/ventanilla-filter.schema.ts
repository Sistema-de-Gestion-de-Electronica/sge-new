import { id } from "date-fns/locale";
import { z } from "zod";

export const inputConsulta = z.object({ 
    nombre: z.string().min(1, { message: "Requerido" }),
    apellido: z.string().min(1, { message: "Requerido" }),
    email: z.string().email({ message: "Email inválido" }),
    legajo: z.string().optional(),
    consulta: z.string().min(1, { message: "Requerido" }),
 });

export const inputGetAllConsultas = z.object({
  filterByUserId: z.enum(["true", "false"]).optional(),
  pageIndex: z.number().optional(),
  pageSize: z.number().optional(),
});

export const inputGestionarConsultas = z.object({
  id: z.number(),
  estado: z.string().optional(),
  respuesta: z.string().optional().or(z.literal("")),
});

export const inputGetConsultaById = z.object({
  id: z.number(),
});