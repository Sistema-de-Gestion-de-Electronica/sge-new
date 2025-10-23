"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { type z } from "zod";
import { useVentanillaQueryParam } from "../../_hooks/use-ventanilla-query-param";
import { type inputGetAllConsultas } from "@/shared/filters/ventanilla-filter.schema";
import { ConsultaEstatus } from "../../_components/badge-estatus-consulta";

type VentanillaFilters = z.infer<typeof inputGetAllConsultas>;

type Props = {
  filters: VentanillaFilters;
};

const estadosDisponibles = [
  { value: "todos", label: "Todos los estados" },
  { value: ConsultaEstatus.NUEVA, label: "Nueva" },
  { value: ConsultaEstatus.RESPONDIDA, label: "Respondida" },
  { value: ConsultaEstatus.PENDIENTE, label: "Pendiente" },
];

export const VentanillaFilterEstado = ({ filters }: Props) => {
  const { estado, onEstadoChange } = useVentanillaQueryParam(filters);

  return (
    <div className="w-full">
      <Select value={estado || "todos"} onValueChange={onEstadoChange}>
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Filtrar por estado..." />
        </SelectTrigger>
        <SelectContent>
          {estadosDisponibles.map((estado) => (
            <SelectItem key={estado.value} value={estado.value}>
              {estado.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
