import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";
import { type PaginationState, type SortingState } from "@tanstack/react-table";
import { useCallback } from "react";
import { inputGetDivisiones } from "@/shared/filters/divisiones-filter.schema";

type DivisionesFilters = z.infer<typeof inputGetDivisiones>;
type OrderByType = z.infer<typeof inputGetDivisiones>["orderBy"];
type PageSizeType = z.infer<typeof inputGetDivisiones>["pageSize"];

const createQueryString = (filters: DivisionesFilters) => {
  const params = new URLSearchParams(filters);
  return params.toString();
};

const changeSorting = (filters: DivisionesFilters, newSorting: SortingState): DivisionesFilters => {
  const newFilters: DivisionesFilters = {
    ...filters,
    orderBy: newSorting[0]?.id as OrderByType,
    orderDirection: newSorting[0]?.desc ? "desc" : "asc",
    pageIndex: "0",
  };
  return inputGetDivisiones.parse(newFilters);
};

const changePagination = (filters: DivisionesFilters, newPagination: PaginationState): DivisionesFilters => {
  const newFilters: DivisionesFilters = {
    ...filters,
    pageIndex: newPagination.pageIndex.toString(),
    pageSize: newPagination.pageSize.toString() as PageSizeType,
  };
  return inputGetDivisiones.parse(newFilters);
};

const changeSearchText = (filters: DivisionesFilters, searchText: string): DivisionesFilters => {
  const newFilters: DivisionesFilters = {
    ...filters,
    searchText,
    pageIndex: "0",
  };
  return inputGetDivisiones.parse(newFilters);
};

const changeAño = (filters: DivisionesFilters, año: string): DivisionesFilters => {
  const newFilters: DivisionesFilters = {
    ...filters,
    anio: año,
    pageIndex: "0",
  };
  return inputGetDivisiones.parse(newFilters);
};

const getPagination = (filters: DivisionesFilters): { pageSize: number; pageIndex: number } => {
  const { pageIndex, pageSize } = filters;
  return { pageIndex: parseInt(pageIndex), pageSize: parseInt(pageSize) };
};

const getSorting = (filters: DivisionesFilters): SortingState => {
  const { orderBy, orderDirection } = filters;
  return [{ id: orderBy, desc: orderDirection === "desc" }];
};

export const useDivisionesQueryParam = (filters: DivisionesFilters) => {
  const pathname = usePathname();
  const router = useRouter();

  const sorting = getSorting(filters);
  const pagination = getPagination(filters);
  const searchText = filters.searchText;
  const año = filters.anio;

  const changeQueryParams = useCallback(
    (filters: DivisionesFilters) => {
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

  const onAñoChange = useCallback(
    (año: string) => {
      const newFilters = changeAño(filters, año);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  return {
    pagination,
    sorting,
    searchText,
    año,
    onSortingChange,
    onPaginationChange,
    onSearchTextChange,
    onAñoChange,
  };
};
