import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";
import { type SortingState } from "@tanstack/react-table";
import { useCallback } from "react";
import { inputGetCursos } from "@/shared/filters/cursos-filter.schema";

type CursosFilters = z.infer<typeof inputGetCursos>;
type OrderByType = z.infer<typeof inputGetCursos>["orderBy"];

const createQueryString = (filters: CursosFilters) => {
  const params = new URLSearchParams(filters);

  return params.toString();
};

const changeSorting = (filters: CursosFilters, newSorting: SortingState): CursosFilters => {
  const newFilters: CursosFilters = {
    ...filters,
    orderBy: newSorting[0]?.id as OrderByType,
    orderDirection: newSorting[0]?.desc ? "desc" : "asc",
  };

  const filtersTyped = inputGetCursos.parse(newFilters);

  return filtersTyped;
};

const changeSearchText = (filters: CursosFilters, searchText: string): CursosFilters => {
  const newFilters: CursosFilters = {
    ...filters,
    searchText,
  };

  const filtersTyped = inputGetCursos.parse(newFilters);

  return filtersTyped;
};

const changeMateria = (filters: CursosFilters, materia: string): CursosFilters => {
  const newFilters: CursosFilters = {
    ...filters,
    materia,
  };

  const filtersTyped = inputGetCursos.parse(newFilters);

  return filtersTyped;
};

const changeAño = (filters: CursosFilters, año: string): CursosFilters => {
  const newFilters: CursosFilters = {
    ...filters,
    anioDeCarrera: año,
  };

  const filtersTyped = inputGetCursos.parse(newFilters);

  return filtersTyped;
};

const getSorting = (filters: CursosFilters): SortingState => {
  const { orderBy, orderDirection } = filters;
  return [{ id: orderBy, desc: orderDirection === "desc" }];
};

export const useCursosQueryParam = (filters: CursosFilters) => {
  const pathname = usePathname();
  const router = useRouter();

  const sorting = getSorting(filters);
  const searchText = filters.searchText;
  const materia = filters.materia;
  const año = filters.anioDeCarrera;

  const changeQueryParams = useCallback(
    (filters: CursosFilters) => {
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

  const onSearchTextChange = useCallback(
    (searchText: string) => {
      const newFilters = changeSearchText(filters, searchText);

      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onMateriaChange = useCallback(
    (materia: string) => {
      const newFilters = changeMateria(filters, materia);

      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onAñoChange = useCallback(
    (año: string) => {
      const newFilters = changeAño(filters, año);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  return {
    sorting,
    searchText,
    materia,
    año,
    onSortingChange,
    onSearchTextChange,
    onMateriaChange,
    onAñoChange,
  };
};
