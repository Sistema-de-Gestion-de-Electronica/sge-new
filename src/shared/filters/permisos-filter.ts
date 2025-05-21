import { SgeNombre } from "@/generated/prisma";
import { z } from "zod";

// https://github.com/colinhacks/zod?tab=readme-ov-file#native-enums
const permisoSgeNombreNativeEnum = z.nativeEnum(SgeNombre);

export const inputGetUsuarioYRol = z.object({
  usuarioId: z.string(),
});
export const permisosSchema = z.object({
  permisos: z.array(permisoSgeNombreNativeEnum), // Un array de permisos como strings
});
