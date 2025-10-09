"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { FallasTable } from "@/app/fallas/(listado)/table";
import { type inputGetAllFallas } from "@/shared/filters/fallas-filter.schema";
// import { ExportExcelButton } from "./export-excel-button";

type FallasFilters = z.infer<typeof inputGetAllFallas>;

type FallasTableContainerProps = {
  filters: FallasFilters;
  filterByUser?: boolean;
};

export default function FallasTableContainer({ filters, filterByUser }: FallasTableContainerProps) {
  if (filterByUser) {
    filters = {
      ...filters,
      filterByUserId: "true",
    };
  }

  const { data: fallas } = api.fallas.getAllFallas.useQuery(filters);

  //const fallas = MOCK_RESPUESTA_MIS_FALLAS;

  const data = fallas ?? {
    count: 0,
    fallas: [],
    pageIndex: 0,
    pageSize: 10,
  };

  return (
    <div className="space-y-4">
      {/* <div className="flex justify-end">
        <ExportExcelButton
          data={data.reportes}
          filename="reportes_fallas"
          disabled={!fallas}
        />
      </div> */}
      <FallasTable data={data} filters={filters} filterByUser={filterByUser} />
    </div>
  );
}
