"use client";

import { DataTable } from "@/components/ui";
import RemoveCursoModal from "./remove-curso";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { useCursosQueryParam } from "../_hooks/use-cursos-query-param";
// import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { EditCursoModal } from "./editar-curso";
import type { GroupingState, SortingState } from "@tanstack/react-table";
import { getColumns } from "./columns";
import { type inputGetCursos } from "@/shared/filters/cursos-filter.schema";
import { useState } from "react";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type CursoData = RouterOutputs["cursos"]["getAll"];
type CursosFilters = z.infer<typeof inputGetCursos>;

type CursosTableProps = {
  data: CursoData;
  filters: CursosFilters;
};

export const CursosTable = ({ data, filters }: CursosTableProps) => {
  const { sorting, onSortingChange } = useCursosQueryParam(filters);
  const [grouping, setGrouping] = useState<GroupingState>(["anioDeCarrera", "materia"]);
  const columns = getColumns();

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.cursos.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  return (
    <>
      <DataTable
        data={data.cursos ?? []}
        columns={columns}
        manualSorting
        grouping={grouping}
        setGrouping={setGrouping}
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
                <TienePermiso permisos={[SgeNombre.CURSOS_ABM]}>
                  <RemoveCursoModal cursoId={original.id} nombre={original.division.nombre} onSubmit={refreshGetAll} />
                </TienePermiso>
                <TienePermiso permisos={[SgeNombre.CURSOS_ABM]}>
                  <EditCursoModal cursoId={original.id} />
                </TienePermiso>
              </>
            );
          },
        }}
      />
    </>
  );
};
