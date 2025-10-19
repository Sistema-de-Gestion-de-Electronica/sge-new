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

const opcionesFueContactado = [
  { value: "todos", label: "Todos" },
  { value: "true", label: "Fue contactado" },
  { value: "false", label: "No fue contactado" },
];

export const InscripcionesEspecialesFilterFueContactado = ({ filters }: Props) => {
  const { fueContactado, onFueContactadoChange } = useInscripcionesEspecialesQueryParam(filters);

  return (
    <div className="w-full">
      <Select value={fueContactado || "todos"} onValueChange={onFueContactadoChange}>
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Filtrar por contacto" />
        </SelectTrigger>
        <SelectContent>
          {opcionesFueContactado.map((opcion) => (
            <SelectItem key={opcion.value} value={opcion.value}>
              {opcion.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
