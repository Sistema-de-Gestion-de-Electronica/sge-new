import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { Button } from "@/components/ui";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { LaboratorioAbiertoForm } from "../reservar/[tipo]/reserva-form";

type ModalProps = {
  id: number;
  onSubmit: () => void;
};

export default function EditarReservaModal({ id, onSubmit }: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleClickCancel = () => {
    setOpen(false);
    onSubmit();
  };

  const handleClickSave = () => {
    setOpen(false);
    onSubmit();
  };

  return (
    <ModalDrawer
      titulo="Editar reserva"
      description="Sí modifica la reserva, volverá al estado pendiente de aprobación"
      trigger={
        <Button color={"outline"} className="h-8 w-8 px-1 py-1" title="Editar reserva">
          <PencilIcon size={16} />
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
      className="max-h-[calc(100vh_-_10%)]"
    >
      <div className="flex max-h-max w-full flex-col gap-4">
        <LaboratorioAbiertoForm reservaId={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />
      </div>
    </ModalDrawer>
  );
}
