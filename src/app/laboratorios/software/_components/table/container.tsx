"use client";

import { api } from "@/trpc/react";
import { SoftwareTable } from "./software-table";
import { type inputGetSoftwareFilter } from "@/shared/filters/laboratorio-filter.schema";
import { type z } from "zod";

type SoftwareFilters = z.infer<typeof inputGetSoftwareFilter>;
type SoftwareTableContainerProps = {
  filters: SoftwareFilters;
};

export default function SoftwareTableContainer({ filters }: SoftwareTableContainerProps) {
  const { data: softwares } = api.software.getAll.useQuery(filters);

  return <SoftwareTable data={softwares ?? { software: [], laboratorios: [] }} filters={filters} />;
}
