"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { InscripcionEspecialViewAdmin } from "@/app/inscripciones_especiales/solicitudes/[id]/form-gestion-inscripcion-especial"

export default function DetalleSolicitud({ id }: { id: string }) {
  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    // utils.inscripcionesEspeciales.getAll.invalidate().catch((err) => {
    //   console.error(err);
    // });
  };

  const handleClickCancel = () => {
    router.back();
    refreshGetAll();
  };

  const handleClickAprobar = () => {
    refreshGetAll();
    router.back();
  };


  const handleClickRechazar = () => {
    refreshGetAll();
    router.back();
  };

  return (
    <>
      <InscripcionEspecialViewAdmin
        inscripcionEspecialId={Number(id)}
        onCancel={handleClickCancel}
        onAprobar={handleClickAprobar}
        onRechazar={handleClickRechazar}
      />
    </>
  );
}
