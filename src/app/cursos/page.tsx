import { type ReadonlyURLSearchParams } from "next/navigation";
import { ActionButtons } from "./(listado)/action-buttons";
import CursoTableContainer from "./(listado)/curso-table-container";
import { Suspense } from "react";
import LoadingCursosTable from "./(listado)/loading-curso-table";
import { inputGetCursos } from "@/shared/filters/cursos-filter.schema";
import React from "react";
import { CursosNuevoCurso } from "./(listado)/cursos-new-curso";
import { CURSOS_ROUTE } from "@/shared/server-routes";
import PageLayout from "@/components/ui/template/page-template";
import { CargarCursos } from "./(listado)/cursos-bulk-insert";
import { TienePermiso } from "../_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetCursos.parse(await searchParams);
  const filter_as_key = JSON.stringify(filters);
  return (
    <PageLayout
      route={CURSOS_ROUTE}
      buttons={
        <>
          <TienePermiso permisos={[SgeNombre.CURSOS_ABM]}>
            <>
              <CursosNuevoCurso />
              <CargarCursos />
            </>
          </TienePermiso>
        </>
      }
    >
      <ActionButtons filters={filters} />
      <Suspense key={filter_as_key} fallback={<LoadingCursosTable />}>
        <CursoTableContainer filters={filters} filterByUser={false} />
      </Suspense>
    </PageLayout>
  );
}
