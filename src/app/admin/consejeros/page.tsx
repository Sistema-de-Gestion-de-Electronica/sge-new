// page.tsx
import PageLayout from "@/components/ui/template/page-template";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { Suspense } from "react";
import ClientDateModalPicker from "./_components/ClientDateSection";

export default function Page() {
  return (
    <PageLayout route={ADMIN_ROUTE}>
      <Suspense fallback={<p className="p-4">Cargando calendario...</p>}>
        <ClientDateModalPicker />
      </Suspense>
    </PageLayout>
  );
}
