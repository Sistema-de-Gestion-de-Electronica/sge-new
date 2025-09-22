import { api, type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  BadgeEstatusInscripcionEspecial,
  type InscripcionEspecialEstatus,
} from "@/app/_components/badge-estatus-inscripcion-especial";

type InscripcionesEspecialesData =
  RouterOutputs["inscripcionesEspeciales"]["getAllInscripcionesEspeciales"]["solicitudes"][number];

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
      ? []
      : [
          colHelper.display({
            header: "Contactado",
            cell: ({ row }) => {
              return row.original.fueContactado ? (
                <div className="max-w-xs">
                  <div className="font-semibold border-t bg-green-100 p-2 text-center">✔</div>
                </div>
              ) : (
                <div className="max-w-xs">
                  <div className="border-t bg-red-100 p-2 text-center font-semibold">x</div>
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
            header: "Asistió",
            cell: ({ row }) => {
              return row.original.vinoPresencialmente ? (
                <div className="max-w-xs">
                  <div className="font-semibold border-t bg-green-100 p-2 text-center">✔</div>
                </div>
              ) : (
                <div className="max-w-xs">
                  <div className="border-t bg-red-100 p-2 text-center font-semibold">x</div>
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
        const estado = (row.original.estado ?? "") as InscripcionEspecialEstatus | "";
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
