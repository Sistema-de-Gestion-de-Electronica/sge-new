import { DatoUsuarioReserva } from "@/app/_components/datos-usuario";
import { Badge } from "@/components/ui/badge";
import { getFechaHumanoDDMMYYYY, getTimeISOString } from "@/shared/get-date";
import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

type Reserva = RouterOutputs["reservas"]["reservasLaboratorio"]["getAll"][number];

export const getColumnasReservas = () => {
  const colHelper = createColumnHelper<Reserva>();

  return [
    colHelper.accessor("turnoTexto", {
      header: "",
    }),
    colHelper.accessor("id", {
      header: "Reserva #",
    }),
    colHelper.display({
      header: "Fecha",
      cell: ({ row }) => <p className="mr-2">{getFechaHumanoDDMMYYYY(row.original.fechaHoraInicio)}</p>,
    }),
    colHelper.accessor("fechaHoraInicio", {
      header: "Hora inicio",
      cell: ({ row }) => getTimeISOString(row.original.fechaHoraInicio),
    }),
    colHelper.accessor("fechaHoraFin", {
      header: "Hora fin",
      cell: ({ row }) => getTimeISOString(row.original.fechaHoraFin),
    }),
    colHelper.accessor("tipo", {
      header: "Tipo",
      cell: ({ row }) => (
        <Badge className="mr-2" color="info">
          {row.original.tipo}
        </Badge>
      ),
    }),
    colHelper.accessor("laboratorio", {
      header: "Laboratorio",
      cell: ({ row }) => <p className="mr-2">{row.original.laboratorio}</p>,
    }),
    colHelper.accessor("sede", {
      header: "Sede",
      cell: ({ row }) => <p className="mr-2">{row.original.sede}</p>,
    }),
    colHelper.accessor("division", {
      header: "Division",
      cell: ({ row }) => <p className="mr-2">{row.original.division ?? "N / A"}</p>,
    }),
    colHelper.accessor("materia", {
      header: "Materia",
      cell: ({ row }) => {
        const { esDiscrecional, discrecionalMateria, discrecionalTitulo } = row.original;
        let { materia } = row.original;

        if (esDiscrecional && discrecionalMateria) {
          if (discrecionalMateria.nombre) {
            materia = discrecionalMateria.nombre;
          } else if (discrecionalTitulo) {
            materia = discrecionalTitulo;
          }
        }

        return <p className="mr-2">{materia ?? "N / A"}</p>;
      },
    }),
    colHelper.display({
      header: "Docente",
      cell: ({ row }) => {
        const { discrecionalDocente, profesor } = row.original;

        if (!discrecionalDocente && !profesor) {
          return <p className="mr-2">N / A</p>;
        }

        return (
          <div className="mr-2">
            <DatoUsuarioReserva usuario={discrecionalDocente ?? profesor} />
          </div>
        );
      },
      meta: {
        header: {
          hideSort: true,
        },
      },
    }),
    colHelper.accessor("equipos", {
      header: "Equipos",
      cell: ({ row }) =>
        row.original.equipos ? row.original.equipos.map((equipo) => <div key={equipo}>{equipo}</div>) : null,
    }),
    colHelper.accessor("descripcion", {
      header: "Observaciones",
    }),
  ] as ColumnDef<Reserva>[];
};
