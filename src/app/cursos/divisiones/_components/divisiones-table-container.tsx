"use client";

import { api } from "@/trpc/react";
import { DivisionesTable } from "./table";
import LoadingDivisionesTable from "../_components/loading-division-table";

export default function DivisionesTableContainer() {
  const { data: divisiones, isLoading } = api.division.getFiltered.useQuery();

  if (isLoading) {
    return <LoadingDivisionesTable />;
  }

  return <DivisionesTable data={divisiones ?? []} />;
}
