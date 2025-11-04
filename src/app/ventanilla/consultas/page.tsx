import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import PageLayout from "@/components/ui/template/page-template";
import { INICIO_ROUTE, VENTANILLA_ROUTE } from "@/shared/server-routes";
import ConsultasTableContainer from "@/app/ventanilla/_components/consultas-table-container";
import LoadingConsultasTable from "@/app/ventanilla/(listado)/loading-consultas";
import { inputGetAllConsultas } from "@/shared/filters/ventanilla-filter.schema";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const puedeVer =
    (await estaLogueadoYConPermiso([SgeNombre.VENTANILLA_VER_CONSULTAS])) ||
    (await estaLogueadoYConPermiso([SgeNombre.VENTANILLA_RESPONDER_CONSULTAS]));
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }
  const filters = inputGetAllConsultas.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout route={VENTANILLA_ROUTE}>
      {/* <ActionButtons filters={filters} /> */}
      <Suspense key={filter_as_key} fallback={<LoadingConsultasTable />}>
        <ConsultasTableContainer filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
