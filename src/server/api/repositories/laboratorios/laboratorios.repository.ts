import type { z } from "zod";
import { type PrismaClient } from "@/generated/prisma";
import type { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";
import { construirFechaReservaSinOffset } from "@/shared/get-date";

type InputGetAllReservas = z.infer<typeof inputGetAllLaboratorios>;
export const getAllReservas = async (ctx: { db: PrismaClient }, input: InputGetAllReservas) => {
  const { sede, turno, desde, hasta } = input;
  return await ctx.db.laboratorio.findMany({
    include: {
      reservaLaboratorioCerrado: {
        include: {
          reserva: {
            select: {
              fechaHoraInicio: true,
            },
          },
          discrecionalDocente: {
            select: {
              nombre: true,
              apellido: true,
            },
          },
          discrecionalMateria: {
            select: {
              nombre: true,
            },
          },
          curso: {
            include: {
              division: {
                select: {
                  nombre: true,
                },
              },
              materia: {
                select: {
                  nombre: true,
                },
              },
              profesor: {
                select: {
                  nombre: true,
                  apellido: true,
                },
              },
            },
          },
        },
        where: {
          reserva: {
            fechaHoraInicio: {
              gte: desde ? construirFechaReservaSinOffset(desde) : undefined,
              lte: hasta ? construirFechaReservaSinOffset(hasta) : undefined,
            },
          },
          curso: {
            turno,
          },
        },
      },
    },
    where: {
      sedeId: sede ? parseInt(sede) : undefined,
      incluirEnReporte: true,
    },
    orderBy: {
      nombre: "asc",
    },
  });
};
