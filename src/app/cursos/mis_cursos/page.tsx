import { Suspense } from "react";
import LoadingCursosTable from "../(listado)/loading-curso-table";
import CursoTableContainer from "../(listado)/curso-table-container";
import { ActionButtons } from "../(listado)/action-buttons";
import { inputGetCursos } from "@/shared/filters/cursos-filter.schema";
import { type ReadonlyURLSearchParams } from "next/navigation";
import PageLayout from "@/components/ui/template/page-template";
import { CURSOS_ROUTE } from "@/shared/server-routes";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetCursos.parse(await searchParams);
  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout route={CURSOS_ROUTE}>
      <ActionButtons filters={filters} />
      <Suspense key={filter_as_key} fallback={<LoadingCursosTable />}>
        <CursoTableContainer filters={filters} filterByUser={true} />
      </Suspense>
    </PageLayout>
  );
}
