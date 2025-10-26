import PageLayout from "@/components/ui/template/page-template";
import { INSCRIPCIONES_ESPECIALES_ROUTE, INICIO_ROUTE } from "@/shared/server-routes";
import FormularioSolicitudInscripcionEspecial from "@/app/inscripciones_especiales/_components/form-solicitar";
import PeriodoActivoVerificacion from "@/app/inscripciones_especiales/_components/periodo-activo-verificacion";
import { SgeNombre } from "@/generated/prisma";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { redirect } from "next/navigation";

export default async function Page() {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.INSCRIPCIONES_ESPECIALES_SOLICITAR]);
  if (!puedeVer) {
    if (
      (await estaLogueadoYConPermiso([SgeNombre.INSCRIPCIONES_ESPECIALES_ADMIN])) ||
      (await estaLogueadoYConPermiso([SgeNombre.INSCRIPCIONES_ESPECIALES_VER_LISTADO]))
    ) {
      redirect("/inscripciones_especiales/solicitudes");
    }
    redirect(INICIO_ROUTE.href);
  }
  return (
    <PageLayout route={INSCRIPCIONES_ESPECIALES_ROUTE}>
      <PeriodoActivoVerificacion>
        <FormularioSolicitudInscripcionEspecial />
      </PeriodoActivoVerificacion>
    </PageLayout>
  );
}
