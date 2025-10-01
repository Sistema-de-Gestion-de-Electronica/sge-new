import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { bibliotecaRouter } from "./routers/biblioteca";
import { materiasRouter } from "./routers/materias";
import { equiposRouter } from "./routers/equipos";
import { cursosRouter } from "./routers/cursos";
import { adminRouter } from "./routers/admin";
import { reservasRouter } from "@/server/api/routers/reservas";
import { divisionRouter } from "./routers/division";
import { softwareRouter } from "./routers/software";
import { notificacionRouter } from "./routers/notificaciones";
import { usuarioPermiso } from "./routers/permisos";
import { laboratoriosRouter } from "./routers/laboratorios";
import { applicationRouter } from "./routers/application";
import { actasRouter } from "./routers/actas";
import { votosRouter } from "./routers/votos";
import { reunionRouter } from "./routers/reunion";
import { inscripcionesEspecialesRouter } from "./routers/inscripcionesEspeciales";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  application: applicationRouter,
  biblioteca: bibliotecaRouter,
  materia: materiasRouter,
  equipos: equiposRouter,
  cursos: cursosRouter,
  admin: adminRouter,
  reservas: reservasRouter,
  laboratorios: laboratoriosRouter,
  division: divisionRouter,
  software: softwareRouter,
  notificacion: notificacionRouter,
  permisos: usuarioPermiso,
  actas: actasRouter,
  reunion: reunionRouter,
  votos: votosRouter,
  inscripcionesEspeciales: inscripcionesEspecialesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
