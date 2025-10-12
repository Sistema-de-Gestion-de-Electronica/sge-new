"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { ConsultasViewAdmin } from "@/app/ventanilla/consultas/[id]/form-gestion-consultas";

export default function DetalleConsulta({ id }: { id: string }) {
  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.ventanilla.getAllConsultas.invalidate().catch((err) => {
    console.error(err);
    });
  };

  const handleClickCancel = () => {
    router.back();
    refreshGetAll();
  };

  const handleClickEstados = () => {
    refreshGetAll();
    router.back();
  };

  return (
    <>
      <ConsultasViewAdmin
        consultaId={Number(id)}
        onCancel={handleClickCancel}
        onEstados={handleClickEstados}
      />
    </>
  );
}
