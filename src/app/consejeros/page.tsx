import { CONSEJEROS_ROUTE } from "@/shared/server-routes";
import PageLayout from "@/components/ui/template/page-template";


export default async function Page() {
  return (
    <PageLayout route={CONSEJEROS_ROUTE}>
      <h1>Mi primer HTML</h1>
    </PageLayout>
  );
}
