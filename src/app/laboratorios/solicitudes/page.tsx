import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import { inputGetAllSolicitudesReservaLaboratorioCerrado } from "@/shared/filters/reserva-laboratorio-filter.schema";
import LaboratorioCerradoSolicitudesTableContainer from "../_components/table/reservas-labo-cerrado-table-container";
import LoadingBibliotecaPrestamosTable from "@/app/biblioteca/(listado)/loading-biblioteca-prestamos-table";
import { ActionButtonsPrestamos } from "../_components/action-redirect-prestamos";
import PageLayout from "@/components/ui/template/page-template";
import { LABORATORIO_ROUTE } from "@/shared/server-routes";
import ReservaDiscrecionalModal from "../_components/reserva-discrecional-form";
import { AgregarAPantallaModal } from "../pantalla/_components/actions/agregar-pantalla";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetAllSolicitudesReservaLaboratorioCerrado.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout
      route={LABORATORIO_ROUTE}
      buttons={
        <>
          <ReservaDiscrecionalModal />
          <AgregarAPantallaModal />
        </>
      }
    >
      <ActionButtonsPrestamos filters={filters} />
      <Suspense key={filter_as_key} fallback={<LoadingBibliotecaPrestamosTable />}>
        <LaboratorioCerradoSolicitudesTableContainer filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
