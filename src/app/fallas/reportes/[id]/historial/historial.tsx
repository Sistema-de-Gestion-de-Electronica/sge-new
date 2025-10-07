"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui";
import { api } from "@/trpc/react";
import { type GroupingState } from "@tanstack/react-table";
//import { useFallasQueryParam } from "@/app/fallas/_hooks/use-fallas-query-param";

import { getColumnasFallas } from "@/app/fallas/(listado)/columns-fallas";
import { VerFallaModal } from "@/app/fallas/(listado)/ver-falla";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

type HistorialFallaProps = {
  fallaId: number;
};

export default function HistorialFalla({ fallaId }: HistorialFallaProps) {
  const { data: fallas } = api.fallas.getHistorialPorFallaId.useQuery({
    fallaId: Number(fallaId),
  });
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const filterByUser = false;
  const columns = getColumnasFallas({ filterByUser });

  return (
    <div className="container mx-auto space-y-8 p-4">
      <h2 className="text-2xl font-bold">Historial de la Falla #{fallaId}</h2>
      <h4></h4>
      <DataTable
        grouping={grouping}
        setGrouping={setGrouping}
        data={(fallas as any[]) ?? []}
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
                  <VerFallaModal fallaID={(original as any).fallaId ?? (original as any).id} />
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
    </div>
  );
}
