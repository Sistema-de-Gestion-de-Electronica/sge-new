import { Posicion } from "@/generated/prisma";
import { z } from "zod";

export const inputAgregarVoto = z.object({
  posicion: z.nativeEnum(Posicion),
  comentario: z.string().trim().max(2000).optional().nullable(),
});
