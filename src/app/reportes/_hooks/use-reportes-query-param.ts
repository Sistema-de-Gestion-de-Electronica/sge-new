import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";
import { useCallback } from "react";
import { endOfMonth, startOfMonth } from "date-fns";
import _ from "lodash";
import { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";

type ReservasFilters = z.infer<typeof inputGetAllLaboratorios>;

const createQueryString = (filters: ReservasFilters) => {
  const params = new URLSearchParams(_.omitBy(filters, (value) => _.isUndefined(value)));
  return params.toString();
};

const changeSede = (filters: ReservasFilters, sede: string): ReservasFilters => {
  const newFilters: ReservasFilters = { ...filters, sede };
  return inputGetAllLaboratorios.parse(newFilters);
};

const changeTurno = (filters: ReservasFilters, turno?: "MANANA" | "TARDE" | "NOCHE"): ReservasFilters => {
  const newFilters: ReservasFilters = { ...filters, turno };
  return inputGetAllLaboratorios.parse(newFilters);
};

const changeFecha = (filters: ReservasFilters, fecha: Date): ReservasFilters => {
  const newFilters: ReservasFilters = {
    ...filters,
    desde: startOfMonth(fecha).toISOString().split("T")[0],
    hasta: endOfMonth(fecha).toISOString().split("T")[0],
  };
  return inputGetAllLaboratorios.parse(newFilters);
};

export const useReportesQueryParam = (filters: ReservasFilters) => {
  const pathname = usePathname();
  const router = useRouter();
  const { sede, turno, desde, hasta } = filters;

  const changeQueryParams = useCallback(
    (filters: ReservasFilters) => {
      router.push(pathname + "?" + createQueryString(filters));
    },
    [pathname, router],
  );

  const onSedeChange = useCallback(
    (sede: string) => {
      const newFilters = changeSede(filters, sede);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onTurnoChange = useCallback(
    (turno?: "MANANA" | "TARDE" | "NOCHE") => {
      const newFilters = changeTurno(filters, turno);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  const onFechaChange = useCallback(
    (fecha: Date) => {
      const newFilters = changeFecha(filters, fecha);
      changeQueryParams({ ...newFilters });
    },
    [filters, changeQueryParams],
  );

  return {
    sede,
    turno,
    desde,
    hasta,
    onSedeChange,
    onTurnoChange,
    onFechaChange,
  };
};
