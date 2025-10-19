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

const casos = ["Ordenanza 1648", "Cambios de carrera", "Excepcion de correlativas"];

export const InscripcionesEspecialesFilterCaso = ({ filters }: Props) => {
  const { caso, onCasoChange } = useInscripcionesEspecialesQueryParam(filters);

  return (
    <div className="w-full">
      <Select value={caso || "todos"} onValueChange={onCasoChange}>
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Filtrar por caso" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos los casos</SelectItem>
          {casos.map((casoItem) => (
            <SelectItem key={casoItem} value={casoItem}>
              {casoItem}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
