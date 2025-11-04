"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { ConsultasTable } from "@/app/ventanilla/(listado)/table";
import { type inputGetAllConsultas } from "@/shared/filters/ventanilla-filter.schema";
import { VentanillaFilters } from "@/app/ventanilla/(listado)/filtros/ventanilla-filters";
// import { ExportExcelButton } from "./export-excel-button";

type ConsultasFilters = z.infer<typeof inputGetAllConsultas>;

type ConsultasTableContainerProps = {
  filters: ConsultasFilters;
  filterByUser?: boolean;
};

export default function ConsultasTableContainer({ filters, filterByUser }: ConsultasTableContainerProps) {
  if (filterByUser) {
    filters = {
      ...filters,
      filterByUserId: "true",
    };
  }

  const { data: consultas } = api.ventanilla.getAllConsultas.useQuery(filters);

  const data = consultas ?? {
    count: 0,
    consultas: [],
    pageIndex: 0,
    pageSize: 10,
  };

  return (
    <div className="space-y-4">
      <VentanillaFilters filters={filters} />
      <ConsultasTable data={data} filters={filters} filterByUser={filterByUser} />
    </div>
  );
}
