import PageLayout from "@/components/ui/template/page-template";
import { FALLAS_ROUTE } from "@/shared/server-routes";
import FormularioReportarFallaPC from "@/app/fallas/_components/form-reportar-falla-pc";

export default async function Page() {

  return (
    <PageLayout route={FALLAS_ROUTE}>
        <div className="max-w-4xl m-auto w-full">
            <FormularioReportarFallaPC />
        </div>
    </PageLayout>
  );
}
