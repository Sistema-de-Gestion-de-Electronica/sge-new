"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type GroupingState, type SortingState } from "@tanstack/react-table";
//import { useFallasQueryParam } from "@/app/fallas/_hooks/use-fallas-query-param";

import { getColumnasFallas } from "@/app/fallas/(listado)/columns-fallas";
import { VerFallaModal } from "@/app/fallas/(listado)/ver-falla";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

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
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const columns = getColumnasFallas({ filterByUser });

  return (
    <div className="container mx-auto space-y-8 p-4">
        <h2 className="text-2xl font-bold">Historial de la Falla #{fallaId}</h2>
        <h4></h4>
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
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                <TienePermiso permisos={[]}>
                  <VerFallaModal fallaID={original.id} />
                </TienePermiso>
              </>
            );
          },
        }}
      />

      {/* <DataTablePaginationStandalone
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          rowCount={data.count}
          onChange={onPaginationChange}
        /> */}
    </>
  );
}
