import { Button } from "@/components/ui";
import { api } from "@/trpc/react";
import { AngryIcon, SmileIcon } from "lucide-react";

type AsistioReservaProps = {
  reservaId: number;
  asistio: boolean;
  onChange: () => void;
};

export const AsistioReserva = ({ reservaId, asistio, onChange }: AsistioReservaProps) => {
  const mutateAsistencia = api.admin.usuarios.cambiarAsistioReserva.useMutation();

  const cambiarAsistencia = (asistio: boolean) => {
    mutateAsistencia.mutate(
      { id: reservaId, asistio },
      {
        onSuccess: onChange,
      },
    );
  };

  if (asistio) {
    return (
      <Button
        title="No asistir"
        variant="default"
        color="primary"
        size="sm"
        className="flex min-w-32 flex-row gap-x-2 border-none bg-[#F3F4FE] hover:bg-primary"
        onClick={() => cambiarAsistencia(false)}
      >
        <SmileIcon className="h-4 w-4" /> Asistió
      </Button>
    );
  }

  return (
    <Button
      title="Asistir"
      variant="default"
      color="danger"
      size="sm"
      className="flex min-w-32 flex-row gap-x-2 border-none bg-danger/60 text-white hover:bg-danger"
      onClick={() => cambiarAsistencia(true)}
    >
      <AngryIcon className="h-4 w-4" /> No asistió
    </Button>
  );
};
