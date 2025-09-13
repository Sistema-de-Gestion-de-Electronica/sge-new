import { createTRPCRouter } from "@/server/api/trpc";
import { laboratoriosRouter } from "./laboratorios";
import { usuariosRouter } from "./usuarios";
import { rolesRouter } from "./roles";
import { actasRouter } from "./actas";

export const adminRouter = createTRPCRouter({
  roles: rolesRouter,
  usuarios: usuariosRouter,
  laboratorios: laboratoriosRouter,
  actas: actasRouter,
});
