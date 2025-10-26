"use client";

import React from "react";
import { type z } from "zod";
import { type inputGetAllConsultas } from "@/shared/filters/ventanilla-filter.schema";
import { VentanillaFilterText } from "./ventanilla-filter-text";
import { VentanillaFilterNombre } from "./ventanilla-filter-nombre";
import { VentanillaFilterApellido } from "./ventanilla-filter-apellido";
import { VentanillaFilterLegajo } from "./ventanilla-filter-legajo";
import { VentanillaFilterEmail } from "./ventanilla-filter-email";
import { VentanillaFilterEstado } from "./ventanilla-filter-estado";

type VentanillaFilters = z.infer<typeof inputGetAllConsultas>;

type Props = {
  filters: VentanillaFilters;
};

export const VentanillaFilters = ({ filters }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <VentanillaFilterText filters={filters} />
      <VentanillaFilterNombre filters={filters} />
      <VentanillaFilterApellido filters={filters} />
      <VentanillaFilterLegajo filters={filters} />
      <VentanillaFilterEmail filters={filters} />
      <VentanillaFilterEstado filters={filters} />
    </div>
  );
};
