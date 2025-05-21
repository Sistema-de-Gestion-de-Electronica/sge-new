import { Button } from "@/components/ui/button";
import ModalDrawer from "@/app/_components/modal/modal-drawer";

type Props = {
  open: boolean; // Estado de apertura recibido
  onOpenChange: (open: boolean) => void; // Función de manejo del cambio de estado
  handleModificar: () => void;
};

export const ConfirmarCambioEstadoModal = ({ open, onOpenChange, handleModificar }: Props) => {
  const handleConfirm = () => {
    handleModificar();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <ModalDrawer
      titulo="Confirmar cambio de estado"
      description="Al modificar la solicitud, pasará a estado Pendiente. ¿Estás seguro de que deseas modificar la reserva?"
      open={open} // Usar el estado abierto del prop
      onOpenChange={onOpenChange} // Usar la función de cambio de apertura del prop
      className="max-h-[calc(100vh_-_300px)]"
      isAlertDialog // Puedes quitar el atributo trigger si se controla desde el padre.
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex w-full justify-end gap-x-4">
          <Button title="Cancelar" type="button" variant="default" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button title="Confirmar" type="button" variant="default" color="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </ModalDrawer>
  );
};
