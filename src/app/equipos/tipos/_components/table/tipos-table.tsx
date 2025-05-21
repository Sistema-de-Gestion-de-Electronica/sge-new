"use client";

import { DataTable } from "@/components/ui";
import RemoverTipoModal from "./remove-tipo";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { EditarTipoModal } from "./edit-tipo";
import { type SortingState } from "@tanstack/react-table";
import { getColumns } from "./columns";
import { useTiposQueryParam } from "../../_hooks/use-tipos-query-param";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type inputGetTipos } from "@/shared/filters/equipos-tipos-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type TiposData = RouterOutputs["equipos"]["getAllTipos"];
type TiposFilters = z.infer<typeof inputGetTipos>;

type TiposTableProps = {
  data: TiposData;
  filters: TiposFilters;
};

export const TiposTable = ({ data, filters }: TiposTableProps) => {
  const { sorting, pagination, onSortingChange, onPaginationChange } = useTiposQueryParam(filters);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.equipos.getAllTipos.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const columns = getColumns();

  return (
    <>
      <DataTable
        data={data.tipos ?? []}
        columns={columns}
        pageSize={pagination.pageSize}
        pageIndex={pagination.pageIndex}
        manualSorting
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
                <TienePermiso permisos={[SgeNombre.EQUIPOS_TIPO_ABM]}>
                  <RemoverTipoModal
                    tipoId={original.id}
                    nombre={original.nombre ?? ""}
                    imagen={original.imagen ?? ""}
                    onSubmit={refreshGetAll}
                  />
                </TienePermiso>

                <TienePermiso permisos={[SgeNombre.EQUIPOS_TIPO_ABM]}>
                  <EditarTipoModal tipoId={original.id} />
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
