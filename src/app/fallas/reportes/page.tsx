import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import PageLayout from "@/components/ui/template/page-template";
// import { ActionButtons } from "@/app/inscripciones_especiales/_actions/action-buttons";
import { INICIO_ROUTE, FALLAS_ROUTE } from "@/shared/server-routes";
import FallasTableContainer from "@/app/fallas/_components/fallas-table-container";
import LoadingFallasTable from "@/app/fallas/(listado)/loading-fallas";
import { inputGetAllFallas } from "@/shared/filters/fallas-filter.schema";
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

  const filters = inputGetAllFallas.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout route={FALLAS_ROUTE}>
      {/* <ActionButtons filters={filters} /> */}
      <Suspense key={filter_as_key} fallback={<LoadingFallasTable />}>
        <FallasTableContainer filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
