import { z } from "zod";

export const inputConsulta = z.object({
  nombre: z.string().min(1, { message: "Requerido" }),
  apellido: z.string().min(1, { message: "Requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  legajo: z.string().regex(/^\d*$/, { message: "El legajo solo puede contener números" }).optional(),
  asunto: z.string().min(1, { message: "Requerido" }).max(60, { message: "El asunto no puede exceder 60 caracteres" }),
  consulta: z.string().min(1, { message: "Requerido" }),
});

export const inputGetAllConsultas = z.object({
  filterByUserId: z.enum(["true", "false"]).optional(),
  pageSize: z.enum(["10", "20", "30", "40", "50"]).default("20").catch("20"),
  pageIndex: z
    .string()
    .default("0")
    .refine((value) => parseInt(value) >= 0, { message: "Debe ser mayor o igual a 0" })
    .catch("0"),
  orderBy: z
    .enum(["id", "nombre", "apellido", "legajo", "email", "asunto", "fechaConsulta", "estado"])
    .default("id")
    .catch("id"),
  orderDirection: z.enum(["asc", "desc"]).default("desc").catch("desc"),
  searchText: z.string().default(""),
  nombre: z.string().default(""),
  apellido: z.string().default(""),
  legajo: z.string().default(""),
  email: z.string().default(""),
  asunto: z.string().default(""),
  estado: z.string().default(""),
});

export const inputGestionarConsultas = z
  .object({
    id: z.number(),
    estado: z.string().optional(),
    respuesta: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.estado === "RESPONDIDA") {
        return data.respuesta && data.respuesta.trim().length > 0;
      }
      return true;
    },
    {
      message: "La respuesta es obligatoria si no se marca como pendiente",
      path: ["respuesta"],
    },
  );

export const inputGetConsultaById = z.object({
  id: z.number(),
});
