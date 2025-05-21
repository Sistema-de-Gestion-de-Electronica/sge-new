"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { useTienePermisos } from "@/app/_hooks/use-tiene-permisos";
import { LaboratorioCerradoForm } from "@/app/laboratorios/_components/reserva-form";
import { Button } from "@/components/ui";
import { api } from "@/trpc/react";
import { SgeNombre } from "@/generated/prisma";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function ReservaDiscrecionalModal() {
  const { tienePermisos, isLoading, isError } = useTienePermisos([SgeNombre.RES_LAB_REALIZAR_RESERVA_DISCRECIONAL]);

  const [open, setOpen] = useState(false);
  const utils = api.useUtils();

  if (isLoading || isError || !tienePermisos) {
    return null;
  }

  const refreshGetAll = () => {
    utils.reservas.reservarLaboratorioCerrado.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const handleClickSave = () => {
    refreshGetAll();
    setOpen(false);
  };

  const handleClickCancel = () => setOpen(false);

  return (
    <ModalDrawer
      titulo={"Reserva Discrecional de Laboratorio"}
      description={
        "Estas reservas de laboratorio no estan sujetas a ningún curso y/o materia. El único requisito es que al docente que se le asigne esta reservación debería de estar dado de alta en el SGE."
      }
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button type="button" color={"primary"} variant={"default"} className="flex flex-row gap-x-2 text-sm">
          <CalendarIcon className="h-4 w-4" />
          Reserva Discrecional
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <LaboratorioCerradoForm onCancel={handleClickCancel} onSubmit={handleClickSave} />
      </div>
    </ModalDrawer>
  );
}
