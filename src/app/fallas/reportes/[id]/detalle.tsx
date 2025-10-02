"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { FallasViewAdmin } from "@/app/fallas/reportes/[id]/form-gestion-fallas"

export default function DetalleReporte({ id }: { id: string }) {
  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    // utils.fallas.getAll.invalidate().catch((err) => {
    //   console.error(err);
    // });
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
      <FallasViewAdmin
        fallasId={Number(id)}
        onCancel={handleClickCancel}
        onEstados={handleClickEstados}
      />
    </>
  );
}
