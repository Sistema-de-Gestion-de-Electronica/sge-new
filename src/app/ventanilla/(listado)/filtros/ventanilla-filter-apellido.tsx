"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui";
import { type z } from "zod";
import { useVentanillaQueryParam } from "../../_hooks/use-ventanilla-query-param";
import { type inputGetAllConsultas } from "@/shared/filters/ventanilla-filter.schema";

type VentanillaFilters = z.infer<typeof inputGetAllConsultas>;

type Props = {
  filters: VentanillaFilters;
};

export const VentanillaFilterApellido = ({ filters }: Props) => {
  const { apellido, onApellidoChange } = useVentanillaQueryParam(filters);
  const [localValue, setLocalValue] = useState(apellido);

  useEffect(() => {
    setLocalValue(apellido);
  }, [apellido]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onApellidoChange(localValue);
    }
  };

  return (
    <div className="w-full">
      <Input
        placeholder="Filtrar por apellido..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-10"
      />
    </div>
  );
};
