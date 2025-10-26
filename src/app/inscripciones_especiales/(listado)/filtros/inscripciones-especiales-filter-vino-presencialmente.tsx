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

const opcionesVinoPresencialmente = [
  { value: "todos", label: "Todos" },
  { value: "true", label: "Sí vino presencialmente" },
  { value: "false", label: "No vino presencialmente" },
];

export const InscripcionesEspecialesFilterVinoPresencialmente = ({ filters }: Props) => {
  const { vinoPresencialmente, onVinoPresencialmenteChange } = useInscripcionesEspecialesQueryParam(filters);

  return (
    <div className="w-full">
      <Select value={vinoPresencialmente || "todos"} onValueChange={onVinoPresencialmenteChange}>
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Filtrar por asistencia" />
        </SelectTrigger>
        <SelectContent>
          {opcionesVinoPresencialmente.map((opcion) => (
            <SelectItem key={opcion.value} value={opcion.value}>
              {opcion.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
