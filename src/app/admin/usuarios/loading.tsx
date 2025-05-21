import { Skeleton } from "@/components/ui/skeleton";
import LoadingAdminUsuariosTable from "./_components/table/loading-admin-table";
import { adminUsuariosColumnas } from "./_components/table/columns";
import PageLayout from "@/components/ui/template/page-template";
import { ADMIN_ROUTE } from "@/shared/server-routes";

export default function BibliotecaLoading() {
  return (
    <PageLayout route={ADMIN_ROUTE}>
      <div className="relative flex w-full flex-col items-center justify-between space-y-2 md:flex-row-reverse  md:space-x-1.5 md:space-y-0">
        <div className="relative flex w-full flex-row justify-end md:w-auto md:basis-1/3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="w-full md:basis-1/3">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <LoadingAdminUsuariosTable columns={adminUsuariosColumnas} />
    </PageLayout>
  );
}
