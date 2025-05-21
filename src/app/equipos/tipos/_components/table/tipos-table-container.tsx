"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { TiposTable } from "./tipos-table";
import { type inputGetTipos } from "@/shared/filters/equipos-tipos-filter.schema";
import LoadingTiposTable from "./loading-tipos-table";
import { equiposColumnas } from "./columns";

type TiposFilters = z.infer<typeof inputGetTipos>;

type Props = {
  filters: TiposFilters;
};

export default function TiposTableContainer({ filters }: Props) {
  const { data: tipos, isLoading } = api.equipos.getAllTipos.useQuery(filters);

  if (isLoading) {
    return <LoadingTiposTable columns={equiposColumnas} />;
  }

  return <TiposTable data={tipos ?? { count: 0, tipos: [] }} filters={filters} />;
}
