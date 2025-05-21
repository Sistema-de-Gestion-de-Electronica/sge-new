import { type ReadonlyURLSearchParams } from "next/navigation";
import { ActionButtons } from "./(listado)/action-buttons";
import EquiposTableContainer from "./(listado)/equipos-table-container";
import { Suspense } from "react";
import LoadingEquiposTable from "./(listado)/loading-equipos-table";
import { inputGetEquipos } from "@/shared/filters/equipos-filter.schema";
import PageLayout from "@/components/ui/template/page-template";
import { EQUIPOS_ROUTE } from "@/shared/server-routes";
import { EquiposNuevoEquipoModal } from "./(listado)/equipos-nuevo-equipo";
import { TienePermiso } from "../_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetEquipos.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout
      route={EQUIPOS_ROUTE}
      buttons={
        <TienePermiso permisos={[SgeNombre.EQUIPOS_ABM]}>
          <EquiposNuevoEquipoModal />
        </TienePermiso>
      }
    >
      <ActionButtons filters={filters} />
      <div className="w-full">
        <Suspense key={filter_as_key} fallback={<LoadingEquiposTable />}>
          <EquiposTableContainer filters={filters} />
        </Suspense>
      </div>
    </PageLayout>
  );
}
