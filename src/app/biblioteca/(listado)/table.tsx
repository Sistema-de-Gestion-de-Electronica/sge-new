"use client";

import { DataTable } from "@/components/ui";
import RemoveLibroModal from "./remove-libro";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { type inputGetBooks } from "@/shared/filters/biblioteca-filter.schema";
import { useBibliotecaQueryParam } from "../_hooks/use-biblioteca-query-param";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { EditLibroModal } from "./edit-libro";
import { type SortingState } from "@tanstack/react-table";
import { getColumns } from "./columns";
import { VerLibroModal } from "./ver-libro";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";
import { useTienePermisos } from "@/app/_hooks/use-tiene-permisos";

type LibroData = RouterOutputs["biblioteca"]["getAll"];
type BibliotecaFilters = z.infer<typeof inputGetBooks>;

type BibliotecaTableProps = {
  data: LibroData;
  filters: BibliotecaFilters;
};

export const BibliotecaTable = ({ data, filters }: BibliotecaTableProps) => {
  const { tienePermisos: tienePrestar } = useTienePermisos([SgeNombre.BIBLIOTECA_PRESTAMO_PRESTAR]);

  const { pagination, sorting, onSortingChange, onPaginationChange } = useBibliotecaQueryParam(filters);

  const columns = getColumns({ tienePrestar: tienePrestar });

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.biblioteca.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  return (
    <>
      <DataTable
        data={data.libros ?? []}
        columns={columns}
        manualSorting
        pageSize={pagination.pageSize}
        pageIndex={pagination.pageIndex}
        config={{
          sorting,
          onSortingChange: (updaterOrValue: SortingState | ((prevState: SortingState) => SortingState)) => {
            return onSortingChange(typeof updaterOrValue === "function" ? updaterOrValue([]) : updaterOrValue);
          },
        }}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <div>
                <TienePermiso permisos={[SgeNombre.BIBLIOTECA_ABM_LIBRO]} fallback={null}>
                  <>
                    <RemoveLibroModal
                      libroId={original.id}
                      nombre={original.titulo}
                      disponible={original.disponible}
                      onSubmit={refreshGetAll}
                    />
                    <EditLibroModal libroId={original.id} />
                  </>
                </TienePermiso>
                <TienePermiso permisos={[SgeNombre.BIBLIOTECA_VER_DETALLES_LIBRO]} fallback={null}>
                  <VerLibroModal libroId={original.id} />
                </TienePermiso>
              </div>
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
