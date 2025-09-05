"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { InscripcionesEspecialesSolicitudesTable } from "@/app/inscripciones_especiales/(listado)/table";
import { type inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";

import { MOCK_RESPUESTA_MIS_INSCRIPCIONES_ESPECIALES } from "./mock-mis-inscripciones";

type InscripcionesEspecialesFilters = z.infer<typeof inputGetAllInscripcionesEspeciales>;

type InscripcionesEspecialesTableContainerProps = {
  filters: InscripcionesEspecialesFilters;
  filterByUser?: boolean;
};

export default function InscripcionesEspecialesTableContainer({
  filters,
  filterByUser,
}: InscripcionesEspecialesTableContainerProps) {
  if (filterByUser) {
    filters = {
      ...filters,
      filterByUserId: "true",
    };
  }

  // const { data: solicitudes } = api.inscripcionesEspeciales.solicitudes.getAll.useQuery(filters);

  const solicitudes = MOCK_RESPUESTA_MIS_INSCRIPCIONES_ESPECIALES;

  return (
    <InscripcionesEspecialesSolicitudesTable
      data={solicitudes ?? { count: 0, solicitudes: [] }}
      filters={filters}
      filterByUser={filterByUser}
    />
  );
}
