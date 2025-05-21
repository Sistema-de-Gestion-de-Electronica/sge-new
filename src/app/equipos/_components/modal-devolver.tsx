"use client";

import { useState } from "react";
import { toast } from "@/components/ui";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { api } from "@/trpc/react";
import { DevolverButton } from "@/app/_components/prestar-devolver";

type DevolverEquipoModalProps = {
  equipoId: number;
};

export default function DevolverEquipoModal({ equipoId }: DevolverEquipoModalProps) {
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.equipos.getAll.invalidate().catch((err) => {
      console.error(err);
    });
    utils.reservas.reservaEquipo.invalidate().catch((err) => {
      console.error(err);
    });
  };
  const devolverEquipo = api.reservas.reservaEquipo.devolverEquipo.useMutation();

  const [open, setOpen] = useState(false);

  const handleCancel = () => setOpen(false);

  const handleDevolverEquipo = async () => {
    devolverEquipo.mutate(
      { equipoId },
      {
        onSuccess: () => {
          toast.success("Equipo devuelto con éxito.");
          refreshGetAll();
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al devolver el equipo");
        },
      },
    );
  };

  return (
    <ModalDrawer
      trigger={
        <div className="flex flex-row justify-center">
          <DevolverButton />
        </div>
      }
      titulo={`Devolver equipo`}
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={handleDevolverEquipo}
      isAlertDialog
      cancelText="Cancelar"
      submitText="Sí, devolver"
    >
      <div>¿Está seguro que desea devolver el equipo?</div>
    </ModalDrawer>
  );
}
