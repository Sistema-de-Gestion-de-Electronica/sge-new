import { Skeleton } from "@/components/ui/skeleton";
import LoadingBibliotecaTable from "./(listado)/loading-biblioteca-table";
import PageLayout from "@/components/ui/template/page-template";
import { BIBLIOTECA_ROUTE } from "@/shared/server-routes";

export default function BibliotecaLoading() {
  return (
    <PageLayout route={BIBLIOTECA_ROUTE}>
      <div className="relative flex w-full flex-col items-center justify-between space-y-2 md:flex-row-reverse  md:space-x-1.5 md:space-y-0">
        <div className="w-full md:basis-1/3">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <LoadingBibliotecaTable />
    </PageLayout>
  );
}
