import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BadgeEstatusFallas, type FallasEstatus } from "@/app/fallas/_components/badge-estatus-fallas";

type HistorialFallasData = RouterOutputs["fallas"]["getHistorialPorFallaId"][number];

export const getColumnasHistorialFallas = () => {
  const colHelper = createColumnHelper<HistorialFallasData>();

  const columnasBasicas = [
    colHelper.accessor("id", {
      header: "#",
    }),
    colHelper.accessor("fallas", {
      header: "Fallas",
      cell: ({ row }) => {
        const fallas = row.original.fallas;
        return fallas && fallas.length > 0 ? fallas.join(", ") : "-";
      },
    }),
    colHelper.accessor("descripcionEquipo", {
      header: "Descripción Equipo",
      cell: ({ row }) => row.original.descripcionEquipo ?? "-",
    }),
    colHelper.accessor("reportadoPor", {
      header: "Reportado Por",
      cell: ({ row }) => {
        const reportadoPor = row.original.reportadoPor;
        if (!reportadoPor || reportadoPor.nombre === "-") return "-";
        return (
          <div className="max-w-xs">
            <span className="text-sm">
              {reportadoPor.apellido} {reportadoPor.nombre}
            </span>
          </div>
        );
      },
    }),
    colHelper.accessor("asignadoA", {
      header: "Asignado A",
      cell: ({ row }) => {
        const asignadoA = row.original.asignadoA;
        if (!asignadoA || asignadoA.nombre === "-") return "-";
        return (
          <div className="max-w-xs">
            <span className="text-sm">
              {asignadoA.apellido} {asignadoA.nombre}
            </span>
          </div>
        );
      },
    }),
    colHelper.accessor("fechaReporte", {
      header: "Fecha Reporte",
      cell: ({ row }) => row.original.fechaReporte ?? "-",
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
    colHelper.accessor("descripcionFalla", {
      header: "Observaciones",
      cell: ({ row }) => row.original.descripcionFalla ?? "-",
    }),
  ] as ColumnDef<HistorialFallasData>[];

  const columnas = columnasBasicas;
  return columnas;
};

export const getColumnasHistorialFallasNames = () => {
  return [
    "Fallas",
    "Descripción Equipo",
    "Reportado Por",
    "Asignado A",
    "Fecha Reporte",
    "Estado",
    "Fecha Cambio Estado",
    "Observaciones",
  ];
};
