import { Skeleton } from "@/components/ui/skeleton";
import LoadingEquiposTable from "./(listado)/loading-equipos-table";
import PageLayout from "@/components/ui/template/page-template";
import { EQUIPOS_ROUTE } from "@/shared/server-routes";
import { EquiposNuevoEquipoModal } from "./(listado)/equipos-nuevo-equipo";
import { TienePermiso } from "../_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

export default function EquiposLoading() {
  return (
    <PageLayout
      route={EQUIPOS_ROUTE}
      buttons={
        <TienePermiso permisos={[SgeNombre.EQUIPOS_ABM]}>
          <EquiposNuevoEquipoModal />
        </TienePermiso>
      }
    >
      <div className="relative flex w-full flex-col items-center justify-between space-y-2 md:flex-row-reverse  md:space-x-1.5 md:space-y-0">
        <div className="w-full md:basis-1/3">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <LoadingEquiposTable />
    </PageLayout>
  );
}
