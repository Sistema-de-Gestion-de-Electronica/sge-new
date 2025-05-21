"use client";

import { useRouter } from "next/navigation";
import { AdminLaboratorioForm } from "./admin-laboratorio-form";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { api } from "@/trpc/react";

const rutaAdmin = ADMIN_ROUTE;

export default function DetalleLaboratorio({ id }: { id: string }) {
  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.admin.laboratorios.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const handleClickCancel = () => router.back();

  const handleClickSave = () => {
    refreshGetAll();

    const rutaLaboratorio = rutaAdmin.subRutas?.find((subRuta) => subRuta.label === "Laboratorios");
    if (rutaLaboratorio) {
      router.push(rutaLaboratorio.href);
      return;
    }

    router.push(rutaAdmin.href);
  };

  return <AdminLaboratorioForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />;
}
