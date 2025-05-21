import { HelperReserva } from "@/server/api/repositories/reservas/pantalla.repository";
import { getTimeISOString } from "@/shared/get-date";
import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BadgeDiscrecionalReserva } from "@/app/_components/badge-estatus-reserva";
import { materiaReservaLaboratorio } from "@/app/_components/reserva-cerrada-textos";

type ReservaPantallaData = RouterOutputs["reservas"]["pantalla"]["getAllActivas"][number];

export const getColumns = () => {
  const colHelper = createColumnHelper<ReservaPantallaData>();

  return [
    colHelper.accessor("turnoTexto", {
      header: "",
    }),
    colHelper.display({
      header: "Tipo",
      cell: ({ row }) => {
        const { tipo, esDiscrecional } = row.original;

        if (esDiscrecional) {
          return <BadgeDiscrecionalReserva esDiscrecional />;
        }

        if (tipo === HelperReserva.RESERVA) {
          return "Reserva de Laboratorio";
        }

        if (tipo === HelperReserva.PANTALLA) {
          return "Pantalla";
        }

        return "-";
      },
    }),
    colHelper.display({
      header: "Materia",
      cell: ({ row }) => {
        return materiaReservaLaboratorio({
          esDiscrecional: row.original.esDiscrecional,
          discrecionalMateria: row.original.discrecionalMateria,
          discrecionalTitulo: row.original.discrecionalTitulo,
          curso: {
            materia: {
              nombre: row.original.materia,
            },
          },
        });
      },
      meta: {
        header: {
          hideSort: true,
        },
      },
    }),
    colHelper.accessor("sede", {
      header: "Sede",
    }),
    colHelper.accessor("laboratorio", {
      header: "Laboratorio",
    }),
    colHelper.accessor("fechaHoraInicio", {
      header: "Hora de inicio",
      cell: ({ getValue }) => {
        const hora = getValue();

        return getTimeISOString(hora);
      },
    }),
    colHelper.accessor("fechaHoraFin", {
      header: "Hora de fin",
      cell: ({ getValue }) => {
        const hora = getValue();

        return getTimeISOString(hora);
      },
    }),
  ] as ColumnDef<ReservaPantallaData>[];
};

export const getColumnsNames = () => {
  return ["Docente", "Materia", "Laboratorio", "Hora de inicio"];
};
