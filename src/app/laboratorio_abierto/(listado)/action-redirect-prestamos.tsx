import { type z } from "zod";
import { LaboratorioAbiertoReservasFilterText } from "./filtros/laboratorio_abierto-reserva-filter-text";
import { ReservaLaboratorioAbiertoEstadoFilter } from "./filtros/laboratorio_abierto-filter-estado";
import { type inputGetAllSolicitudesReservaLaboratorioAbierto } from "@/shared/filters/reserva-laboratorio-filter.schema";

type reservasLaboratorioAbiertoFilters = z.infer<typeof inputGetAllSolicitudesReservaLaboratorioAbierto>;

type ActionButtonsProps = {
  filters: reservasLaboratorioAbiertoFilters;
};

export const ActionButtonsPrestamos = ({ filters }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="md:basis-1/3">
        <LaboratorioAbiertoReservasFilterText filters={filters} />
      </div>
      <div className="md:basis-1/3">
        <ReservaLaboratorioAbiertoEstadoFilter filters={filters} />
      </div>
    </div>
  );
};
