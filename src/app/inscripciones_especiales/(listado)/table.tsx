"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type GroupingState, type SortingState } from "@tanstack/react-table";
//import { useInscripicionesEspecialesQueryParam } from "@/app/inscripciones_especiales/_hooks/use-solicitudes-inscripciones-especiales-query-param";

import { getColumnasInscripcionesEspeciales } from "@/app/inscripciones_especiales/(listado)/columns-inscripciones-especiales";
import { VerInscripcionEspecialModal } from "@/app/inscripciones_especiales/(listado)/ver-inscripcion-especial";
import { type inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

import { RespuestaInscripcionesEspeciales } from "../_components/mock-mis-inscripciones"; //TODO eliminar cuando fucione el backend

// type InscripcionesEspecialesData = RouterOutputs["inscripcionesEspeciales"]["getAll"];
type inscripcionesEspecialesFilters = z.infer<typeof inputGetAllInscripcionesEspeciales>;

type InscripcionesEspecialesTableProps = {
  data: RespuestaInscripcionesEspeciales;
  filters: inscripcionesEspecialesFilters;
  filterByUser?: boolean;
};

export const InscripcionesEspecialesSolicitudesTable = ({
  data,
  filters,
  filterByUser,
}: InscripcionesEspecialesTableProps) => {
  //   const { pagination, sorting, onSortingChange, onPaginationChange } = useInscripicionesEspecialesQueryParam(filters);

  const [grouping, setGrouping] = useState<GroupingState>(["caso"]);
  const columns = getColumnasInscripcionesEspeciales({ filterByUser });

  const utils = api.useUtils();
  //   const refreshGetAll = () => {
  //     utils.inscripcionesEspeciales.solicitudes.getAll.invalidate().catch((err) => {
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
                  <VerInscripcionEspecialModal inscripcionEspecialID={original.id} />
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
