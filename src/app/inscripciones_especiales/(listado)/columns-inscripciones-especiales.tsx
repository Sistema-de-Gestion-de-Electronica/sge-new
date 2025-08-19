import { api, type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BadgeEstatusInscripcionEspecial } from "@/app/_components/badge-estatus-inscripcion-especial";

import { type InscripcionesEspecialesData } from "../_components/mock-mis-inscripciones"; //TODO eliminar cuando funcione el back

// type InscripcionesEspecialesData =
//   RouterOutputs["inscripcionesEspeciales"]["solicitudes"]["getAll"]["solicitudes"][number];

export const getColumnasInscripcionesEspeciales = ({ filterByUser }: { filterByUser?: boolean }) => {
  const colHelper = createColumnHelper<InscripcionesEspecialesData>();

  const columnasBasicas = [
    colHelper.accessor("caso", {
      header: "Caso",
    }),
    colHelper.accessor("id", {
      header: "#",
    }),
    ...(filterByUser
      ? []
      : [
          colHelper.display({
            header: "Solicitante",
            cell: ({ row }) => {
              return (
                <div className="max-w-xs">
                  <span className="text-sm">{row.original.solicitante}</span>
                </div>
              );
            },
            meta: {
              header: {
                hideSort: true,
              },
            },
          }),
        ]),
    ...(filterByUser
      ? []
      : [
          colHelper.display({
            header: "Legajo",
            cell: ({ row }) => {
              return (
                <div className="max-w-xs">
                  <span className="text-sm">{row.original.legajo}</span>
                </div>
              );
            },
            meta: {
              header: {
                hideSort: true,
              },
            },
          }),
        ]),
    colHelper.accessor("fechaSolicitud", {
      header: "Fecha",
    }),
    colHelper.accessor("estado", {
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.original.estado;
        return <BadgeEstatusInscripcionEspecial estatus={estado} />;
      },
    }),
    colHelper.accessor("materias", {
      header: "Materias",
      cell: ({ row }) => {
        const materias = row.original.materias;
        if (Array.isArray(materias)) {
          return (
            <div className="max-w-xs">
              <span className="text-sm">{materias.join(", ")}</span>
            </div>
          );
        }
        return materias;
      },
    }),
    colHelper.display({
      header: "Turnos",
      cell: ({ row }) => {
        const { turnoAlternativa1, turnoAlternativa2 } = row.original;
        return (
          <div className="space-y-1 text-xs">
            {turnoAlternativa1 && (
              <div className="rounded bg-blue-50 p-1 text-blue-700">
                <strong>Alt 1:</strong> {turnoAlternativa1}
              </div>
            )}
            {turnoAlternativa2 && (
              <div className="rounded bg-green-50 p-1 text-green-700">
                <strong>Alt 2:</strong> {turnoAlternativa2}
              </div>
            )}
          </div>
        );
      },
    }),
    colHelper.accessor("justificacion", {
      header: "Justificación",
      cell: ({ row }) => {
        const justificacion = row.original.justificacion;
        return (
          <div className="max-w-xs">
            <span className="truncate text-sm">
              {justificacion.length > 50 ? `${justificacion.substring(0, 50)}...` : justificacion}
            </span>
          </div>
        );
      },
    }),
  ] as ColumnDef<InscripcionesEspecialesData>[];

  const columnas = filterByUser ? columnasBasicas : [...columnasBasicas];
  return columnas;
};

export const getColumnasInscripcionesEspecialesNames = () => {
  return ["Caso", "Fecha Solicitud", "Estado", "Materias"];
};
