"use client";

import { useRouter } from "next/navigation";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { AdminUsuarioForm } from "./admin-usuario-form";

const rutaAdmin = ADMIN_ROUTE;

export default function DetalleUsuario({ id }: { id: string }) {
  const router = useRouter();

  const handleClickCancel = () => router.back();

  const handleClickSave = () => router.push(rutaAdmin.href);

  return <AdminUsuarioForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />;
}
