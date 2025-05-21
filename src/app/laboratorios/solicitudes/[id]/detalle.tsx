"use client";

import { useRouter } from "next/navigation";
import { ReservaViewAdmin } from "./form-gestion-reserva";
import { api } from "@/trpc/react";

export default function DetalleSolicitud({ id }: { id: string }) {
  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.reservas.reservarLaboratorioCerrado.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const handleClickCancel = () => {
    refreshGetAll();
    router.back();
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
    <ReservaViewAdmin
      reservaId={Number(id)}
      onCancel={handleClickCancel}
      onAprobar={handleClickAprobar}
      onRechazar={handleClickRechazar}
    />
  );
}
