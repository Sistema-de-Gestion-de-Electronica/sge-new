import { api, type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BadgeEstatusFallas, type FallasEstatus } from "@/app/fallas/_components/badge-estatus-fallas";

type FallasData = RouterOutputs["fallas"]["getAllFallas"]["fallas"][number];

export const getColumnasFallas = ({ filterByUser }: { filterByUser?: boolean }) => {
  const colHelper = createColumnHelper<FallasData>();

  const columnasBasicas = [
    colHelper.accessor("id", {
      header: "#",
    }),
    colHelper.accessor("laboratorio", {
      header: "Laboratorio",
    }),
    colHelper.accessor("equipo", {
      header: "Equipo",
    }),
    colHelper.accessor("marca", {
      header: "Marca",
      cell: ({ row }) => row.original.marca ?? "-",
    }),
    colHelper.accessor("modelo", {
      header: "Modelo",
      cell: ({ row }) => row.original.modelo ?? "-",
    }),
    colHelper.accessor("fallas", {
      header: "Fallas",
      cell: ({ row }) => row.original.fallas?.join(", ") ?? "-",
    }),
    colHelper.accessor("descripcionFalla", {
      header: "Descripción Falla",
      cell: ({ row }) => row.original.descripcionFalla ?? "-",
    }),
    colHelper.accessor("reportadoPor", {
      header: "Reportado Por",
      cell: ({ row }) => {
        return (
          <div className="max-w-xs">
            <span className="text-sm">
              {row.original.reportadoPor.apellido + " " + row.original.reportadoPor.nombre}
            </span>
          </div>
        );
      },
    }),
    colHelper.accessor("fechaReporte", {
      header: "Fecha Reporte",
    }),
    colHelper.accessor("asignadoA", {
      header: "Asignado A",
      cell: ({ row }) => {
        return (
          <div className="max-w-xs">
            <span className="text-sm">{row.original.asignadoA.apellido + " " + row.original.asignadoA.nombre}</span>
          </div>
        );
      },
    }),
    colHelper.accessor("estado", {
      header: "Estado",
      cell: ({ row }) => {
        const estado = (row.original.estado ?? "") as FallasEstatus | "";
        return <BadgeEstatusFallas estatus={estado} />;
      },
    }),
  ] as ColumnDef<FallasData>[];

  const columnas = filterByUser ? columnasBasicas : [...columnasBasicas];
  return columnas;
};

export const getColumnasFallasNames = () => {
  return [
    "Laboratorio",
    "Equipo",
    "Marca",
    "Modelo",
    "Fallas",
    "Descripción Falla",
    "Reportado Por",
    "Fecha Reporte",
    "Asignado A",
    "Estado",
  ];
};
