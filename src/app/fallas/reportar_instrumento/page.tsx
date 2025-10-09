import PageLayout from "@/components/ui/template/page-template";
import { FALLAS_ROUTE } from "@/shared/server-routes";
import FormularioReportarFallaInstrumento from "@/app/fallas/_components/form-reportar-falla-instrumento";

export default async function Page() {

  return (
    <PageLayout route={FALLAS_ROUTE}>
        <div className="max-w-4xl m-auto w-full">
            <FormularioReportarFallaInstrumento />
        </div>
    </PageLayout>
  );
}
