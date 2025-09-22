import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import PageLayout from "@/components/ui/template/page-template";
// import { ActionButtons } from "@/app/inscripciones_especiales/_actions/action-buttons";
import { INSCRIPCIONES_ESPECIALES_ROUTE, INICIO_ROUTE } from "@/shared/server-routes";
import InscripcionesEspecialesTableContainer from "@/app/inscripciones_especiales/_components/inscripciones-especiales-table-container";
import LoadingInscripcionesEspecialesTable from "@/app/inscripciones_especiales/(listado)/loading-inscripciones-especiales-solicitudes";
import { inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  // Verificar que el usuario tenga permisos de administrador
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.ADMIN_VER_PANEL_ADMIN]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  const filters = inputGetAllInscripcionesEspeciales.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout route={INSCRIPCIONES_ESPECIALES_ROUTE}>
      {/* <ActionButtons filters={filters} /> */}
      <Suspense key={filter_as_key} fallback={<LoadingInscripcionesEspecialesTable />}>
        <InscripcionesEspecialesTableContainer filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
