"use client";

import React from "react";
import { type z } from "zod";
import { type inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";
import { InscripcionesEspecialesFilterText } from "./filtros/inscripciones-especiales-filter-text";
import { InscripcionesEspecialesFilterCaso } from "./filtros/inscripciones-especiales-filter-caso";
import { InscripcionesEspecialesFilterEstado } from "./filtros/inscripciones-especiales-filter-estado";
import { InscripcionesEspecialesFilterVinoPresencialmente } from "./filtros/inscripciones-especiales-filter-vino-presencialmente";
import { InscripcionesEspecialesFilterFueContactado } from "./filtros/inscripciones-especiales-filter-fue-contactado";

type InscripcionesEspecialesFilters = z.infer<typeof inputGetAllInscripcionesEspeciales>;

type ActionButtonsProps = {
  filters: InscripcionesEspecialesFilters;
};

export const ActionButtons = ({ filters }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-3 md:space-x-1.5 lg:flex-row lg:space-y-0">
      <div className="w-full space-y-3 md:flex md:flex-row md:space-x-3 md:space-y-0">
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.INSCRIPCIONES_ESPECIALES_VER_LISTADO]}>
            <InscripcionesEspecialesFilterText filters={filters} />
          </TienePermiso>
        </div>
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.INSCRIPCIONES_ESPECIALES_VER_LISTADO]}>
            <InscripcionesEspecialesFilterCaso filters={filters} />
          </TienePermiso>
        </div>
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.INSCRIPCIONES_ESPECIALES_VER_LISTADO]}>
            <InscripcionesEspecialesFilterEstado filters={filters} />
          </TienePermiso>
        </div>
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.INSCRIPCIONES_ESPECIALES_VER_LISTADO]}>
            <InscripcionesEspecialesFilterVinoPresencialmente filters={filters} />
          </TienePermiso>
        </div>
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.INSCRIPCIONES_ESPECIALES_VER_LISTADO]}>
            <InscripcionesEspecialesFilterFueContactado filters={filters} />
          </TienePermiso>
        </div>
      </div>
    </div>
  );
};
