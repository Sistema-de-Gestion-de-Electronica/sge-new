"use client";

import { api } from "@/trpc/react";
import { EquiposTable } from "./table";
import { type z } from "zod";
import { type inputGetEquipos } from "@/shared/filters/equipos-filter.schema";
import LoadingEquiposTable from "./loading-equipos-table";

type EquiposFilters = z.infer<typeof inputGetEquipos>;

type EquiposTableContainerProps = {
  filters: EquiposFilters;
};

export default function EquiposTableContainer({ filters }: EquiposTableContainerProps) {
  const { data: equipos, isLoading } = api.equipos.getAll.useQuery(filters);

  if (isLoading) {
    return <LoadingEquiposTable />;
  }

  return <EquiposTable data={equipos ?? { count: 0, equipos: [] }} filters={filters} />;
}
