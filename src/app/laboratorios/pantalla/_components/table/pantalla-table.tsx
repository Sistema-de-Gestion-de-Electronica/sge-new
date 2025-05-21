"use client";

import { Button, DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { getColumns } from "./columns";
import EliminarReservaPantallaModal from "../actions/pantalla-eliminar";
import React, { useState, type HTMLProps } from "react";
import { type GroupingState, type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

type PantallaData = RouterOutputs["reservas"]["pantalla"]["getAllActivas"];

type BibliotecaTableProps = {
  data: PantallaData;
};

export const PantallaTable = ({ data }: BibliotecaTableProps) => {
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.reservas.pantalla.getAllActivas.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const cursosAEliminar = Object.keys(rowSelection);

  const columnsBase = getColumns();

  const columns = React.useMemo<ColumnDef<PantallaData[number]>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
            <Link href={`/pantalla`} target="_blank" title="Ver pantalla de laboratorios" className="ml-1">
              <Button variant="default" color="white" size="sm">
                <EyeIcon size={16} className="mr-2" />
                Ver pantalla
              </Button>
            </Link>
          </>
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
        meta: {
          header: {
            hideSort: true,
          },
        },
      },
      ...columnsBase,
    ],
    [columnsBase],
  );

  const [grouping, setGrouping] = useState<GroupingState>(["turnoTexto"]);

  return (
    <>
      <DataTable
        data={data ?? []}
        columns={columns}
        grouping={grouping}
        setGrouping={setGrouping}
        config={{
          onRowSelectionChange: setRowSelection,
          rowSelection,
        }}
        getRowId={(row) => row.id}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                <EliminarReservaPantallaModal
                  ids={cursosAEliminar.length ? cursosAEliminar : [original.id]}
                  onSubmit={refreshGetAll}
                />
              </>
            );
          },
        }}
      />
    </>
  );
};

const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={
        className +
        "peer h-4 w-4 shrink-0 cursor-pointer rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      }
      {...rest}
    />
  );
};
