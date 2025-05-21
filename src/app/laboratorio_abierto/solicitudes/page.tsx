import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ActionButtonsPrestamos } from "../(listado)/action-redirect-prestamos";
import LoadingBibliotecaPrestamosTable from "../(listado)/loading-laboratorio-abierto-reservas-table";
import LaboratorioAbiertoSolicitudesTableContainer from "../(listado)/reservas-table-container";
import { inputGetAllSolicitudesReservaLaboratorioAbierto } from "@/shared/filters/reserva-laboratorio-filter.schema";
import PageLayout from "@/components/ui/template/page-template";
import { LABORATORIO_ABIERTO_ROUTE } from "@/shared/server-routes";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetAllSolicitudesReservaLaboratorioAbierto.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout route={LABORATORIO_ABIERTO_ROUTE}>
      <ActionButtonsPrestamos filters={filters} />
      <Suspense key={filter_as_key} fallback={<LoadingBibliotecaPrestamosTable />}>
        <LaboratorioAbiertoSolicitudesTableContainer filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
