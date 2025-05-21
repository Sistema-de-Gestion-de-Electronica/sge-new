import { Button } from "@/components/ui/button";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  estaRechazando: boolean;
  handleRechazo: (motivo: string) => void;
};

export const AdminLaboratoriosNuevoLaboratorio = ({ estaRechazando, handleRechazo }: Props) => {
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSave = () => {
    if (!motivo) {
      setShowError(true);
      return;
    }

    handleRechazo(motivo);
    setOpen(false);
    setShowError(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setShowError(false);
  };

  return (
    <ModalDrawer
      titulo={"Rechazar solicitud"}
      //description={"Confirmar rechazo de solicitud"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          title="Rechazar"
          type="button"
          variant="default"
          color="danger"
          isLoading={estaRechazando}
          className="w-full"
        >
          {estaRechazando ? "Rechazando..." : "Rechazar"}
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
      isAlertDialog
      esEliminar
    >
      <div className="flex w-full flex-col gap-y-4">
        <div className="flex max-h-max w-full flex-col gap-4">¿Está seguro que desea rechazar la solicitud?</div>

        <Textarea
          label={"Motivo"}
          name="motivo"
          className="max-h-80 w-full"
          placeholder="Escribe el motivo de rechazo"
          value={motivo}
          onChange={(e) => {
            setMotivo(e.target.value);
            setShowError(false);
          }}
        />

        {showError && <span className="text-red-600">El motivo es requerido.</span>}

        <div className="flex w-full flex-row justify-end gap-x-4">
          <Button title="Cancelar" type="button" variant="default" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button title="Rechazar" type="submit" variant="default" color="danger" onClick={handleSave}>
            Rechazar
          </Button>
        </div>
      </div>
    </ModalDrawer>
  );
};
