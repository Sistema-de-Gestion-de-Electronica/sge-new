"use client";

import { useState } from "react";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui";

import { toast } from "@/components/ui";
import { api } from "@/trpc/react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";

type RemoveLibroModalProps = {
  libroId: number;
  nombre?: string;
  disponible: boolean;
  onSubmit: () => void;
};

export default function RemoveLibroModal({ libroId, nombre, disponible, onSubmit }: RemoveLibroModalProps) {
  const eliminarLibro = api.biblioteca.eliminarLibro.useMutation({
    onSuccess: () => {
      toast.success(`El libro ${nombre} se eliminó con éxito.`);

      onSubmit?.();
    },

    onError: (error) => {
      toast.error(error?.message ?? `Error eliminando el libro ${nombre}`);
    },
  });

  const [open, setOpen] = useState(false);

  const handleRemoveMachine = async (libroId: number) => {
    eliminarLibro.mutate({ libroId });

    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  if (!disponible) {
    return (
      <ModalDrawer
        trigger={
          <Button title="Eliminar libro" variant="icon" color="danger" className="h-8 w-8 px-2 py-2" icon={TrashIcon} />
        }
        titulo={`El equipo ${nombre ?? ""} tiene un préstamo activo`}
        cancelText="Cerrar"
        open={open}
        onOpenChange={setOpen}
        onCancel={handleCancel}
        isAlertDialog
      >
        <div>
          Es necesario devolver <span className="font-bold">{nombre ?? "este libro"}</span> para poder eliminarlo
        </div>
      </ModalDrawer>
    );
  }

  return (
    <ModalDrawer
      trigger={
        <Button
          title="Eliminar libro"
          variant="icon"
          color="danger"
          className="h-8 w-8 px-2 py-2"
          icon={TrashIcon}
          type="button"
        />
      }
      titulo={`Eliminar libro ${nombre ?? ""}`}
      cancelText="Cancelar"
      submitText="Sí, eliminar"
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={() => handleRemoveMachine(libroId)}
      isAlertDialog
      esEliminar
    >
      <div>
        ¿Está seguro que desea eliminar <span className="font-bold">{nombre ?? "este libro"}</span>?
      </div>
    </ModalDrawer>
  );
}
