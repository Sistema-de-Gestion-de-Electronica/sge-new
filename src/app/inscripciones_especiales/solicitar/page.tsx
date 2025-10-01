import PageLayout from "@/components/ui/template/page-template";
import { INSCRIPCIONES_ESPECIALES_ROUTE } from "@/shared/server-routes";
import FormularioSolicitudInscripcionEspecial from "@/app/inscripciones_especiales/_components/form-solicitar";

export default async function Page() {

  return (
    <PageLayout route={INSCRIPCIONES_ESPECIALES_ROUTE}>
        <div className="max-w-4xl m-auto w-full">
            <FormularioSolicitudInscripcionEspecial />
        </div>
    </PageLayout>
  );
}
