import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import DivisionesTableContainer from "./_components/divisiones-table-container";
import LoadingDivisionesTable from "./_components/loading-division-table";
import { inputGetDivisiones } from "@/shared/filters/divisiones-filter.schema";
import React from "react";
import PageLayout from "@/components/ui/template/page-template";
import { NuevaDivision } from "./_components/division-new-division";
import { CURSOS_ROUTE } from "@/shared/server-routes";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";
// import { ActionButtons } from "./_components/action-buttons";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetDivisiones.parse(await searchParams);
  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout
      route={CURSOS_ROUTE}
      buttons={
        <TienePermiso permisos={[SgeNombre.DIVISIONES_ABM]}>
          <NuevaDivision />
        </TienePermiso>
      }
    >
      {/* <ActionButtons filters={filters} /> */}
      <Suspense key={filter_as_key} fallback={<LoadingDivisionesTable />}>
        <div className="m-auto max-w-3xl">
          <DivisionesTableContainer />
        </div>
      </Suspense>
    </PageLayout>
  );
}
