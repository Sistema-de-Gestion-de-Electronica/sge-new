import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PrestarDevolverEquipo } from "./estado-equipo";

type EquipoData = RouterOutputs["equipos"]["getAll"]["equipos"][number];

export const getEquiposColumnas = ({ tienePrestar }: { tienePrestar: boolean }) => {
  const colHelper = createColumnHelper<EquipoData>();

  return [
    colHelper.accessor("inventarioId", {
      header: "Inventario",
      cell: ({ getValue }) => {
        const id = getValue().toString().padStart(4, "0");
        return `${id}`;
      },
    }),
    colHelper.accessor("tipo.nombre", {
      header: "Tipo",
    }),
    colHelper.accessor("marca.nombre", {
      header: "Marca",
    }),
    colHelper.accessor("modelo", {
      header: "Modelo",
    }),
    colHelper.accessor("numeroSerie", {
      header: "Número de serie",
    }),
    colHelper.accessor("estado.nombre", {
      header: "Estado",
    }),
    ...(tienePrestar
      ? [
          colHelper.display({
            header: "Prestar / Devolver",
            cell: ({ row }) => {
              const { disponible, id } = row.original;

              return <PrestarDevolverEquipo disponible={disponible} id={id} />;
            },
            meta: {
              header: {
                hideSort: true,
                align: "center",
              },
            },
          }),
        ]
      : []),
  ] as ColumnDef<EquipoData>[];
};

export const getColumnsNames = () => {
  return ["Inventario", "Tipo", "Marca", "Modelo", "Número de serie", "Estado", "Estado préstamo"];
};
