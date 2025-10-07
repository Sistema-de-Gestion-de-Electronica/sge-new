import { api, type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BadgeEstatusFallas, type FallasEstatus } from "@/app/fallas/_components/badge-estatus-fallas";

type HistorialFallasData = RouterOutputs["fallas"]["getHistorialFallasPorId"][number];

export const getColumnasHistorialFallas = () => {
  const colHelper = createColumnHelper<HistorialFallasData>();

  const columnasBasicas = [
    colHelper.accessor("id", {
      header: "#",
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
    colHelper.accessor("fechaCambioEstado", {
        header: "Fecha Cambio Estado",
        cell: ({ row }) => row.original.fechaCambioEstado ?? "-",
    }),
    colHelper.accessor("observaciones", {
        header: "Observaciones",
        cell: ({ row }) => row.original.observaciones ?? "-",
    }),
  ] as ColumnDef<HistorialFallasData>[];

  const columnas = columnasBasicas;
  return columnas;
};

export const getColumnasHistorialFallasNames = () => {
  return [
    "Fallas",
    "Descripción Falla",
    "Reportado Por",
    "Fecha Reporte",
    "Asignado A",
    "Estado",
    "Fecha Cambio Estado",
    "Observaciones",
  ];
};
