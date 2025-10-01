import { z } from "zod";

export const inputAgregarReunion = z.object ({
    fecha: z.date(),
    link: z.string()
})