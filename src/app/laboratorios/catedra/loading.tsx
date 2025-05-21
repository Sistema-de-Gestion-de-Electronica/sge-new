import { Skeleton } from "@/components/ui/skeleton";
import LoadingCursosTable from "../_components/table/loading-curso-table";
import PageLayout from "@/components/ui/template/page-template";
import { LABORATORIO_ROUTE } from "@/shared/server-routes";
import ReservaDiscrecionalModal from "../_components/reserva-discrecional-form";
import { AgregarAPantallaModal } from "../pantalla/_components/actions/agregar-pantalla";

export default function CursoLoading() {
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
      <>
        <div className="relative flex w-full flex-col items-center justify-between space-y-2 md:flex-row-reverse  md:space-x-1.5 md:space-y-0">
          <div className="w-full md:basis-1/3">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <LoadingCursosTable />
      </>
    </PageLayout>
  );
}
