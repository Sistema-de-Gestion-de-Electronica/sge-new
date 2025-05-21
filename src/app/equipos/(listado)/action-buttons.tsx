import { type z } from "zod";
import { EquiposFilterLaboratorio } from "./filtros/equipos-filter-laboratorio";
import { EquiposFilterText } from "./filtros/equipos-filter-text";
import { EquiposFilterArmario } from "./filtros/equipos-filter-armario";
import { EquiposFilterTipo } from "./filtros/equipos-filter-tipo";
import { EquiposFilterSede } from "./filtros/equipos-filter-sede";
import { type inputGetEquipos } from "@/shared/filters/equipos-filter.schema";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type EquiposFilters = z.infer<typeof inputGetEquipos>;

type ActionButtonsProps = {
  filters: EquiposFilters;
};

export const ActionButtons = ({ filters }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-3 md:space-x-1.5 lg:flex-row lg:space-y-0">
      <div className="w-full space-y-3 md:flex md:flex-row md:space-x-3 md:space-y-0">
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.EQUIPOS_BUSCAR_EQUIPO]}>
            <EquiposFilterText filters={filters} />
          </TienePermiso>
        </div>
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.EQUIPOS_BUSCAR_EQUIPO]}>
            <EquiposFilterSede filters={filters} />
          </TienePermiso>
        </div>
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.EQUIPOS_BUSCAR_EQUIPO]}>
            <EquiposFilterLaboratorio filters={filters} />
          </TienePermiso>
        </div>
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.EQUIPOS_BUSCAR_EQUIPO]}>
            <EquiposFilterArmario filters={filters} />
          </TienePermiso>
        </div>
        <div className="md:basis-1/5">
          <TienePermiso permisos={[SgeNombre.EQUIPOS_BUSCAR_EQUIPO]}>
            <EquiposFilterTipo filters={filters} />
          </TienePermiso>
        </div>
      </div>
    </div>
  );
};
