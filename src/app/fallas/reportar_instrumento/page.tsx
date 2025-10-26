import PageLayout from "@/components/ui/template/page-template";
import { FALLAS_ROUTE } from "@/shared/server-routes";
import FormularioReportarFallaInstrumento from "@/app/fallas/_components/form-reportar-falla-instrumento";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { INICIO_ROUTE } from "@/shared/server-routes";

export default async function Page() {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.REP_FALLAS_REPORTAR_FALLAS]);
  if (!puedeVer) {
    if (
      (await estaLogueadoYConPermiso([SgeNombre.REP_FALLAS_BUSCAR_REP_FALLAS])) ||
      (await estaLogueadoYConPermiso([SgeNombre.REP_FALLAS_ADMIN_REP_FALLAS]))
    ) {
      redirect("/fallas/reportes");
    }
    redirect(INICIO_ROUTE.href);
  }
  return (
    <PageLayout route={FALLAS_ROUTE}>
      <div className="m-auto w-full max-w-4xl">
        <FormularioReportarFallaInstrumento />
      </div>
    </PageLayout>
  );
}
