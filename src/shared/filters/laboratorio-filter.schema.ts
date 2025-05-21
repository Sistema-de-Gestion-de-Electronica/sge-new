import { z } from "zod";

export const inputAddSoftware = z.object({
  nombre: z.string().min(1, { message: "Requerido" }),
  version: z.string().min(1, { message: "Requerido" }),
  estado: z.string().min(1, { message: "Requerido" }),
  laboratorios: z.array(z.string()).default([]),
  windows: z.boolean().default(true),
  linux: z.boolean().default(false),
});

export const inputGetBooks = z.object({});

export const inputGetSoftware = z.object({
  id: z.number(),
});

export const inputGetSoftwareFilter = z.object({
  orderBy: z.enum(["id", "nombre", "version", "estado"]).default("nombre").catch("nombre"),
  orderDirection: z.enum(["asc", "desc"]).default("asc").catch("asc"),
  searchText: z.string().default(""),
  nombre: z.string().optional(),
  sedeId: z.string().optional(),
});

export const inputEliminarSoftware = inputGetSoftware;

export const inputEditarSoftware = z
  .object({
    id: z.number().optional(), // Si viene significa que se va a usar para editar, si no significa que se va a usar para crear
  })
  .merge(inputAddSoftware);

export const inputGetAllLaboratorios = z.object({
  sede: z.string().optional(),
  turno: z.enum(["MANANA", "TARDE", "NOCHE"]).optional(),
  desde: z.string().optional(),
  hasta: z.string().optional(),
});
