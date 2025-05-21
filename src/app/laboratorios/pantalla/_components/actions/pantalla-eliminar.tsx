import { useState } from "react";
import { EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui";

import { toast } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";

type IdsEliminar = RouterOutputs["reservas"]["pantalla"]["getAllActivas"][number]["id"];

type RemoveSoftwareModalProps = {
  ids: IdsEliminar[];
  onSubmit: () => void;
};

export default function EliminarReservaPantallaModal({ ids, onSubmit }: RemoveSoftwareModalProps) {
  const texto = ids.length === 1 ? "curso" : "cursos";

  const eliminarReservaDePantalla = api.reservas.pantalla.eliminarReservaPantalla.useMutation({
    onSuccess: () => {
      toast.success(`Eliminado ${texto} en pantalla con éxito.`);

      onSubmit?.();
    },

    onError: (error) => {
      toast.error(error?.message ?? `Error eliminando ${texto} en pantalla`);
    },
  });

  const [open, setOpen] = useState(false);

  const handleRemoverReservaPantalla = async () => {
    eliminarReservaDePantalla.mutate({ ids });

    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      trigger={
        <Button
          title={`Eliminar ${texto} en pantalla`}
          variant="icon"
          color="danger"
          className="h-8 w-8 px-2 py-2"
          icon={EyeOffIcon}
        />
      }
      titulo={`Eliminar ${texto} en pantalla`}
      cancelText="Cancelar"
      submitText="Sí, eliminar"
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={handleRemoverReservaPantalla}
      isAlertDialog
      esEliminar
    >
      <div>
        ¿Está seguro que desea eliminar {ids.length} {texto} en pantalla?
      </div>
    </ModalDrawer>
  );
}
