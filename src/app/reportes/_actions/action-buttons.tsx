import { type z } from "zod";
import { ReportesFilterSede } from "../_filters/reportes-filter-sede";
import { ReportesFilterTurno } from "../_filters/reportes-filter-turno";
import { ReportesFilterFecha } from "../_filters/reportes-filter-fecha";
import type { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";

type ReportesFilters = z.infer<typeof inputGetAllLaboratorios>;

type ActionButtonsProps = {
  filters: ReportesFilters;
  monthly?: boolean;
};

export const ActionButtons = ({ filters, monthly }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-3 md:space-x-1.5 lg:flex-row lg:space-y-0">
      <div className="w-full space-y-3 md:flex md:flex-row md:space-x-3 md:space-y-0">
        {monthly && <ReportesFilterFecha filters={filters} />}
        <div className="md:basis-1/5">
          <ReportesFilterSede filters={filters} />
        </div>
        <div className="md:basis-1/5">
          <ReportesFilterTurno filters={filters} />
        </div>
      </div>
    </div>
  );
};
