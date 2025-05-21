"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { LaboratorioCerradoForm } from "@/app/laboratorios/_components/reserva-form";
import { api } from "@/trpc/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleReserva({ id }: { id: string }) {
  const [open, setOpen] = useState(true);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.reservas.reservarLaboratorioCerrado.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
      router.back();
    }
  };

  const handleClickSave = () => {
    refreshGetAll();
    router.back();
  };

  const handleClickCancel = () => handleOpenChange(false);

  return (
    <ModalDrawer
      titulo={"Reservar"}
      description={"Reservar laboratorio"}
      open={open}
      onOpenChange={handleOpenChange}
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <LaboratorioCerradoForm cursoId={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />
      </div>
    </ModalDrawer>
  );
}
