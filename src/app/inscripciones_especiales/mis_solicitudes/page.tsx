import { Suspense } from "react";
import { type ReadonlyURLSearchParams } from "next/navigation";
import PageLayout from "@/components/ui/template/page-template";
import { INSCRIPCIONES_ESPECIALES_ROUTE } from "@/shared/server-routes";
import InscripcionesEspecialesTableContainer from "@/app/inscripciones_especiales/_components/inscripciones-especiales-table-container";
import LoadingInscripcionesEspecialesTable from "@/app/inscripciones_especiales/(listado)/loading-inscripciones-especiales-solicitudes";
import { inputGetAllInscripcionesEspeciales } from "@/shared/filters/inscripciones-especiales-filter.schema";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetAllInscripcionesEspeciales.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);
  return (
    <PageLayout route={INSCRIPCIONES_ESPECIALES_ROUTE}>
        <div className="max-w-4xl m-auto w-full">
          <Suspense key={filter_as_key} fallback={<LoadingInscripcionesEspecialesTable />}>
            <InscripcionesEspecialesTableContainer filters={filters} filterByUser/>
          </Suspense>
        </div>
    </PageLayout>
  )
}
