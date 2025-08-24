import { inputGetAllActas } from "@/shared/filters/actas-filter.schema";
import { Prisma, PrismaClient } from "@/generated/prisma";
import { z } from "zod";

type InputGetAll = z.infer<typeof inputGetAllActas>;
const startOfYearUTC = (year: number) => new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
const endOfYearUTC   = (year: number) => new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));
export const getAllActas = async (ctx: { db: PrismaClient }, input: InputGetAll, esConsejero: boolean) => {

  const where: Prisma.ActaWhereInput = {
    visibilidad: "VISIBLE",
    ...(esConsejero ? {} : { estado: "CERRADA" }),
  };

  if (input.anio) {
    const gte = startOfYearUTC(input.anio);
    const lte = endOfYearUTC(input.anio);
    where.fechaReunion = { gte, lte };
  }
  
  return ctx.db.acta.findMany({
    where,
    orderBy: { fechaReunion: "desc" },
  });
}

export const getAllAniosActas = async (ctx: { db: PrismaClient }, esConsejero: boolean) => {
  const extra = esConsejero ? Prisma.sql`` : Prisma.sql`AND "Acta"."estado" = 'CERRADA'`;
  const rows: { year: number }[] = await ctx.db.$queryRaw(Prisma.sql`
    SELECT DISTINCT EXTRACT(YEAR FROM "Acta"."fechaReunion")::int AS year
    FROM "Acta"
    WHERE "Acta"."visibilidad" = 'VISIBLE'
    ${extra}
    ORDER BY year DESC
  `);
  return rows.map(r => r.year);
};