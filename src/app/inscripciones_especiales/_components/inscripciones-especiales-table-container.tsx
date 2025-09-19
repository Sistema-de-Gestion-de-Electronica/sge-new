"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { InscripcionesEspecialesSolicitudesTable } from "@/app/inscripciones_especiales/(listado)/table";
import { type inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { ExportExcelButton } from "./export-excel-button";

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

  const { data: solicitudes } = api.inscripcionesEspeciales.getAllInscripcionesEspeciales.useQuery(filters);

  //const solicitudes = MOCK_RESPUESTA_MIS_INSCRIPCIONES_ESPECIALES;

  const data = solicitudes ?? {
    count: 0,
    solicitudes: [],
    pageIndex: 0,
    pageSize: 10,
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ExportExcelButton
          data={data.solicitudes}
          filename="solicitudes_inscripciones_especiales"
          disabled={!solicitudes}
        />
      </div>
      <InscripcionesEspecialesSolicitudesTable data={data} filters={filters} filterByUser={filterByUser} />
    </div>
  );
}
