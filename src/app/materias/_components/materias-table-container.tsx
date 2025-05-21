"use client";

import { api } from "@/trpc/react";
import { MateriasTable } from "./table";
import LoadingMateriasTable from "./loading-materia-table";

export default function MateriasTableContainer() {
  const { data: materias, isLoading } = api.materia.getAll.useQuery();
  if (isLoading) {
    return <LoadingMateriasTable />;
  }

  return <MateriasTable data={materias ?? []} />;
}
