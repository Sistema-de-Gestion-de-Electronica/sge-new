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
      header: "",
    }),
    colHelper.accessor("id", {
      header: "#",
    }),
    colHelper.accessor("fechaSolicitud", {
      header: "Fecha",
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
    ...(filterByUser
      ? []
      : [
          colHelper.display({
            header: "Solicitante",
            cell: ({ row }) => {
              return (
                <div className="max-w-xs">
                  <span className="text-sm">
                    {row.original.solicitante.apellido + " " + row.original.solicitante.nombre}
                  </span>
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
                  <span className="text-sm">{row.original.solicitante.legajo}</span>
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
      ? [
          colHelper.accessor("respuesta", {
            header: "Estado Respuesta",
            cell: ({ row }) => {
              const respuesta = row.original.respuesta;
              return <span className="truncate text-sm">{respuesta ? "Ver en detalles" : "Sin respuesta"}</span>;
            },
          }),
        ]
      : []),

    colHelper.accessor("estado", {
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.original.estado;
        return <BadgeEstatusInscripcionEspecial estatus={estado} />;
      },
    }),
  ] as ColumnDef<InscripcionesEspecialesData>[];

  const columnas = filterByUser ? columnasBasicas : [...columnasBasicas];
  return columnas;
};

export const getColumnasInscripcionesEspecialesNames = () => {
  return ["Caso", "Fecha Solicitud", "Estado", "Materias"];
};
