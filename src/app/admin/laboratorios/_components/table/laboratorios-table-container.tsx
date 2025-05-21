"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { AdminLaboratoriosTable } from "./admin-laboratorios-table";
import { type inputGetLaboratorios } from "@/shared/filters/admin-laboratorios-filter.schema";
import LoadingAdminTable from "./loading-admin-table";
import { adminLaboratoriosColumnas } from "./columns";

type LaboratoriosFilters = z.infer<typeof inputGetLaboratorios>;

type LaboratoriosTableContainerProps = {
  filters: LaboratoriosFilters;
};

export default function AdminLaboratoriosTableContainer({ filters }: LaboratoriosTableContainerProps) {
  const { data: laboratorios, isLoading } = api.admin.laboratorios.getAll.useQuery(filters);

  if (isLoading) {
    return <LoadingAdminTable columns={adminLaboratoriosColumnas} />;
  }

  return <AdminLaboratoriosTable data={laboratorios ?? { count: 0, laboratorios: [] }} filters={filters} />;
}
