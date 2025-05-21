import { type z } from "zod";
import { BibliotecaFilterMateria } from "./filtros/biblioteca-filter-materia";
import { BibliotecaFilterText } from "./filtros/biblioteca-filter-text";

import { type inputGetBooks } from "@/shared/filters/biblioteca-filter.schema";
import { SgeNombre } from "@/generated/prisma";
import { tienePermisoBack } from "@/server/permisos";

type BibliotecaFilters = z.infer<typeof inputGetBooks>;

type ActionButtonsProps = {
  filters: BibliotecaFilters;
};

export const ActionButtons = async ({ filters }: ActionButtonsProps) => {
  const tienePermiso = await tienePermisoBack([SgeNombre.BIBLIOTECA_BUSCAR_LIBRO]);

  if (!tienePermiso) return null;

  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-3 md:flex-row md:space-x-1.5 md:space-y-0">
      <div className="w-full space-y-3 sm:flex sm:flex-row sm:space-x-3 sm:space-y-0 md:basis-1/2">
        <div className="md:basis-1/2">
          <BibliotecaFilterText filters={filters} />
        </div>
        <div className="md:basis-1/2">
          <BibliotecaFilterMateria filters={filters} />
        </div>
      </div>
    </div>
  );
};
