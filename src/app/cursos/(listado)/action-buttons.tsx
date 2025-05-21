import { type z } from "zod";
import { CursosFilterMateria } from "./filtros/curso-filter-materia";
import { CursosFilterText } from "./filtros/curso-filter-text";
import { type inputGetCursos } from "@/shared/filters/cursos-filter.schema";
import { CursosFilterAño } from "./filtros/curso-filter-anio";

type CursosFilters = z.infer<typeof inputGetCursos>;

type ActionButtonsProps = {
  filters: CursosFilters;
};

export const ActionButtons = ({ filters }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-3 md:flex-row-reverse md:space-x-1.5 md:space-y-0">
      <div className="mr-auto w-full space-y-3 sm:flex sm:basis-3/4 sm:flex-row sm:space-x-3 sm:space-y-0">
        <div className="md:basis-2/5">
          <CursosFilterText filters={filters} />
        </div>
        <div className="md:basis-2/5">
          <CursosFilterMateria filters={filters} />
        </div>
        <div className="md:basis-1/5">
          <CursosFilterAño filters={filters} />
        </div>
      </div>
    </div>
  );
};
