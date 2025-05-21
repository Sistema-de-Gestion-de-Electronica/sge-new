"use client";

import { useRouter } from "next/navigation";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { AdminRolForm } from "./admin-rol-form";

const rutaAdmin = ADMIN_ROUTE;

export default function DetalleRol({ id }: { id: string }) {
  const router = useRouter();

  const handleClickCancel = () => router.back();

  const handleClickSave = () => {
    router.push(rutaAdmin.href);
  };

  return <AdminRolForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />;
}
