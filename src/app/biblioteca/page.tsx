import { type ReadonlyURLSearchParams } from "next/navigation";
import { ActionButtons } from "./(listado)/action-buttons";
import BibliotecaTableContainer from "./(listado)/biblioteca-table-container";
import { inputGetBooks } from "@/shared/filters/biblioteca-filter.schema";
import { Suspense } from "react";
import LoadingBibliotecaTable from "./(listado)/loading-biblioteca-table";
import { BIBLIOTECA_ROUTE } from "@/shared/server-routes";
import { BibliotecaNewLibro } from "./(listado)/biblioteca-new-book";
import PageLayout from "@/components/ui/template/page-template";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetBooks.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout route={BIBLIOTECA_ROUTE} buttons={<BibliotecaNewLibro />}>
      <ActionButtons filters={filters} />
      {/* El mismo loading en el `fallback` se envia al componente hijo en el isLoading */}
      <Suspense key={filter_as_key} fallback={<LoadingBibliotecaTable />}>
        <BibliotecaTableContainer filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
