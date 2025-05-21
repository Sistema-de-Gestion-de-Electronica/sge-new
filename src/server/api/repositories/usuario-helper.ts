import { type Prisma } from "@/generated/prisma";

// Usado para mantener siempre la misma informacion de los usuarios en las consultas
export const informacionUsuario: Prisma.UserSelect = {
  id: true,
  nombre: true,
  name: true,
  apellido: true,
  legajo: true,
  email: true,
  image: true,
};
