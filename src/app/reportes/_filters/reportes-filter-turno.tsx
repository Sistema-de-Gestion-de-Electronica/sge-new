"use client";

import React, { useMemo, useState } from "react";
import { Autocomplete } from "@/components/ui";
import { type z } from "zod";
import { estaDentroDe } from "@/shared/string-compare";
import { useReportesQueryParam } from "../_hooks/use-reportes-query-param";
import type { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";

type ReportesFilters = z.infer<typeof inputGetAllLaboratorios>;

type Props = {
  filters: ReportesFilters;
};

const data = [
  { id: "MANANA", label: "Mañana" },
  { id: "TARDE", label: "Tarde" },
  { id: "NOCHE", label: "Noche" },
];

export const ReportesFilterTurno = ({ filters }: Props) => {
  const { turno, onTurnoChange } = useReportesQueryParam(filters);
  const [query, setQuery] = useState("");

  const turnos = useMemo(() => {
    return data.filter((item) => !query || estaDentroDe(query, item.label));
  }, [query]);

  const currentTurno = useMemo(() => {
    if (!turno) return null;
    return data.find((item) => String(item.id) === turno);
  }, [turno]);

  return (
    <div className="w-full">
      <Autocomplete
        async
        items={turnos}
        noOptionsComponent={
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
            <span>No se encontraron turnos</span>
          </div>
        }
        className={""}
        onQueryChange={setQuery}
        placeholder="Buscar por turno"
        clearable
        debounceTime={0}
        value={currentTurno}
        onChange={(value) => {
          onTurnoChange(value?.id as "MANANA" | "TARDE" | "NOCHE");
          setQuery("");
        }}
      />
    </div>
  );
};
