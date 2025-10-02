"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type GroupingState, type SortingState } from "@tanstack/react-table";
//import { useFallasQueryParam } from "@/app/fallas/_hooks/use-fallas-query-param";

import { getColumnasFallas } from "@/app/fallas/(listado)/columns-fallas";
import { VerFallaModal } from "@/app/fallas/(listado)/ver-falla";
import { type inputGetAllFallas } from "@/shared/filters/fallas-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

type RespuestaFallas = RouterOutputs["fallas"]["getAllFallas"];
type fallasFilters = z.infer<typeof inputGetAllFallas>;

type FallasTableProps = {
  data: RespuestaFallas;
  filters: fallasFilters;
  filterByUser?: boolean;
};

export const FallasTable = ({
  data,
  filters,
  filterByUser,
}: FallasTableProps) => {
  //   const { pagination, sorting, onSortingChange, onPaginationChange } = useFallasQueryParam(filters);

  const [grouping, setGrouping] = useState<GroupingState>(["caso"]);
  const columns = getColumnasFallas({ filterByUser });

  const utils = api.useUtils();
  //   const refreshGetAll = () => {
  //     utils.fallas.getAll.invalidate().catch((err) => {
  //       console.error(err);
  //     });
  //   };

  return (
    <>
      <DataTable
        grouping={grouping}
        setGrouping={setGrouping}
        data={data.solicitudes ?? []}
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
};
