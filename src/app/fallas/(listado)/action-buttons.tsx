import { type z } from "zod";
import { FallasFilterText } from "./filtros/fallas-filter-text";
import { FallasFilterLaboratorio } from "./filtros/fallas-filter-laboratorio";
import { FallasFilterMarca } from "./filtros/fallas-filter-marca";
import { FallasFilterModelo } from "./filtros/fallas-filter-modelo";
import { FallasFilterReportadoPor } from "./filtros/fallas-filter-reportado-por";
import { FallasFilterAsignadoA } from "./filtros/fallas-filter-asignado-a";
import { FallasFilterEstado } from "./filtros/fallas-filter-estado";
import { type inputGetAllFallas } from "@/shared/filters/fallas-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type FallasFilters = z.infer<typeof inputGetAllFallas>;

type ActionButtonsProps = {
  filters: FallasFilters;
};

export const ActionButtons = ({ filters }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-3 md:space-x-1.5 lg:flex-row lg:space-y-0">
      <div className="w-full space-y-3 md:flex md:flex-row md:space-x-3 md:space-y-0">
        <div className="md:flex-1 min-w-0">
          <FallasFilterText filters={filters} />
        </div>
        <div className="md:flex-1 min-w-0">
          <FallasFilterLaboratorio filters={filters} />
        </div>
        <div className="md:flex-1 min-w-0">
          <FallasFilterMarca filters={filters} />
        </div>
        <div className="md:flex-1 min-w-0">
          <FallasFilterModelo filters={filters} />
        </div>
        <div className="md:flex-1 min-w-0">
          <FallasFilterReportadoPor filters={filters} />
        </div>
        <div className="md:flex-1 min-w-0">
          <FallasFilterAsignadoA filters={filters} />
        </div>
        <div className="md:flex-1 min-w-0">
          <FallasFilterEstado filters={filters} />
        </div>
      </div>
    </div>
  );
};
