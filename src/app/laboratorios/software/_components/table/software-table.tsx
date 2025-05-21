"use client";

import { DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { getColumns } from "./columns";
import { SoftwareNuevoEditar } from "../actions/software-nuevo";
import EliminarSoftwareModal from "../actions/software-eliminar";
import { useSoftwareQueryParam } from "@/app/laboratorios/_hooks/use-software-query-param";
import { type SortingState } from "@tanstack/react-table";
import { type z } from "zod";
import { type inputGetSoftwareFilter } from "@/shared/filters/laboratorio-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type SoftwareData = RouterOutputs["software"]["getAll"];
type SoftwareFilters = z.infer<typeof inputGetSoftwareFilter>;

type BibliotecaTableProps = {
  data: SoftwareData;
  filters: SoftwareFilters;
};

export const SoftwareTable = ({ data, filters }: BibliotecaTableProps) => {
  const { onSortingChange } = useSoftwareQueryParam(filters);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.software.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const { software, laboratorios } = data;

  const columns = getColumns(laboratorios);

  return (
    <>
      <DataTable
        data={software ?? []}
        columns={columns}
        manualSorting
        config={{
          onSortingChange: (updaterOrValue: SortingState | ((prevState: SortingState) => SortingState)) => {
            return onSortingChange(typeof updaterOrValue === "function" ? updaterOrValue([]) : updaterOrValue);
          },
        }}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                <TienePermiso permisos={[SgeNombre.APLICACIONES_ABM]}>
                  <>
                    <EliminarSoftwareModal softwareId={original.id} nombre={original.nombre} onSubmit={refreshGetAll} />
                    <SoftwareNuevoEditar softwareId={original.id} />
                  </>
                </TienePermiso>
              </>
            );
          },
        }}
      />
    </>
  );
};
