"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { EquiposPrestamosTable } from "./table";
import { type inputGetAllPrestamosEquipos } from "@/shared/filters/reservas-equipos-filter.schema";
import LoadingEquiposPrestamosTable from "../../(listado)/loading-equipos-prestamos-table";

type EquiposPrestamosFilters = z.infer<typeof inputGetAllPrestamosEquipos>;

type EquiposPrestamosTableContainerProps = {
  filters: EquiposPrestamosFilters;
  filterByUser?: boolean;
};

export default function EquiposPrestamosTableContainer({ filters, filterByUser }: EquiposPrestamosTableContainerProps) {
  if (filterByUser) {
    filters = {
      ...filters,
      filtrByUserId: "true",
    };
  }

  const { data: prestamos, isLoading } = api.reservas.reservaEquipo.getAll.useQuery(filters);

  if (isLoading) {
    return <LoadingEquiposPrestamosTable />;
  }

  return (
    <EquiposPrestamosTable
      data={prestamos ?? { count: 0, reservas: [] }}
      filters={filters}
      filterByUser={filterByUser}
    />
  );
}
