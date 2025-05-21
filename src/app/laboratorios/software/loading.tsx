import { Button } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSoftwareTable from "./_components/loading-software";
import PageLayout from "@/components/ui/template/page-template";
import { LABORATORIO_ROUTE } from "@/shared/server-routes";

export default function BibliotecaLoading() {
  return (
    <PageLayout route={LABORATORIO_ROUTE}>
      <div className="relative flex w-full flex-col items-center justify-between space-y-2 md:flex-row-reverse  md:space-x-1.5 md:space-y-0">
        <div className="relative flex w-full flex-row justify-end md:w-auto md:basis-1/3">
          <Button color={"primary"} isLoading className="h-auto">
            Nueva aplicación
          </Button>
        </div>

        <div className="w-full md:basis-1/3">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <LoadingSoftwareTable />
    </PageLayout>
  );
}
