"use client";

import { BibliotecaTable } from "./table";
import { type z } from "zod";
import { type inputGetBooks } from "@/shared/filters/biblioteca-filter.schema";
import { api } from "@/trpc/react";
import LoadingBibliotecaTable from "./loading-biblioteca-table";

type BibliotecaFilters = z.infer<typeof inputGetBooks>;

type BibliotecaTableContainerProps = {
  filters: BibliotecaFilters;
};

export default function BibliotecaTableContainer({ filters }: BibliotecaTableContainerProps) {
  const { data: libros, isLoading } = api.biblioteca.getAll.useQuery(filters);

  if (isLoading) {
    return <LoadingBibliotecaTable />;
  }

  return <BibliotecaTable data={libros ?? { count: 0, libros: [] }} filters={filters} />;
}
