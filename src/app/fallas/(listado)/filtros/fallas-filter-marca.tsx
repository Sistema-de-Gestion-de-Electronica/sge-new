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

export const FallasFilterMarca = ({ filters }: Props) => {
  const { marca, onMarcaChange } = useFallasQueryParam(filters);

  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = api.equipos.getAllMarcas.useQuery();

  const marcas = useMemo(() => {
    if (!data) return [];

    return data
      .map((item) => {
        const { id, nombre } = item;
        return {
          id: id,
          label: `${nombre}`,
          data: item,
        };
      })
      .filter((item) => !query || estaDentroDe(query, item.label));
  }, [data, query]);

  const currentMarca = useMemo(() => {
    if (!marcas) return null;

    return marcas.find((item) => String(item.id) === marca);
  }, [marcas, marca]);

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
              id="selectMarca"
              className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
            >
              <SelectValue placeholder="Error cargando marcas" />
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
        items={marcas}
        noOptionsComponent={
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-sm">
            <span>No se encontraron marcas</span>
          </div>
        }
        className={""}
        onQueryChange={setQuery}
        isLoading={isLoading}
        placeholder="Buscar por marca"
        clearable
        debounceTime={0}
        value={currentMarca}
        onChange={(value) => {
          onMarcaChange(value?.id ? String(value.id) : "");
          setQuery("");
        }}
      />
    </div>
  );
};
