// page.tsx
import PageLayout from "@/components/ui/template/page-template";
import { ACTAS_ROUTE } from "@/shared/server-routes";
import { Suspense } from "react";
import { AdminConsejeros } from "./_components/AdminConsejeros";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import UploadActa from "./_components/UploadActa";
import ClientDateModalPicker from "./_components/ClientDateSection";
import OcultarEliminarActasModal from "./_components/ModalHistoricosActas";
import { SgeNombre } from "@/generated/prisma";


export default function Page() {
  return (
    <PageLayout 
      route={ACTAS_ROUTE}
      buttons={
        <div className="flex items-center justify-end gap-2">
          <TienePermiso permisos={[SgeNombre.ACTA_CREAR]}>
            <UploadActa />
          </TienePermiso>
          <TienePermiso permisos={[SgeNombre.ACTA_GESTIONAR]}>
            <OcultarEliminarActasModal />
          </TienePermiso>
          <TienePermiso permisos={[SgeNombre.ACTA_CREAR_REUNION]}>
            <ClientDateModalPicker />
          </TienePermiso>
        </div>
      }
    >
      <Suspense fallback={<p className="p-4">Cargando calendario...</p>}>
        <AdminConsejeros />
      </Suspense>
    </PageLayout>
  );
}
