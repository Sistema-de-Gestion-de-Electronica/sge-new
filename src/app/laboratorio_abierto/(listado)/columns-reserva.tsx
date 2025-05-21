import { api, type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DatoUsuarioReserva } from "@/app/_components/datos-usuario";
import { getFechaHumanoDDMMYYYY, getTimeISOString } from "@/shared/get-date";
import { BadgeEstatusReserva } from "@/app/_components/badge-estatus-reserva";
import { Loader2 } from "lucide-react";

type LaboratorioAbiertoReservaData =
  RouterOutputs["reservas"]["reservaLaboratorioAbierto"]["getAll"]["reservas"][number];

export const getColumnasReservasLaboratorioAbierto = ({ filterByUser }: { filterByUser?: boolean }) => {
  const colHelper = createColumnHelper<LaboratorioAbiertoReservaData>();

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
    ...(filterByUser
      ? []
      : [
          colHelper.display({
            header: "Solicitante",
            cell: ({ row }) => {
              return <DatoUsuarioReserva usuario={row.original.reserva.usuarioSolicito} />;
            },

            meta: {
              header: {
                hideSort: true,
              },
            },
          }),
        ]),
    colHelper.display({
      header: "Fecha",
      cell: ({ row }) => {
        const { reserva } = row.original;
        const fecha = getFechaHumanoDDMMYYYY(reserva.fechaHoraInicio);
        return `${fecha}`;
      },
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
    colHelper.accessor("concurrentes", {
      header: "Cant. Personas",
    }),
    colHelper.accessor("laboratorioAbiertoTipo", {
      header: "Tipo Laboratorio",
    }),
    colHelper.accessor("reserva.usuarioTutor.apellido", {
      header: "Tutor",
      cell: ({ row }) => {
        const { reserva } = row.original;
        const { usuarioTutor } = reserva;

        if (!usuarioTutor) {
          return <span className="text-center">No asignado</span>;
        }

        return <DatoUsuarioReserva usuario={usuarioTutor} />;
      },
    }),
    colHelper.accessor("especialidad", {
      header: "Especialidad",
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
  ] as ColumnDef<LaboratorioAbiertoReservaData>[];

  const columnas = filterByUser ? columnasBasicas : [...columnasBasicas];
  return columnas;
};

export const getColumnasResevaNames = () => {
  return [
    "#",
    "Solicitante",
    "Laboratorio",
    "Nombre Laboratorio",
    "Sede",
    "Fecha de solicitud",
    "Inicio de Reserva",
    "Fin de Reserva",
  ];
};
