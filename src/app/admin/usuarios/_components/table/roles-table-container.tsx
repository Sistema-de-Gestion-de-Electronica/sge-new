"use client";

import { api } from "@/trpc/react";
import { type z } from "zod";
import { AdminUsuariosTable } from "./roles-table";
import { type inputGetUsuarios } from "@/shared/filters/admin-usuarios-filter.schema";
import { adminUsuariosColumnas } from "./columns";
import LoadingAdminUsuariosTable from "./loading-admin-table";

type UsuariosFilters = z.infer<typeof inputGetUsuarios>;

type Props = {
  filters: UsuariosFilters;
};

export default function AdminUsuariosTableContainer({ filters }: Props) {
  const { data: usuarios, isLoading } = api.admin.usuarios.getAll.useQuery(filters);

  if (isLoading) {
    return <LoadingAdminUsuariosTable columns={adminUsuariosColumnas} />;
  }

  return <AdminUsuariosTable data={usuarios ?? { count: 0, usuarios: [] }} filters={filters} />;
}
