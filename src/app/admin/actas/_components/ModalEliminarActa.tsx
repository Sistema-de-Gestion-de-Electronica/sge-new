import { useState } from "react";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui";

import { toast } from "@/components/ui";
import { api } from "@/trpc/react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";

type RemoveActaModalProps = {
  actaId: number;
  nombre?: string;
  onSubmit: () => void;
};

export default function RemoverLaboratorioModal(/* { laboratorioId, nombre, onSubmit }: RemoveActaModalProps */) {
//   const eliminarActa = api.admin.acta.eliminarActa.useMutation({
//     onSuccess: () => {
//       toast.success(`El Acta ${nombre} se eliminó con éxito.`);

//       onSubmit?.();
//     },

//     onError: (error) => {
//       toast.error(error?.message ?? `Error eliminando el laboratorio ${nombre}`);
//     },
//   });

  const [open, setOpen] = useState(false);

  const hanldeRemoveLaboratorio = async (/* laboratorioId: number */) => {
    //eliminarLaboratorio.mutate({ id: laboratorioId });
    console.log("eliminado")
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      trigger={
        <Button
          title="Eliminar acta"
          variant="icon"
          color="danger"
          className="h-8 w-8 px-2 py-2"
          icon={TrashIcon}
        />
      }
    //   titulo={`Eliminar acta ${nombre ?? ""}`}
      titulo={`Eliminar acta 2025-08-05`}
      cancelText="Cancelar"
      submitText="Sí, eliminar"
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={() => hanldeRemoveLaboratorio(/* laboratorioId */)}
      isAlertDialog
      esEliminar
    >
      <div>
        ¿Está seguro que desea eliminar <span className="font-bold">{/* nombre ?? */ " este acta"}</span>?
      </div>
    </ModalDrawer>
  );
}
