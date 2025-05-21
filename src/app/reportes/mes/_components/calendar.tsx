"use client";

import React, { useMemo } from "react";
import { format, startOfMonth, addDays } from "date-fns";
import type { z } from "zod";
import type { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";
import { api } from "@/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { laboratoriosRouter } from "src/server/api/routers/laboratorios";
import { CalendarHeader } from "./headers";
import { Week } from "./week";

type ReportesFilters = z.infer<typeof inputGetAllLaboratorios>;
type Reserva = { id: number; materia?: string; division: string; profesor: string };

type LaboratoriosCerrados = inferRouterOutputs<
  typeof laboratoriosRouter
>["getAll"][number]["reservaLaboratorioCerrado"];

type Props = {
  filters: ReportesFilters;
};

const WEEKDAYS = ["LAB", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const DAYS_IN_CALENDAR = 35;

export default function Calendar({ filters }: Props) {
  const { data: laboratorios } = api.laboratorios.getAll.useQuery(filters);

  const startOfCurrentMonth = useMemo(() => {
    return filters.desde ? new Date(filters.desde + "T07:00:00.000Z") : startOfMonth(new Date());
  }, [filters.desde]);

  const monthDates = useMemo(() => {
    return Array.from({ length: DAYS_IN_CALENDAR }, (_, index) =>
      addDays(startOfCurrentMonth, index - startOfCurrentMonth.getUTCDay()),
    );
  }, [startOfCurrentMonth]);

  const laboratoriosMap = useMemo(() => {
    if (!laboratorios) return [];
    return laboratorios.map((laboratorio) => ({
      ...laboratorio,
      reservas: reservasPorFecha(laboratorio.reservaLaboratorioCerrado),
    }));
  }, [laboratorios]);

  const today = useMemo(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return hoy;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded">
      <div className="grid w-full grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr] overflow-auto rounded-md border">
        {WEEKDAYS.map((day) => (
          <CalendarHeader key={day} day={day} />
        ))}

        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <Week
            key={rowIndex}
            index={rowIndex}
            monthDates={monthDates}
            laboratoriosMap={laboratoriosMap}
            startOfCurrentMonth={startOfCurrentMonth}
            today={today}
          />
        ))}
      </div>
    </div>
  );
}

function reservasPorFecha(reservas: LaboratoriosCerrados) {
  const reservasPorFecha: Record<string, Reserva[]> = {};

  for (const reserva of reservas) {
    const newReserva = {
      id: reserva.reservaId,
      materia: reserva.esDiscrecional ? reserva.discrecionalMateria?.nombre : reserva.curso?.materia.nombre,
      division: reserva.esDiscrecional ? "" : ` ${reserva.curso?.division.nombre}`,
      profesor: reserva.esDiscrecional
        ? `${reserva.discrecionalDocente?.nombre} ${reserva.discrecionalDocente?.apellido}`
        : `${reserva.curso?.profesor.nombre} ${reserva.curso?.profesor.apellido}`,
    };

    const dateKey = format(reserva.reserva.fechaHoraInicio, "yyyy-MM-dd");
    reservasPorFecha[dateKey] = [...(reservasPorFecha[dateKey] ?? []), newReserva];
  }

  return reservasPorFecha;
}
