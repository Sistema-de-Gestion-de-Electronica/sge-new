import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";
import { type SortingState } from "@tanstack/react-table";
import { useCallback } from "react";
import { inputGetSoftwareFilter } from "@/shared/filters/laboratorio-filter.schema";

type SoftwareFilters = z.infer<typeof inputGetSoftwareFilter>;
type OrderByType = z.infer<typeof inputGetSoftwareFilter>["orderBy"];

const createQueryString = (filters: SoftwareFilters) => {
  const params = new URLSearchParams(filters);

  return params.toString();
};

const changeSorting = (filters: SoftwareFilters, newSorting: SortingState): SoftwareFilters => {
  const newFilters: SoftwareFilters = {
    ...filters,
    orderBy: newSorting[0]?.id as OrderByType,
    orderDirection: newSorting[0]?.desc ? "desc" : "asc",
  };

  const filtersTyped = inputGetSoftwareFilter.parse(newFilters);

  return filtersTyped;
};

const changeSede = (filters: SoftwareFilters, sedeId: string): SoftwareFilters => {
  const newFilters: SoftwareFilters = { ...filters, sedeId };

  const filtersTyped = inputGetSoftwareFilter.parse(newFilters);

  return filtersTyped;
};

const changeSearchText = (filters: SoftwareFilters, searchText: string): SoftwareFilters => {
  const newFilters: SoftwareFilters = {
    ...filters,
    searchText,
  };

  const filtersTyped = inputGetSoftwareFilter.parse(newFilters);

  return filtersTyped;
};

const getSorting = (filters: SoftwareFilters): SortingState => {
  const { orderBy, orderDirection } = filters;

  return [{ id: orderBy, desc: orderDirection === "desc" }];
};

export const useSoftwareQueryParam = (filters: SoftwareFilters) => {
  const pathname = usePathname();
  const router = useRouter();

  const sorting = getSorting(filters);
  const { searchText, sedeId } = filters;

  const changeQueryParams = useCallback(
    (filters: SoftwareFilters) => {
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

  const onSedeChange = useCallback(
    (sede: string) => {
      const newFilters = changeSede(filters, sede);

      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  return {
    sorting,
    searchText,
    sedeId,
    onSedeChange,
    onSortingChange,
    onSearchTextChange,
  };
};
