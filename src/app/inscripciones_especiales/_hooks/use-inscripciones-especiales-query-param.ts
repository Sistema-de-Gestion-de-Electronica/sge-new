"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";
import { type inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { type PaginationState, type SortingState } from "@tanstack/react-table";

type InscripcionesEspecialesFilters = z.infer<typeof inputGetAllInscripcionesEspeciales>;

const createQueryString = (filters: InscripcionesEspecialesFilters): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  return params.toString();
};

const changeSorting = (
  filters: InscripcionesEspecialesFilters,
  sorting: SortingState,
): InscripcionesEspecialesFilters => {
  const newFilters: InscripcionesEspecialesFilters = {
    ...filters,
    orderBy: sorting[0]?.id || undefined,
    orderDirection: sorting[0]?.desc ? "desc" : "asc",
  };

  return newFilters;
};

const changePagination = (
  filters: InscripcionesEspecialesFilters,
  newPagination: PaginationState,
): InscripcionesEspecialesFilters => {
  const newFilters: InscripcionesEspecialesFilters = {
    ...filters,
    pageIndex: newPagination.pageIndex,
    pageSize: newPagination.pageSize,
  };

  return newFilters;
};

const changeSearchText = (
  filters: InscripcionesEspecialesFilters,
  searchText: string,
): InscripcionesEspecialesFilters => {
  const newFilters: InscripcionesEspecialesFilters = {
    ...filters,
    searchText: searchText || undefined,
    pageIndex: 0,
  };

  return newFilters;
};

const changeCaso = (filters: InscripcionesEspecialesFilters, caso: string): InscripcionesEspecialesFilters => {
  const newFilters: InscripcionesEspecialesFilters = {
    ...filters,
    caso: caso === "todos" ? undefined : caso,
    pageIndex: 0,
  };

  return newFilters;
};

const changeEstado = (filters: InscripcionesEspecialesFilters, estado: string): InscripcionesEspecialesFilters => {
  const newFilters: InscripcionesEspecialesFilters = {
    ...filters,
    estado: estado === "todos" ? undefined : estado,
    pageIndex: 0,
  };

  return newFilters;
};

const changeVinoPresencialmente = (
  filters: InscripcionesEspecialesFilters,
  vinoPresencialmente: string,
): InscripcionesEspecialesFilters => {
  const newFilters: InscripcionesEspecialesFilters = {
    ...filters,
    vinoPresencialmente:
      vinoPresencialmente === "todos"
        ? undefined
        : vinoPresencialmente === "true" || vinoPresencialmente === "false"
          ? (vinoPresencialmente as "true" | "false")
          : undefined,
    pageIndex: 0,
  };

  return newFilters;
};

const changeFueContactado = (
  filters: InscripcionesEspecialesFilters,
  fueContactado: string,
): InscripcionesEspecialesFilters => {
  const newFilters: InscripcionesEspecialesFilters = {
    ...filters,
    fueContactado:
      fueContactado === "todos"
        ? undefined
        : fueContactado === "true" || fueContactado === "false"
          ? (fueContactado as "true" | "false")
          : undefined,
    pageIndex: 0,
  };

  return newFilters;
};

const getPagination = (filters: InscripcionesEspecialesFilters): PaginationState => {
  return {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? 10,
  };
};

const getSorting = (filters: InscripcionesEspecialesFilters): SortingState => {
  const orderBy = filters.orderBy;
  const orderDirection = filters.orderDirection;

  if (!orderBy) return [];

  return [{ id: orderBy, desc: orderDirection === "desc" }];
};

export const useInscripcionesEspecialesQueryParam = (filters: InscripcionesEspecialesFilters) => {
  const pathname = usePathname();
  const router = useRouter();

  const sorting = getSorting(filters);
  const pagination = getPagination(filters);
  const searchText = filters.searchText;
  const caso = filters.caso;
  const estado = filters.estado;
  const vinoPresencialmente = filters.vinoPresencialmente;
  const fueContactado = filters.fueContactado;

  const changeQueryParams = useCallback(
    (filters: InscripcionesEspecialesFilters) => {
      router.push(pathname + "?" + createQueryString(filters));
    },
    [pathname, router],
  );

  const onSortingChange = useCallback(
    (sorting: SortingState) => {
      const newFilters = changeSorting(filters, sorting);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onPaginationChange = useCallback(
    (pagination: PaginationState) => {
      const newFilters = changePagination(filters, pagination);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onSearchTextChange = useCallback(
    (searchText: string) => {
      const newFilters = changeSearchText(filters, searchText);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onCasoChange = useCallback(
    (caso: string) => {
      const newFilters = changeCaso(filters, caso);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onEstadoChange = useCallback(
    (estado: string) => {
      const newFilters = changeEstado(filters, estado);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onVinoPresencialmenteChange = useCallback(
    (vinoPresencialmente: string) => {
      const newFilters = changeVinoPresencialmente(filters, vinoPresencialmente);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onFueContactadoChange = useCallback(
    (fueContactado: string) => {
      const newFilters = changeFueContactado(filters, fueContactado);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  return {
    pagination,
    sorting,
    searchText,
    caso,
    estado,
    vinoPresencialmente,
    fueContactado,
    onSortingChange,
    onPaginationChange,
    onSearchTextChange,
    onCasoChange,
    onEstadoChange,
    onVinoPresencialmenteChange,
    onFueContactadoChange,
  };
};
