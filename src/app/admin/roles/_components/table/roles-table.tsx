"use client";

import { DataTable } from "@/components/ui";
import RemoverRolModal from "./remove-libro";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { EditarRolModal } from "./edit-libro";
import { type SortingState } from "@tanstack/react-table";
import { getColumns } from "./columns";
import { useAdminRolesQueryParam } from "../../_hooks/use-admin-roles-query-param";
import { type inputGetRoles } from "@/shared/filters/admin-roles-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

type RolesData = RouterOutputs["admin"]["roles"]["getAllRoles"];
type AdminRolesFilters = z.infer<typeof inputGetRoles>;

type BibliotecaTableProps = {
  data: RolesData;
  filters: AdminRolesFilters;
};

export const RolesTable = ({ data, filters }: BibliotecaTableProps) => {
  const { sorting, onSortingChange } = useAdminRolesQueryParam(filters);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.admin.roles.getAllRoles.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const columns = getColumns();

  // TODO: Implement resizing
  return (
    <>
      <DataTable
        data={data.roles ?? []}
        columns={columns}
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
                <TienePermiso permisos={[]}>
                  {/* TODO: no se cual seria el permiso que va??*/}
                  <RemoverRolModal rolId={original.id} nombre={original.nombre} onSubmit={refreshGetAll} />
                </TienePermiso>
                <TienePermiso permisos={[]}>
                  {/* TODO: no se cual seria el permiso que va??*/}
                  <EditarRolModal rolId={original.id} />
                </TienePermiso>
              </>
            );
          },
        }}
      />
    </>
  );
};
