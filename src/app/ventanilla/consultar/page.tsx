import PageLayout from "@/components/ui/template/page-template";
import { VENTANILLA_ROUTE } from "@/shared/server-routes";
import FormularioConsultar from "@/app/ventanilla/_components/form-consultar";

export default async function Page() {

  return (
    <PageLayout route={VENTANILLA_ROUTE}>
        <div className="max-w-4xl m-auto w-full">
            <FormularioConsultar />
        </div>
    </PageLayout>
  );
}
