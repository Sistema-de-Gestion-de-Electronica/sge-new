"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { LaboratorioAbiertoReservaTable } from "./table";
import { type inputGetAllSolicitudesReservaLaboratorioAbierto } from "@/shared/filters/reserva-laboratorio-filter.schema";

type LaboratorioAbiertoReservaFilters = z.infer<typeof inputGetAllSolicitudesReservaLaboratorioAbierto>;

type LaboratorioAbiertoReservasTableContainerProps = {
  filters: LaboratorioAbiertoReservaFilters;
  filterByUser?: boolean;
};

export default function LaboratorioAbiertoSolicitudesTableContainer({
  filters,
  filterByUser,
}: LaboratorioAbiertoReservasTableContainerProps) {
  if (filterByUser) {
    filters = {
      ...filters,
      filtrByUserId: "true",
    };
  }

  const { data: reservas } = api.reservas.reservaLaboratorioAbierto.getAll.useQuery(filters);

  return (
    <LaboratorioAbiertoReservaTable
      data={reservas ?? { count: 0, reservas: [] }}
      filters={filters}
      filterByUser={filterByUser}
    />
  );
}
