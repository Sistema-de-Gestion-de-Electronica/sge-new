import PageLayout from "@/components/ui/template/page-template";
import { FALLAS_ROUTE } from "@/shared/server-routes";
import FormularioReportarFallaPC from "@/app/fallas/_components/form-reportar-falla-pc";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { INICIO_ROUTE } from "@/shared/server-routes";

export default async function Page() {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.REP_FALLAS_REPORTAR_FALLAS]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }
  return (
    <PageLayout route={FALLAS_ROUTE}>
      <div className="m-auto w-full max-w-4xl">
        <FormularioReportarFallaPC />
      </div>
    </PageLayout>
  );
}
