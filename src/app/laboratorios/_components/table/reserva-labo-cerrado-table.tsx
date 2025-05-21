"use client";

import { DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type GroupingState, type SortingState } from "@tanstack/react-table";
import type { inputGetAllSolicitudesReservaLaboratorioCerrado } from "@/shared/filters/reserva-laboratorio-filter.schema";
import { ReservaEstatus } from "@/generated/prisma";
import { getColumnasReservasLaboratorioCerrado } from "./reserva-labo-cerrado-columns";
import { useReservasLaboratorioCerradoQueryParam } from "../../_hooks/use-reserva-laboratorio-cerrado-query-param";
import { VerReservaModal } from "../ver-reserva";
import EditarReservaModal from "../editar-reserva-modal";
import { CancelarReservaLaboratorio } from "../cancelar-reserva";
import { useState } from "react";

type LaboratorioCerradoReservaData = RouterOutputs["reservas"]["reservarLaboratorioCerrado"]["getAll"];
type reservaFilters = z.infer<typeof inputGetAllSolicitudesReservaLaboratorioCerrado>;

type LaboratorioCerradoTableProps = {
  data: LaboratorioCerradoReservaData;
  filters: reservaFilters;
  filterByUser?: boolean;
};

export const LaboratorioCerradoReservaTable = ({ data, filters, filterByUser }: LaboratorioCerradoTableProps) => {
  const { pagination, sorting, onSortingChange, onPaginationChange } = useReservasLaboratorioCerradoQueryParam(filters);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.reservas.reservarLaboratorioCerrado.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const columns = getColumnasReservasLaboratorioCerrado({ filterByUser });

  const [grouping, setGrouping] = useState<GroupingState>(["fechaTexto", "turnoTexto"]);

  return (
    <>
      <DataTable
        grouping={grouping}
        setGrouping={setGrouping}
        data={data.reservas ?? []}
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
            const estaCancelada = original.reserva.estatus === ReservaEstatus.CANCELADA;

            return (
              <>
                {filterByUser && !estaCancelada && (
                  <CancelarReservaLaboratorio reservaId={original.reserva.id} refresh={refreshGetAll} />
                )}

                {!filterByUser && <VerReservaModal reservaID={original.reserva.id} />}

                {filterByUser && !estaCancelada && (
                  <EditarReservaModal params={{ id: original.reserva.id, cursoId: original.cursoId }} />
                )}
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
