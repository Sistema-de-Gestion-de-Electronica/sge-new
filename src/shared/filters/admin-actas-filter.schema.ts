import { z } from "zod";

export const inputAgregarActa = z.object ({
    fechaReunion: z.date()
    // ,
    //archivo: z.
    // estado: z.enum(["Abierto", "Cerrado"]).default("Abierto").catch("Abierto"), Default DB?
    // visibilidad: z.enum(["Visible", "Oculto"]).default("Visible").catch("Visible") Default DB?
})

// export const inputEliminarActa = z.object ({

// })
