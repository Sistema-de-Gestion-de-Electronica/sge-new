import { type ReadonlyURLSearchParams } from "next/navigation";
import { Suspense } from "react";
import PageLayout from "@/components/ui/template/page-template";
import { REPORTES_ROUTE } from "@/shared/server-routes";
import { inputGetAllLaboratorios } from "@/shared/filters/laboratorio-filter.schema";
import { ActionButtons } from "../_actions/action-buttons";
import Calendar from "./_components/calendar";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetAllLaboratorios.parse(await searchParams);
  const filter_as_key = JSON.stringify(filters);

  return (
    <PageLayout route={REPORTES_ROUTE}>
      <ActionButtons filters={filters} monthly={true} />
      <Suspense key={filter_as_key}>
        <Calendar filters={filters} />
      </Suspense>
    </PageLayout>
  );
}
