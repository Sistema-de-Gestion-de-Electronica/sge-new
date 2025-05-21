"use client";

import { useState } from "react";
import { toast, Button } from "@/components/ui";
import { api } from "@/trpc/react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";

type RemoveDivisionModalProps = {
  divisionId?: string;
  nombre?: string;
  onSubmit: () => void;
};

export default function RemoveDivisionModal({ divisionId, nombre, onSubmit }: RemoveDivisionModalProps) {
  const eliminarDivision = api.division.eliminarDivision.useMutation({
    onSuccess: () => {
      toast.success(`La división ${nombre} se eliminó con éxito.`);
      onSubmit?.();
    },
    onError: (error) => {
      toast.error(error?.message ?? `Error eliminando la división ${nombre}`);
    },
  });

  const [open, setOpen] = useState(false);

  const handleRemoveDivision = async (divisionId?: string) => {
    if (divisionId) eliminarDivision.mutate({ id: parseInt(divisionId) });
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      trigger={
        <Button title="Eliminar" type="button" variant="default" color="danger" className="h-9">
          Eliminar
        </Button>
      }
      titulo={`Eliminar división ${nombre ?? ""}`}
      cancelText="Cancelar"
      submitText="Sí, eliminar"
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={() => handleRemoveDivision(divisionId)}
      isAlertDialog
      esEliminar
    >
      <div>
        ¿Está seguro que desea eliminar <span className="font-bold">{nombre ?? "esta división"}</span>?
      </div>
    </ModalDrawer>
  );
}
