"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { type z } from "zod";
import { useInscripcionesEspecialesQueryParam } from "../../_hooks/use-inscripciones-especiales-query-param";
import { type inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";

type InscripcionesEspecialesFilters = z.infer<typeof inputGetAllInscripcionesEspeciales>;

type Props = {
  filters: InscripcionesEspecialesFilters;
};

const estados = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "ACEPTADA", label: "Aprobada" },
  { value: "ACEPTADA_CON_CONDICION", label: "Aprobada con condición" },
  { value: "RECHAZADA", label: "Rechazada" },
];

export const InscripcionesEspecialesFilterEstado = ({ filters }: Props) => {
  const { estado, onEstadoChange } = useInscripcionesEspecialesQueryParam(filters);

  return (
    <div className="w-full">
      <Select value={estado || "todos"} onValueChange={onEstadoChange}>
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos los estados</SelectItem>
          {estados.map((estadoItem) => (
            <SelectItem key={estadoItem.value} value={estadoItem.value}>
              {estadoItem.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
