"use client";

import { api } from "@/trpc/react";
import { CursosTable } from "./table";
import { type z } from "zod";
import { type inputGetCursos } from "@/shared/filters/cursos-filter.schema";
import LoadingCursosTable from "./loading-curso-table";

type CursosFilters = z.infer<typeof inputGetCursos>;

type CursosTableContainerProps = {
  filters: CursosFilters;
  filterByUser?: boolean;
};

export default function CursoTableContainer({ filters, filterByUser }: CursosTableContainerProps) {
  if (filterByUser) {
    filters = {
      ...filters,
      filtrByUserId: "true",
    };
  }

  const { data: cursos, isLoading } = api.cursos.getAll.useQuery(filters);
  if (isLoading) {
    return <LoadingCursosTable />;
  }

  return <CursosTable data={cursos ?? { count: 0, cursos: [] }} filters={filters} />;
}
