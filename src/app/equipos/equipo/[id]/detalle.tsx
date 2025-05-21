"use client";

import { useRouter } from "next/navigation";
import { EquipoForm } from "./equipo-form";
import { api } from "@/trpc/react";

export default function DetalleEquipo({ id }: { id: string }) {
  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.equipos.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const handleClickCancel = () => router.back();

  const handleClickSave = () => {
    refreshGetAll();
    router.back();
  };

  return <EquipoForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />;
}
