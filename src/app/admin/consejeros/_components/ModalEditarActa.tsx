import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui";
import ModalDrawer from "@/app/_components/modal/modal-drawer";

type EditActaModalProps = {
  actaId: number;
  nombre?: string;
  onSubmit: () => void;
};

export default function EditLaboratorioModal(/* { laboratorioId, nombre, onSubmit }: RemoveActaModalProps */) {
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

  const hanldeEditActa = async (/* laboratorioId: number */) => {
    //eliminarLaboratorio.mutate({ id: laboratorioId });
    console.log("editado")
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      trigger={
        <Button
          title="Editar acta"
          variant="icon"
          color="outline"
          className="h-8 w-8 px-1 py-1"
          icon={PencilIcon}
        />
      }
    //titulo={`Eliminar acta ${nombre ?? ""}`}
      titulo={`Editar acta 2025-08-05`}
      cancelText="Cancelar"
      submitText="Enviar"
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={() => hanldeEditActa(/* laboratorioId */)}
      isAlertDialog
      esEliminar
    >
        <div>
            Reemplace el archivo para editar
        </div>
        <br/>
        <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/80"
        />
        

    </ModalDrawer>
  );
}
