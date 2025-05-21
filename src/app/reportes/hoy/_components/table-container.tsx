"use client";

import type { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";
import { api } from "@/trpc/react";
import type { z } from "zod";
import { ReservasHoy } from "./table";

type reservaFilters = z.infer<typeof inputGetAllLaboratorios>;

type Reservas = {
  filters: reservaFilters;
};

export const ReservasHoyTableContainer = ({ filters }: Reservas) => {
  const { data: reservas, isLoading } = api.reservas.reservasLaboratorio.getAll.useQuery(filters);

  if (isLoading) return <div></div>;

  return <ReservasHoy reservas={reservas ?? []} />;
};
