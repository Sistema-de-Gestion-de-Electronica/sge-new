import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoadingAdminTable from "./_components/table/loading-admin-table";
import { AdminActionButtons } from "./_components/action-button/action-buttons";
import AdminLaboratoriosTableContainer from "./_components/table/laboratorios-table-container";
import { adminLaboratoriosColumnas } from "./_components/table/columns";
import { inputGetLaboratorios } from "@/shared/filters/admin-laboratorios-filter.schema";
import PageLayout from "@/components/ui/template/page-template";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { AdminLaboratoriosNuevoLaboratorio } from "./_components/action-button/nuevo-laboratorio-button";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetLaboratorios.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout
      route={ADMIN_ROUTE}
      buttons={
        <TienePermiso permisos={[]}>
          {/* TODO: no se cual seria el permiso que va??*/}
          <AdminLaboratoriosNuevoLaboratorio />
        </TienePermiso>
      }
    >
      <AdminActionButtons filters={filters} />
      <Suspense key={filter_as_key} fallback={<LoadingAdminTable columns={adminLaboratoriosColumnas} />}>
        <AdminLaboratoriosTableContainer filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
