/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AnnoTexto } from "@/app/_components/anno-texto";
import { DatoUsuarioReserva } from "@/app/_components/datos-usuario";
import { HoraDia } from "@/app/_components/hora-dia-curso";
import { CursoTurno } from "@/app/_components/turno-text";
import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

type CursosData = RouterOutputs["cursos"]["getAll"]["cursos"][number];

const dayMapper = {
  LUNES: "Lunes",
  MARTES: "Martes",
  MIERCOLES: "Miércoles",
  JUEVES: "Jueves",
  VIERNES: "Viernes",
  SABADO: "Sábado",
};

export const getColumns = () => {
  const colHelper = createColumnHelper<CursosData>();

  return [
    colHelper.accessor("anioDeCarrera", {
      header: "",
      cell: ({ row }) => {
        const { anioDeCarrera } = row.original;

        return <AnnoTexto anio={anioDeCarrera} />;
      },
    }),
    colHelper.accessor("materia.nombre", {
      id: "materia",
      header: "",
      meta: {
        header: {
          hideSort: true,
        },
      },
    }),
    colHelper.accessor("division.nombre", {
      header: "División",
    }),
    // colHelper.accessor("ac", {
    //   header: "Duración",
    //   cell: (info) => {
    //     const duracion = info.row.original.ac;

    //     if (duracion === "A") return "Anual";
    //     if (duracion === "C") return "Cuatrimestral";
    //     return "-";
    //   },
    // }),
    colHelper.accessor("turno", {
      header: "Turno",
      cell: (info) => {
        const turno = info.row.original.turno;

        return <CursoTurno turno={turno} />;
      },
    }),
    colHelper.accessor("sede.nombre", {
      header: "Sede",
    }),
    ...Object.entries(dayMapper).map(([key, value]) =>
      colHelper.display({
        header: value,
        meta: {
          header: {
            hideSort: true,
          },
        },
        cell: (info) => {
          return <HoraDia {...info.row.original} diaDeHoy={key} />;
        },
      }),
    ),
    colHelper.display({
      header: "Profesor",
      cell: (info) => {
        const profesor = info.row.original.profesor;

        if (!profesor) return <span className="hidden">Sin profesor</span>;

        return <DatoUsuarioReserva usuario={profesor} key={profesor.id} />;
      },
      meta: {
        header: {
          hideSort: true,
        },
      },
    }),
    colHelper.display({
      header: "Ayudante/s",
      cell: (info) => {
        const ayudantes = info.row.original.ayudantes;

        if (!ayudantes.length) return <span className="hidden">Sin ayudantes</span>;

        return (
          <div className="flex flex-col overflow-hidden">
            {ayudantes.map((ayudante) => (
              <DatoUsuarioReserva usuario={ayudante.usuario} key={ayudante.userId} />
            ))}
          </div>
        );
      },
      meta: {
        header: {
          hideSort: true,
        },
      },
    }),
  ] as ColumnDef<CursosData>[];
};

export const getColumnsNames = () => {
  return [
    "Division",
    "Duración",
    "Turno",
    "Sede",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Profesor",
    "Ayudante/s",
  ];
};
