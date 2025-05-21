"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { type inputGetAllSolicitudesReservaLaboratorioCerrado } from "@/shared/filters/reserva-laboratorio-filter.schema";
import { LaboratorioCerradoReservaTable } from "./reserva-labo-cerrado-table";

type LaboratorioCerradoReservaFilters = z.infer<typeof inputGetAllSolicitudesReservaLaboratorioCerrado>;

type LaboratorioCerradoReservasTableContainerProps = {
  filters: LaboratorioCerradoReservaFilters;
  filterByUser?: boolean;
};

export default function LaboratorioCerradoSolicitudesTableContainer({
  filters,
  filterByUser,
}: LaboratorioCerradoReservasTableContainerProps) {
  if (filterByUser) {
    filters = {
      ...filters,
      filtrByUserId: "true",
    };
  }

  const { data: reservas } = api.reservas.reservarLaboratorioCerrado.getAll.useQuery(filters);

  return (
    <LaboratorioCerradoReservaTable
      data={reservas ?? { count: 0, reservas: [] }}
      filters={filters}
      filterByUser={filterByUser}
    />
  );
}
