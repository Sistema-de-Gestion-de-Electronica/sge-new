import { api, type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { esFechaPasada, getTimeISOString } from "@/shared/get-date";
import { BadgeDiscrecionalReserva, BadgeEstatusReserva } from "@/app/_components/badge-estatus-reserva";
import { Loader2 } from "lucide-react";
import { DatoUsuarioReserva } from "@/app/_components/datos-usuario";
import { materiaReservaLaboratorio } from "@/app/_components/reserva-cerrada-textos";

type LaboratorioCerradoReservaData =
  RouterOutputs["reservas"]["reservarLaboratorioCerrado"]["getAll"]["reservas"][number];

export const getColumnasReservasLaboratorioCerrado = ({ filterByUser }: { filterByUser?: boolean }) => {
  const colHelper = createColumnHelper<LaboratorioCerradoReservaData>();

  const columnasBasicas = [
    colHelper.accessor("fechaTexto", {
      header: "",
    }),
    colHelper.accessor("turnoTexto", {
      header: "",
    }),
    colHelper.accessor("reserva.id", {
      header: "#",
    }),
    colHelper.accessor("reserva.fechaHoraInicio", {
      header: "Hora Inicio",
      cell: ({ row }) => {
        const { reserva } = row.original;

        const fecha = getTimeISOString(reserva.fechaHoraInicio);

        return fecha;
      },
      meta: {
        cell: {
          align: "center",
        },
      },
    }),
    colHelper.accessor("reserva.fechaHoraFin", {
      header: "Hora Fin",
      cell: ({ row }) => {
        const { reserva } = row.original;

        const fecha = getTimeISOString(reserva.fechaHoraFin);

        return fecha;
      },
      meta: {
        cell: {
          align: "center",
        },
      },
    }),
    colHelper.accessor("curso.division.nombre", {
      header: "Division",
      cell: ({ row }) => {
        const { esDiscrecional } = row.original;

        if (esDiscrecional) {
          return <BadgeDiscrecionalReserva esDiscrecional />;
        }

        return row.original?.curso?.division.nombre ?? "-";
      },
    }),
    colHelper.accessor("curso.materia.nombre", {
      header: "Materia",
      cell: ({ row }) => {
        return materiaReservaLaboratorio({
          esDiscrecional: row.original.esDiscrecional,
          discrecionalMateria: row.original.discrecionalMateria,
          discrecionalTitulo: row.original.discrecionalTitulo,
          curso: row.original.curso,
        });
      },
    }),
    colHelper.accessor("curso.sede.nombre", {
      header: "Sede",
      cell: ({ row }) => {
        return row.original.sede.nombre;
      },
    }),
    colHelper.display({
      header: "Docente",
      cell: ({ row }) => {
        const { esDiscrecional, curso, discrecionalDocente } = row.original;
        if (esDiscrecional) {
          if (discrecionalDocente) {
            return <DatoUsuarioReserva usuario={discrecionalDocente} />;
          }

          return "-";
        }

        const profesor = curso?.profesor;
        if (!profesor) {
          return "-";
        }

        return <DatoUsuarioReserva usuario={profesor} />;
      },
      meta: {
        header: {
          hideSort: true,
        },
      },
    }),
    colHelper.accessor("laboratorio.nombre", {
      header: "Laboratorio",
      cell: ({ row }) => {
        const { laboratorio, reserva } = row.original;
        const { estatus } = reserva;

        if (estatus === "CANCELADA") {
          return <span className="text-center">Cancelada</span>;
        }
        if (estatus === "RECHAZADA") {
          return <span className="text-center">Rechazada</span>;
        }

        // TODO @Santiago: No me parece correcto mostrar un estado incorrecto. Capaz sería pendiente y vencida o algo similar a charlar
        if (estatus === "PENDIENTE" && esFechaPasada(reserva.fechaHoraFin)) {
          return <span className="text-center">Rechazada</span>;
        }
        if (!laboratorio) {
          return <span className="text-center">No asignado</span>;
        }

        return laboratorio.nombre;
      },
    }),
    colHelper.display({
      header: "Reservas no asistidas",
      cell: (info) => {
        const { data: reservasQueNoAsistio = 0, isLoading } = api.admin.usuarios.reservasQueNoAsistioEsteAnno.useQuery(
          { userId: info.row.original.reserva.usuarioSolicito.id },
          { refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false },
        );

        if (isLoading) return <Loader2 className={"size-4 animate-spin"} />;

        return reservasQueNoAsistio;
      },
      meta: {
        header: {
          hideSort: true,
        },
      },
    }),
    colHelper.accessor("reserva.estatus", {
      header: "Estado",
      cell: ({ row }) => {
        const { estatus } = row.original.reserva;

        return <BadgeEstatusReserva estatus={estatus} />;
      },
    }),
  ] as ColumnDef<LaboratorioCerradoReservaData>[];

  const columnas = filterByUser ? columnasBasicas : [...columnasBasicas];

  return columnas;
};

export const getColumnasResevaNames = () => {
  return [
    "#",
    "Laboratorio",
    "Nombre Laboratorio",
    "Sede",
    "Fecha de solicitud",
    "Inicio de Reserva",
    "Fin de Reserva",
    "Solicitado por",
  ];
};
