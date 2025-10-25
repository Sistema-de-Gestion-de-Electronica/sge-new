import { api, type RouterOutputs } from "@/trpc/react";
import { type ReactNode } from "react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { BadgeEstatusConsulta, type ConsultaEstatus } from "@/app/ventanilla/_components/badge-estatus-consulta";

type ConsultasData = RouterOutputs["ventanilla"]["getAllConsultas"]["consultas"][number];

export const getColumnasConsultas = ({ filterByUser }: { filterByUser?: boolean }) => {
  const colHelper = createColumnHelper<ConsultasData>();

  const H = (label: ReactNode) => <div className="px-3 text-left font-medium">{label}</div>;
  const C = (content: ReactNode) => <div className="px-3 ">{content}</div>;

  const columnasBasicas = [
    colHelper.accessor("id", {
      header: () => H("#"),
      cell: ({ getValue }) => C(String(getValue())),
    }),
    colHelper.accessor("nombre", {
      header: () => H("Nombre"),
      cell: ({ getValue }) => C(getValue()),
    }),
    colHelper.accessor("apellido", {
      header: () => H("Apellido"),
      cell: ({ getValue }) => C(getValue()),
    }),
    colHelper.accessor("legajo", {
      header: () => H("Legajo"),
      cell: ({ getValue }) => C(getValue()),
    }),
    colHelper.accessor("email", {
      header: () => H("Email"),
      cell: ({ getValue }) => C(getValue()),
    }),
    colHelper.accessor("asunto", {
      header: () => H("Asunto"),
      cell: ({ getValue }) => C(getValue()),
    }),
    colHelper.accessor("fechaConsulta", {
      header: () => H("Fecha Consulta"),
      cell: ({ getValue }) => C(String(getValue() ?? "")),
    }),
    colHelper.accessor("estado", {
      header: () => H("Estado"),
      cell: ({ row }) => C(<BadgeEstatusConsulta estatus={(row.original.estado ?? "") as ConsultaEstatus | ""} />),
    }),
  ] as ColumnDef<ConsultasData>[];

  const columnas = filterByUser ? columnasBasicas : [...columnasBasicas];
  return columnas;
};

export const getColumnasConsultasNames = () => {
  return ["Nombre", "Apellido", "Legajo", "Email", "Asunto", "Fecha Consulta", "Estado"];
};
