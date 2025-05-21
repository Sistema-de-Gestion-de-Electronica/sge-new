import type { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";
import type { PrismaClient } from "@/generated/prisma";
import type { z } from "zod";
import { informacionUsuario } from "../usuario-helper";

type InputGetAllReservas = z.infer<typeof inputGetAllLaboratorios>;
export const getAllReservasToday = async (ctx: { db: PrismaClient }, input: InputGetAllReservas) => {
  const { sede, turno } = input;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return await ctx.db.reserva.findMany({
    include: {
      usuarioTutor: {
        select: informacionUsuario,
      },
      reservaLaboratorioCerrado: {
        include: {
          equipoReservado: {
            include: {
              equipoTipo: true,
            },
          },
          laboratorio: true,
          curso: {
            include: {
              division: true,
              materia: true,
              profesor: {
                select: informacionUsuario,
              },
            },
          },
          sede: true,
          discrecionalDocente: {
            select: informacionUsuario,
          },
          discrecionalMateria: {
            select: {
              nombre: true,
            },
          },
        },
        where: {
          curso: { turno },
          sedeId: sede ? parseInt(sede) : undefined,
        },
      },
      reservaLaboratorioAbierto: {
        include: {
          equipoReservado: {
            include: {
              equipoTipo: true,
            },
          },
          laboratorio: true,
          sede: true,
        },
        where: {
          sedeId: sede ? parseInt(sede) : undefined,
        },
      },
    },
    where: {
      fechaHoraInicio: {
        gte: today,
        lte: tomorrow,
      },
    },
    orderBy: {
      fechaHoraInicio: "asc",
    },
  });
};
