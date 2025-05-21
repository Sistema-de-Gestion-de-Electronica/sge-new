"use client";

import { Button, DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { type z } from "zod";
import { DataTablePaginationStandalone } from "@/components/ui/table/table-pagination-standalone";
import { type GroupingState, type SortingState } from "@tanstack/react-table";
import { useReservasLaboratorioAbiertoQueryParam } from "../_hooks/use-reserva-laboratorio-abierto-query-param";

import { getColumnasReservasLaboratorioAbierto } from "./columns-reserva";
import { VerReservaModal } from "./ver-reserva";
import EditarReservaModal from "./editar-reserva-modal";
import { type inputGetAllSolicitudesReservaLaboratorioAbierto } from "@/shared/filters/reserva-laboratorio-filter.schema";
import { ReservaEstatus } from "@/generated/prisma";
import { CancelarReservaLaboratorioAbierto } from "../_components/cancelar-reserva";
import { useState } from "react";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import Link from "next/link";
import { COMPROBANTE_ROUTE } from "@/shared/server-routes";
import { PrinterIcon } from "lucide-react";

type LaboratorioAbiertoReservaData = RouterOutputs["reservas"]["reservaLaboratorioAbierto"]["getAll"];
type reservaFilters = z.infer<typeof inputGetAllSolicitudesReservaLaboratorioAbierto>;

type LaboratorioAbiertoTableProps = {
  data: LaboratorioAbiertoReservaData;
  filters: reservaFilters;
  filterByUser?: boolean;
};

export const LaboratorioAbiertoReservaTable = ({ data, filters, filterByUser }: LaboratorioAbiertoTableProps) => {
  const { pagination, sorting, onSortingChange, onPaginationChange } = useReservasLaboratorioAbiertoQueryParam(filters);

  const [grouping, setGrouping] = useState<GroupingState>(["fechaTexto", "turnoTexto"]);
  const columns = getColumnasReservasLaboratorioAbierto({ filterByUser });

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.reservas.reservaLaboratorioAbierto.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

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
                  <TienePermiso permisos={[]}>
                    <CancelarReservaLaboratorioAbierto reservaId={original.reserva.id} refresh={refreshGetAll} />
                  </TienePermiso>
                )}

                {!filterByUser && (
                  <TienePermiso permisos={[]}>
                    <VerReservaModal reservaID={original.reserva.id} />
                  </TienePermiso>
                )}

                {filterByUser && !estaCancelada && (
                  <TienePermiso permisos={[]}>
                    <EditarReservaModal id={original.reserva.id} onSubmit={refreshGetAll} />
                  </TienePermiso>
                )}

                {!filterByUser && (
                  <Link
                    href={`${COMPROBANTE_ROUTE.laboratorioAbiertoRuta.href}/${original.reserva.id}`}
                    target="_blank"
                  >
                    <Button
                      title="Imprimir"
                      variant="icon"
                      color="ghost"
                      icon={PrinterIcon}
                      className="h-8 w-8 px-1 py-1"
                    />
                  </Link>
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
