import { api, type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BadgeEstatusConsulta, type ConsultaEstatus } from "@/app/ventanilla/_components/badge-estatus-consulta";

type ConsultasData = RouterOutputs["ventanilla"]["getAllConsultas"]["consultas"][number];

export const getColumnasConsultas = ({ filterByUser }: { filterByUser?: boolean }) => {
  const colHelper = createColumnHelper<ConsultasData>();

  const columnasBasicas = [
    colHelper.accessor("id", {
      header: "#",
    }),
    colHelper.accessor("nombre", {
      header: "Nombre",
    }),
    colHelper.accessor("apellido", {
      header: "Apellido",
    }),
    colHelper.accessor("legajo", {
      header: "Legajo",
    }),
    colHelper.accessor("email", {
      header: "Email",
    }),
    colHelper.accessor("asunto", {
      header: "Asunto",
      cell: ({ row }) => {
        const asunto = row.original.asunto ?? "-";
        if (asunto === "-") return "-";
        return asunto.length > 50 ? `${asunto.substring(0, 50)}...` : asunto;
      },
    }),
    colHelper.accessor("fechaConsulta", {
      header: "Fecha Consulta",
    }),
    colHelper.accessor("estado", {
      header: "Estado",
      cell: ({ row }) => {
        const estado = (row.original.estado ?? "") as ConsultaEstatus | "";
        return <BadgeEstatusConsulta estatus={estado} />;
      },
    }),
  ] as ColumnDef<ConsultasData>[];

  const columnas = filterByUser ? columnasBasicas : [...columnasBasicas];
  return columnas;
};

export const getColumnasConsultasNames = () => {
  return ["Nombre", "Apellido", "Legajo", "Email", "Asunto", "Fecha Consulta", "Estado"];
};
