"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { type inputGetAllPrestamosLibros } from "@/shared/filters/reservas-filter.schema";
import { BibliotecaPrestamosTable } from "./table";
import LoadingBibliotecaPrestamosTable from "../../(listado)/loading-biblioteca-prestamos-table";

type BibliotecaPrestamosFilters = z.infer<typeof inputGetAllPrestamosLibros>;

type BibliotecaPrestamosTableContainerProps = {
  filters: BibliotecaPrestamosFilters;
  filterByUser?: boolean;
};

export default function BibliotecaPrestamosTableContainer({
  filters,
  filterByUser,
}: BibliotecaPrestamosTableContainerProps) {
  if (filterByUser) {
    filters = {
      ...filters,
      filtrByUserId: "true",
    };
  }

  const { data: prestamos, isLoading } = api.reservas.reservaBiblioteca.getAll.useQuery(filters);

  if (isLoading) {
    return <LoadingBibliotecaPrestamosTable />;
  }

  return (
    <>
      <BibliotecaPrestamosTable data={prestamos ?? { count: 0, reservas: [] }} filters={filters} />
    </>
  );
}
