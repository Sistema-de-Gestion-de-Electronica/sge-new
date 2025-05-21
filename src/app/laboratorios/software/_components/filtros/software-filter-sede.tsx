"use client";

import React, { useMemo, useState } from "react";
import { Autocomplete, Select, SelectTrigger, SelectValue } from "@/components/ui";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import { type z } from "zod";
import { estaDentroDe } from "@/shared/string-compare";
import { useSoftwareQueryParam } from "@/app/laboratorios/_hooks/use-software-query-param";
import { type inputGetSoftwareFilter } from "@/shared/filters/laboratorio-filter.schema";

type ReportesFilters = z.infer<typeof inputGetSoftwareFilter>;

type Props = {
  filters: ReportesFilters;
};

export const SoftwareFilterSede = ({ filters }: Props) => {
  const { sedeId, onSedeChange } = useSoftwareQueryParam(filters);
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = api.admin.laboratorios.getAllSedesConLaboratorios.useQuery();

  const sedes = useMemo(() => {
    if (!data) return [];

    return data
      .map((item) => {
        const { id, nombre } = item;
        return {
          id: id,
          label: nombre,
          data: item,
        };
      })
      .filter((item) => !query || estaDentroDe(query, item.label));
  }, [data, query]);

  const currentSede = useMemo(() => {
    if (!sedes) return null;
    return sedes.find((item) => String(item.id) === sedeId);
  }, [sedes, sedeId]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex flex-row items-center space-x-2">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full">
        <Select>
          <div className="flex flex-row items-center space-x-2">
            <SelectTrigger
              disabled
              id="selectSede"
              className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
            >
              <SelectValue placeholder="Error cargando sedes" />
            </SelectTrigger>
          </div>
        </Select>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Autocomplete
        async
        items={sedes}
        noOptionsComponent={
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
            <span>No se encontraron sedes</span>
          </div>
        }
        className={""}
        onQueryChange={setQuery}
        isLoading={isLoading}
        placeholder="Buscar por sede"
        clearable
        debounceTime={0}
        value={currentSede}
        onChange={(value) => {
          onSedeChange(value?.id ? String(value.id) : "");
          setQuery("");
        }}
      />
    </div>
  );
};
