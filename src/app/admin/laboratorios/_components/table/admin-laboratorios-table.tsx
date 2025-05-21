"use client";

import { DataTable } from "@/components/ui";
import RemoverLaboratorioModal from "./remove-laboratorio";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { EditarLaboratorioModal } from "./edit-laboratorio";
import { getColumns } from "./columns";
import { type inputGetLaboratorios } from "@/shared/filters/admin-laboratorios-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

type LaboratoriosData = RouterOutputs["admin"]["laboratorios"]["getAll"];
type AdminLaboratoriosFilters = z.infer<typeof inputGetLaboratorios>;

type LaboratorioTableProps = {
  data: LaboratoriosData;
  filters: AdminLaboratoriosFilters;
};

export const AdminLaboratoriosTable = ({ data }: LaboratorioTableProps) => {
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.admin.laboratorios.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const columns = getColumns();

  return (
    <>
      <DataTable
        data={data.laboratorios ?? []}
        columns={columns}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                <TienePermiso permisos={[]}>
                  <RemoverLaboratorioModal
                    laboratorioId={original.id}
                    nombre={original.nombre}
                    onSubmit={refreshGetAll}
                  />
                </TienePermiso>
                <TienePermiso permisos={[]}>
                  <EditarLaboratorioModal laboratorioId={original.id} />
                </TienePermiso>
              </>
            );
          },
        }}
      />
    </>
  );
};
