import { Skeleton } from "@/components/ui/skeleton";
import LoadingPantallaTable from "./_components/loading-pantalla";
import PageLayout from "@/components/ui/template/page-template";
import { LABORATORIO_ROUTE } from "@/shared/server-routes";
import ReservaDiscrecionalModal from "../_components/reserva-discrecional-form";
import { AgregarAPantallaModal } from "./_components/actions/agregar-pantalla";

export default function PantallaLoading() {
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

        <LoadingPantallaTable />
      </>
    </PageLayout>
  );
}
