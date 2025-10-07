"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type GroupingState, type SortingState } from "@tanstack/react-table";
//import { useFallasQueryParam } from "@/app/fallas/_hooks/use-fallas-query-param";

import { getColumnasHistorialFallas } from "@/app/fallas/(listado)/columns-historial-fallas";
import { FallasDetalle } from "@/app/fallas/_components/info-basica-fallas";

type HistorialFallaProps = {
  fallaId: number;
};

export default function HistorialFalla({ fallaId }: HistorialFallaProps) {
  const {
    data: fallas,
    isLoading,
    isError,
    refetch: refetchFalla,
  } = api.fallas.getHistorialFallasPorId.useQuery({
    id: Number(fallaId),
  });
  const [grouping, setGrouping] = useState<GroupingState>(["id"]);
  const columns = getColumnasHistorialFallas();

  return (
    <div className="container mx-auto space-y-8 p-4">
      <h2 className="text-2xl font-bold">Historial de la Falla #{fallaId}</h2>
      <FallasDetalle fallaId={fallaId} />
      <DataTable
        grouping={grouping}
        setGrouping={setGrouping}
        data={fallas ?? []}
        columns={columns}
        manualSorting
        // pageSize={pagination.pageSize}
        // pageIndex={pagination.pageIndex}
        // config={{
        //   sorting,
        //   onSortingChange: (updaterOrValue: SortingState | ((prevState: SortingState) => SortingState)) =>
        //     onSortingChange(typeof updaterOrValue === "function" ? updaterOrValue([]) : updaterOrValue),
        // }}
      />

      {/* <DataTablePaginationStandalone
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          rowCount={data.count}
          onChange={onPaginationChange}
        /> */}
    </div>
  );
}
