"use client";

import { useRouter } from "next/navigation";
import { EQUIPOS_ROUTE } from "@/shared/server-routes";
import { TipoForm } from "./tipo-form";
import { api } from "@/trpc/react";

const rutaEquipos = EQUIPOS_ROUTE;

export default function DetalleTipo({ id }: { id: string }) {
  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.equipos.getAllTipos.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const handleClickCancel = () => router.back();

  const handleClickSave = () => {
    refreshGetAll();
    router.push(rutaEquipos.href);
  };

  return <TipoForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />;
}
