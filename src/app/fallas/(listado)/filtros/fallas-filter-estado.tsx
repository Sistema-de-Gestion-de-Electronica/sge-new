"use client";

import React, { useMemo, useState } from "react";
import { Autocomplete, Select, SelectTrigger, SelectValue } from "@/components/ui";
import { api } from "@/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import { type z } from "zod";
import { useFallasQueryParam } from "../../_hooks/use-fallas-query-param";
import { type inputGetAllFallas } from "@/shared/filters/fallas-filter.schema";
import { estaDentroDe } from "@/shared/string-compare";

type FallasFilters = z.infer<typeof inputGetAllFallas>;

type Props = {
  filters: FallasFilters;
};

export const FallasFilterEstado = ({ filters }: Props) => {
  const { estado, onEstadoChange } = useFallasQueryParam(filters);

  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = api.fallas.getAllEstados.useQuery();

  const estados = useMemo(() => {
    if (!data) return [];

    return data
      .filter((estado) => estado?.nombre != null)
      .map((item, index) => {
        return {
          id: index,
          label: `${item.nombre}`,
          data: item.nombre,
        };
      })
      .filter((item) => !query || estaDentroDe(query, item.label));
  }, [data, query]);

  const currentEstado = useMemo(() => {
    if (!estados) return null;

    return estados.find((item) => item.data === estado);
  }, [estados, estado]);

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
              id="selectModelo"
              className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
            >
              <SelectValue placeholder="Error cargando modelos" />
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
        items={estados}
        noOptionsComponent={
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
            <span>No se encontraron estados</span>
          </div>
        }
        className={""}
        onQueryChange={setQuery}
        isLoading={isLoading}
        placeholder="Buscar por estado"
        clearable
        debounceTime={0}
        value={currentEstado}
        onChange={(value) => {
          onEstadoChange(value?.data ?? "");
          setQuery("");
        }}
      />
    </div>
  );
};
