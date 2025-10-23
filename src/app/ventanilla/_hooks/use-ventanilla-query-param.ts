import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";
import { type PaginationState, type SortingState } from "@tanstack/react-table";
import { useCallback } from "react";
import { inputGetAllConsultas } from "@/shared/filters/ventanilla-filter.schema";

type VentanillaFilters = z.infer<typeof inputGetAllConsultas>;
type OrderByType = z.infer<typeof inputGetAllConsultas>["orderBy"];
type PageSizeType = z.infer<typeof inputGetAllConsultas>["pageSize"];

const createQueryString = (filters: VentanillaFilters) => {
  const params = new URLSearchParams(filters);

  return params.toString();
};

const changeSorting = (filters: VentanillaFilters, newSorting: SortingState): VentanillaFilters => {
  const newFilters: VentanillaFilters = {
    ...filters,
    orderBy: newSorting[0]?.id as OrderByType,
    orderDirection: newSorting[0]?.desc ? "desc" : "asc",
    pageIndex: "0",
  };

  const filtersTyped = inputGetAllConsultas.parse(newFilters);

  return filtersTyped;
};

const changePagination = (filters: VentanillaFilters, newPagination: PaginationState): VentanillaFilters => {
  const newFilters: VentanillaFilters = {
    ...filters,
    pageIndex: newPagination.pageIndex.toString(),
    pageSize: newPagination.pageSize.toString() as PageSizeType,
  };

  const filtersTyped = inputGetAllConsultas.parse(newFilters);

  return filtersTyped;
};

const changeSearchText = (filters: VentanillaFilters, searchText: string): VentanillaFilters => {
  const newFilters: VentanillaFilters = {
    ...filters,
    searchText,
    pageIndex: "0",
  };

  const filtersTyped = inputGetAllConsultas.parse(newFilters);

  return filtersTyped;
};

const changeNombre = (filters: VentanillaFilters, nombre: string): VentanillaFilters => {
  const newFilters: VentanillaFilters = {
    ...filters,
    nombre,
    pageIndex: "0",
  };

  const filtersTyped = inputGetAllConsultas.parse(newFilters);

  return filtersTyped;
};

const changeApellido = (filters: VentanillaFilters, apellido: string): VentanillaFilters => {
  const newFilters: VentanillaFilters = {
    ...filters,
    apellido,
    pageIndex: "0",
  };

  const filtersTyped = inputGetAllConsultas.parse(newFilters);

  return filtersTyped;
};

const changeLegajo = (filters: VentanillaFilters, legajo: string): VentanillaFilters => {
  const newFilters: VentanillaFilters = {
    ...filters,
    legajo,
    pageIndex: "0",
  };

  const filtersTyped = inputGetAllConsultas.parse(newFilters);

  return filtersTyped;
};

const changeEmail = (filters: VentanillaFilters, email: string): VentanillaFilters => {
  const newFilters: VentanillaFilters = {
    ...filters,
    email,
    pageIndex: "0",
  };

  const filtersTyped = inputGetAllConsultas.parse(newFilters);

  return filtersTyped;
};

const changeEstado = (filters: VentanillaFilters, estado: string): VentanillaFilters => {
  const newFilters: VentanillaFilters = {
    ...filters,
    estado: estado === "todos" ? "" : estado,
    pageIndex: "0",
  };

  const filtersTyped = inputGetAllConsultas.parse(newFilters);

  return filtersTyped;
};

const getPagination = (filters: VentanillaFilters): { pageSize: number; pageIndex: number } => {
  const { pageIndex, pageSize } = filters;

  return { pageIndex: parseInt(pageIndex), pageSize: parseInt(pageSize) };
};

const getSorting = (filters: VentanillaFilters): SortingState => {
  const { orderBy, orderDirection } = filters;

  return [{ id: orderBy, desc: orderDirection === "desc" }];
};

export const useVentanillaQueryParam = (filters: VentanillaFilters) => {
  const pathname = usePathname();
  const router = useRouter();

  const sorting = getSorting(filters);
  const pagination = getPagination(filters);
  const searchText = filters.searchText;
  const nombre = filters.nombre;
  const apellido = filters.apellido;
  const legajo = filters.legajo;
  const email = filters.email;
  const estado = filters.estado;

  const changeQueryParams = useCallback(
    (filters: VentanillaFilters) => {
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

  const onNombreChange = useCallback(
    (nombre: string) => {
      const newFilters = changeNombre(filters, nombre);

      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onApellidoChange = useCallback(
    (apellido: string) => {
      const newFilters = changeApellido(filters, apellido);

      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onLegajoChange = useCallback(
    (legajo: string) => {
      const newFilters = changeLegajo(filters, legajo);

      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onEmailChange = useCallback(
    (email: string) => {
      const newFilters = changeEmail(filters, email);

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

  return {
    pagination,
    sorting,
    searchText,
    nombre,
    apellido,
    legajo,
    email,
    estado,
    onSortingChange,
    onPaginationChange,
    onSearchTextChange,
    onNombreChange,
    onApellidoChange,
    onLegajoChange,
    onEmailChange,
    onEstadoChange,
  };
};
