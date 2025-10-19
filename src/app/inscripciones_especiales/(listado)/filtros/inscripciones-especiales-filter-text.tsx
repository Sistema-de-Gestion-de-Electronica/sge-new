"use client";

import React from "react";
import { Input } from "@/components/ui";
import { type z } from "zod";
import { useInscripcionesEspecialesQueryParam } from "../../_hooks/use-inscripciones-especiales-query-param";
import { type inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";

type InscripcionesEspecialesFilters = z.infer<typeof inputGetAllInscripcionesEspeciales>;

type Props = {
  filters: InscripcionesEspecialesFilters;
};

export const InscripcionesEspecialesFilterText = ({ filters }: Props) => {
  const { searchText, onSearchTextChange } = useInscripcionesEspecialesQueryParam(filters);

  return (
    <div className="w-full">
      <Input
        placeholder="Buscar por nombre, apellido o legajo"
        value={searchText || ""}
        onChange={(e) => onSearchTextChange(e.target.value)}
        className="h-10"
      />
    </div>
  );
};
