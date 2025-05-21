import React from "react";
import type { inputGetDivisiones } from "@/shared/filters/divisiones-filter.schema";
import type { z } from "zod";
import { DivisionesFilterText } from "./filter-divisiones-text";
import { DivisionesFilterAño } from "./filter-divisiones-anio";

type DivisionesFilters = z.infer<typeof inputGetDivisiones>;

type ActionButtonsProps = {
  filters: DivisionesFilters;
};

export const ActionButtons = ({ filters }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-3 md:flex-row-reverse md:space-x-1.5 md:space-y-0">
      <div className="mr-auto w-full space-y-3 sm:flex sm:basis-3/4 sm:flex-row sm:space-x-3 sm:space-y-0">
        <div className="md:basis-2/5">
          <DivisionesFilterText filters={filters} />
        </div>
        <div className="md:basis-1/5">
          <DivisionesFilterAño filters={filters} />
        </div>
      </div>
    </div>
  );
};
