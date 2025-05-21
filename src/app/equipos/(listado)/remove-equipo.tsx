"use client";

import { useState } from "react";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui";

import { toast } from "@/components/ui";
import { api } from "@/trpc/react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";

type RemoveEquipoModalProps = {
  equipoId: number;
  nombre?: string;
  disponible: boolean;
  onSubmit: () => void;
};

export default function RemoveEquipoModal({ equipoId, nombre, disponible, onSubmit }: RemoveEquipoModalProps) {
  const eliminarEquipo = api.equipos.eliminarEquipo.useMutation({
    onSuccess: () => {
      toast.success(`El equipo ${nombre} se eliminó con éxito.`);

      onSubmit?.();
    },

    onError: (error) => {
      toast.error(error?.message ?? `Error eliminando el equipo ${nombre}`);
    },
  });

  const [open, setOpen] = useState(false);

  const handleRemoveMachine = async (equipoId: number) => {
    eliminarEquipo.mutate({ id: equipoId });

    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  if (!disponible) {
    return (
      <ModalDrawer
        trigger={<Button title="Eliminar equipo" variant="icon" color="danger" size="xs" icon={TrashIcon} />}
        titulo={`El equipo ${nombre ?? ""} tiene un préstamo activo`}
        cancelText="Cerrar"
        open={open}
        onOpenChange={setOpen}
        onCancel={handleCancel}
        isAlertDialog
      >
        <div>
          Es necesario devolver <span className="font-bold">{nombre ?? "este equipo"}</span> para poder eliminarlo
        </div>
      </ModalDrawer>
    );
  }

  return (
    <ModalDrawer
      trigger={<Button title="Eliminar equipo" variant="icon" color="danger" size="xs" icon={TrashIcon} />}
      titulo={`Eliminar equipo ${nombre ?? ""}`}
      cancelText="Cancelar"
      submitText="Sí, eliminar"
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={() => handleRemoveMachine(equipoId)}
      isAlertDialog
      esEliminar
    >
      <div>
        ¿Está seguro que desea eliminar <span className="font-bold">{nombre ?? "este equipo"}</span>?
      </div>
    </ModalDrawer>
  );
}
