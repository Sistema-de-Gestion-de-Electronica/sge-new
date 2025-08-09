// page.tsx
import PageLayout from "@/components/ui/template/page-template";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { Suspense } from "react";
import { AdminConsejeros } from "./_components/AdminConsejeros";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import UploadActa from "./_components/UploadActa";
import ClientDateModalPicker from "./_components/ClientDateSection"


export default function Page() {
  return (
    <PageLayout 
      route={ADMIN_ROUTE}
      buttons={
        <TienePermiso permisos={[]}>
          {/* TODO: no se cual seria el permiso que va??*/}
          <div className="flex items-center justify-end gap-1">
            <UploadActa />
            <ClientDateModalPicker />
          </div>
        </TienePermiso>
      }
    >
      <Suspense fallback={<p className="p-4">Cargando calendario...</p>}>
        <AdminConsejeros />
      </Suspense>
    </PageLayout>
  );
}
