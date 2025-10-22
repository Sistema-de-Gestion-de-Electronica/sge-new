"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type GroupingState, type SortingState } from "@tanstack/react-table";

import { getColumnasConsultas } from "@/app/ventanilla/(listado)/columns-consultas";
import { VerConsultaModal } from "@/app/ventanilla/(listado)/ver-consulta";
import { type inputGetAllConsultas } from "@/shared/filters/ventanilla-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { useVentanillaQueryParam } from "../_hooks/use-ventanilla-query-param";
import { SgeNombre } from "@/generated/prisma";

type RespuestaConsultas = RouterOutputs["ventanilla"]["getAllConsultas"];
type consultasFilters = z.infer<typeof inputGetAllConsultas>;

type ConsultasTableProps = {
  data: RespuestaConsultas;
  filters: consultasFilters;
  filterByUser?: boolean;
};

export const ConsultasTable = ({ data, filters, filterByUser }: ConsultasTableProps) => {
  const { pagination, sorting, onSortingChange, onPaginationChange } = useVentanillaQueryParam(filters);

  const [grouping, setGrouping] = useState<GroupingState>([]);
  const columns = getColumnasConsultas({ filterByUser });

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
        data={data.consultas ?? []}
        columns={columns}
        manualSorting
        pageSize={pagination.pageSize}
        pageIndex={pagination.pageIndex}
        config={{
          sorting,
          onSortingChange: (updaterOrValue: SortingState | ((prevState: SortingState) => SortingState)) =>
            onSortingChange(typeof updaterOrValue === "function" ? updaterOrValue([]) : updaterOrValue),
        }}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                <TienePermiso permisos={[SgeNombre.VENTANILLA_VER_CONSULTAS]}>
                  <VerConsultaModal consultaId={original.id} />
                </TienePermiso>
              </>
            );
          },
        }}
      />

      <DataTablePaginationStandalone
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        rowCount={data.count}
        onChange={onPaginationChange}
      />
    </>
  );
};
