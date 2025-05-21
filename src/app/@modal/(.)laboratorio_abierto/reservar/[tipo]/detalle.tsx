"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { LaboratorioAbiertoForm } from "@/app/laboratorio_abierto/reservar/[tipo]/reserva-form";
import { type LaboratorioAbiertoType } from "@/app/laboratorio_abierto/reservar/_components/laboratorios";
import { api } from "@/trpc/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleReserva({ tipo }: { tipo: LaboratorioAbiertoType }) {
  const [open, setOpen] = useState(true);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.reservas.reservaLaboratorioAbierto.getAll.invalidate().catch((err) => {
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

  const handleClickCancel = () => {
    refreshGetAll();
    router.back();
  };

  return (
    <ModalDrawer
      titulo={"Reservar"}
      description={"Reservar laboratorio abierto"}
      open={open}
      onOpenChange={handleOpenChange}
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <LaboratorioAbiertoForm tipo={tipo} onCancel={handleClickCancel} onSubmit={handleClickSave} />
    </ModalDrawer>
  );
}
