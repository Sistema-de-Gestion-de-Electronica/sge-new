"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui";
import { api } from "@/trpc/react";
import { type GroupingState } from "@tanstack/react-table";
//import { useFallasQueryParam } from "@/app/fallas/_hooks/use-fallas-query-param";

import { getColumnasHistorialFallas } from "@/app/fallas/(listado)/columns-historial-fallas";

type HistorialFallaProps = {
  fallaId: number;
};

export default function HistorialFalla({ fallaId }: HistorialFallaProps) {
  const { data: fallas } = api.fallas.getHistorialPorFallaId.useQuery({
    fallaId: Number(fallaId),
  });
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const columns = getColumnasHistorialFallas();

  return (
    <div className="container mx-auto space-y-8 p-4">
      <h2 className="text-2xl font-bold">Historial de la Falla #{fallaId}</h2>
      <DataTable
        grouping={grouping}
        setGrouping={setGrouping}
        data={(fallas as any[]) ?? []}
        columns={columns}
        manualSorting
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
