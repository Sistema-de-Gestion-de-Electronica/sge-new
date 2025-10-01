import { createTRPCRouter } from "@/server/api/trpc";
import { agregarVoto } from "../repositories/votos/votos.repository";


export const votosRouter = createTRPCRouter({
    createVoto: agregarVoto,
})