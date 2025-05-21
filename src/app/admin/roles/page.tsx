import { inputGetRoles } from "@/shared/filters/admin-roles-filter.schema";
import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoadingAdminTable from "./_components/table/loading-admin-table";
import { AdminActionButtons } from "./_components/action-button/action-buttons";
import RolesTableContainer from "./_components/table/roles-table-container";
import { adminRolesColumnas } from "./_components/table/columns";
import PageLayout from "@/components/ui/template/page-template";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { AdminRolesNuevoRol } from "./_components/action-button/nuevo-rol-button";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetRoles.parse(await searchParams);

  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout
      route={ADMIN_ROUTE}
      buttons={
        <TienePermiso permisos={[]}>
          {/* TODO: no se cual seria el permiso que va??*/}
          <AdminRolesNuevoRol />
        </TienePermiso>
      }
    >
      <AdminActionButtons filters={filters} />

      <Suspense key={filter_as_key} fallback={<LoadingAdminTable columns={adminRolesColumnas} />}>
        <RolesTableContainer filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
