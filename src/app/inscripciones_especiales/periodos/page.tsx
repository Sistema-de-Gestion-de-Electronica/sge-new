import PageLayout from "@/components/ui/template/page-template";
import { INSCRIPCIONES_ESPECIALES_ROUTE, INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { redirect } from "next/navigation";
import GestionarPeriodosInscripcionEspecial from "../_components/gestionar-periodos";

export default async function Page() {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.INSCRIPCIONES_ESPECIALES_ADMIN]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return (
    <PageLayout route={INSCRIPCIONES_ESPECIALES_ROUTE}>
      <div className="m-auto w-full max-w-4xl">
        <GestionarPeriodosInscripcionEspecial />
      </div>
    </PageLayout>
  );
}
