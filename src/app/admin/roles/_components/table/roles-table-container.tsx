"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { type inputGetRoles } from "@/shared/filters/admin-roles-filter.schema";
import { RolesTable } from "./roles-table";
import LoadingAdminTable from "./loading-admin-table";
import { adminRolesColumnas } from "./columns";

type RolesFilters = z.infer<typeof inputGetRoles>;

type LaboratoriosTableContainerProps = {
  filters: RolesFilters;
};

export default function RolesTableContainer({ filters }: LaboratoriosTableContainerProps) {
  const { data: roles, isLoading } = api.admin.roles.getAllRoles.useQuery(filters);

  if (isLoading) {
    return <LoadingAdminTable columns={adminRolesColumnas} />;
  }

  return <RolesTable data={roles ?? { count: 0, roles: [] }} filters={filters} />;
}
