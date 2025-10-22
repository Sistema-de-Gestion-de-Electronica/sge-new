"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";
import { type inputGetAllFallas } from "@/shared/filters/fallas-filter.schema";
import { type PaginationState, type SortingState } from "@tanstack/react-table";

type FallasFilters = z.infer<typeof inputGetAllFallas>;

const createQueryString = (filters: FallasFilters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      params.set(key, String(value));
    }
  });

  return params.toString();
};

const getPagination = (filters: FallasFilters): PaginationState => {
  return {
    pageIndex: parseInt(filters.pageIndex),
    pageSize: parseInt(filters.pageSize),
  };
};

const getSorting = (filters: FallasFilters): SortingState => {
  const orderBy = filters.orderBy;
  const orderDirection = filters.orderDirection;

  return [{ id: orderBy, desc: orderDirection === "desc" }];
};

const changePagination = (filters: FallasFilters, pagination: PaginationState): FallasFilters => {
  return {
    ...filters,
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize) as "10" | "20" | "30" | "40" | "50",
  };
};

const changeSorting = (filters: FallasFilters, sorting: SortingState): FallasFilters => {
  const firstSort = sorting[0];
  if (!firstSort) return filters;

  return {
    ...filters,
    orderBy: firstSort.id as any,
    orderDirection: firstSort.desc ? "desc" : "asc",
  };
};

const changeSearchText = (filters: FallasFilters, searchText: string): FallasFilters => {
  return {
    ...filters,
    searchText,
    pageIndex: "0",
  };
};

const changeLaboratorio = (filters: FallasFilters, laboratorio: string): FallasFilters => {
  return {
    ...filters,
    laboratorio,
    pageIndex: "0",
  };
};

const changeMarca = (filters: FallasFilters, marca: string): FallasFilters => {
  return {
    ...filters,
    marca,
    pageIndex: "0",
  };
};

const changeModelo = (filters: FallasFilters, modelo: string): FallasFilters => {
  return {
    ...filters,
    modelo,
    pageIndex: "0",
  };
};

const changeReportadoPor = (filters: FallasFilters, reportadoPor: string): FallasFilters => {
  return {
    ...filters,
    reportadoPor,
    pageIndex: "0",
  };
};

const changeAsignadoA = (filters: FallasFilters, asignadoA: string): FallasFilters => {
  return {
    ...filters,
    asignadoA,
    pageIndex: "0",
  };
};

const changeEstado = (filters: FallasFilters, estado: FallasFilters["estado"]): FallasFilters => {
  return {
    ...filters,
    estado,
    pageIndex: "0",
  };
}

export const useFallasQueryParam = (filters: FallasFilters) => {
  const pathname = usePathname();
  const router = useRouter();

  const sorting = getSorting(filters);
  const pagination = getPagination(filters);
  const searchText = filters.searchText;
  const laboratorio = filters.laboratorio;
  const marca = filters.marca;
  const modelo = filters.modelo;
  const reportadoPor = filters.reportadoPor;
  const asignadoA = filters.asignadoA;
  const estado = filters.estado;

  const changeQueryParams = useCallback(
    (filters: FallasFilters) => {
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

  const onLaboratorioChange = useCallback(
    (laboratorio: string) => {
      const newFilters = changeLaboratorio(filters, laboratorio);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onMarcaChange = useCallback(
    (marca: string) => {
      const newFilters = changeMarca(filters, marca);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onModeloChange = useCallback(
    (modelo: string) => {
      const newFilters = changeModelo(filters, modelo);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onReportadoPorChange = useCallback(
    (reportadoPor: string) => {
      const newFilters = changeReportadoPor(filters, reportadoPor);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onAsignadoAChange = useCallback(
    (asignadoA: string) => {
      const newFilters = changeAsignadoA(filters, asignadoA);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onEstadoChange = useCallback(
    (estado: FallasFilters["estado"]) => {
      const newFilters = changeEstado(filters, estado);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  return {
    sorting,
    pagination,
    searchText,
    laboratorio,
    marca,
    modelo,
    reportadoPor,
    asignadoA,
    estado,
    onSortingChange,
    onPaginationChange,
    onSearchTextChange,
    onLaboratorioChange,
    onMarcaChange,
    onModeloChange,
    onReportadoPorChange,
    onAsignadoAChange,
    onEstadoChange
  };
};
