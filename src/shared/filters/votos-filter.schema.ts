import { z } from "zod";

export const enumPosicion = z.enum(["ACUERDO", "DESACUERDO", "ACUERDO_PARCIAL"]);

export const inputAgregarVoto = z.object({
  posicion: z.enum(["ACUERDO", "DESACUERDO", "ACUERDO_PARCIAL"]),
  comentario: z.string().trim().max(2000).nullish(),
});

