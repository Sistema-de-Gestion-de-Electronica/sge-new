"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { Button } from "@/components/ui";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { LaboratorioCerradoForm } from "./reserva-form";
import { api } from "@/trpc/react";

type PageProps = {
  params: { id: number; cursoId: string | null | number };
};

export default function EditarReservaModal({ params: { id, cursoId } }: PageProps) {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.reservas.reservarLaboratorioCerrado.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const handleClickCancel = () => {
    refreshGetAll();
    setOpen(false);
  };

  const handleClickSave = () => {
    refreshGetAll();
    setOpen(false);
  };

  const esDiscrecional = cursoId === null;

  return (
    <ModalDrawer
      titulo={esDiscrecional ? "Editar reserva discrecional" : "Editar reserva"}
      description="Sí modifica la reserva, volverá al estado pendiente de aprobación"
      trigger={
        <Button title="Editar reserva" variant="icon" color="ghost" icon={PencilIcon} className="h-8 w-8 px-2 py-2" />
      }
      open={open}
      onOpenChange={setOpen}
      className="max-h-[calc(100vh_-_10%)]"
    >
      <div className="flex max-h-max w-full flex-col gap-4">
        <LaboratorioCerradoForm
          reservaId={id}
          cursoId={cursoId}
          onCancel={handleClickCancel}
          onSubmit={handleClickSave}
        />
      </div>
    </ModalDrawer>
  );
}
