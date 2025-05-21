import { ReservaDetalle } from "@/app/laboratorio_abierto/_components/info-basica-reserva";
import { ReservaAprobacion } from "@/app/laboratorio_abierto/_components/reserva-gestion";
import { api } from "@/trpc/react";
import { esFechaPasada } from "@/shared/get-date";
import { ReservaEstatus } from "@/generated/prisma";
import { Button, toast } from "@/components/ui";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClockIcon } from "lucide-react";

interface ReservaViewAdminProps {
  reservaId: number;
  onAprobar: () => void;
  onRechazar: () => void;
  onCancel: () => void;
}

export const ReservaViewAdmin = ({ reservaId, onCancel, onAprobar, onRechazar }: ReservaViewAdminProps) => {
  const { data: reservaData } = api.reservas.reservaLaboratorioAbierto.getReservaPorID.useQuery({
    id: Number(reservaId),
  });

  const rechazarReservaLaboratorio = api.reservas.reservaLaboratorioAbierto.rechazarReserva.useMutation();
  const handleRechazarReserva = () => {
    rechazarReservaLaboratorio.mutate(
      { id: reservaId, motivo: "Rechazada por expiración" },
      {
        onSuccess: () => {
          toast.success("Reserva rechazada con éxito.");
          onCancel();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al rechazar la reserva");
        },
      },
    );
  };

  const esReservaPasada = esFechaPasada(reservaData?.reserva?.fechaHoraFin);
  const estaCancelada = reservaData?.reserva.estatus === ReservaEstatus.CANCELADA;
  const esReservaPendientePasada =
    esReservaPasada && !estaCancelada && reservaData?.reserva.estatus === ReservaEstatus.PENDIENTE;

  return (
    <div className="container mx-auto space-y-8 p-4">
      {esReservaPendientePasada && (
        <Alert variant={"destructive"} className="w-full bg-red-500 text-white">
          <AlertTitle className="flex flex-row items-center">
            <ClockIcon className="mr-2 h-4 w-4" />
            Reserva pendiente pasada
          </AlertTitle>
          <AlertDescription>
            <p className="text-sm">
              <b>Esta reserva quedo en el estado pendiente y se encuentra en el pasado, solo es posible cancelarla.</b>
            </p>
          </AlertDescription>
        </Alert>
      )}
      <ReservaDetalle reservaId={reservaId} mostrarCompleto={esReservaPasada} />
      {!esReservaPasada && !estaCancelada && (
        <ReservaAprobacion reservaId={reservaId} onCancel={onCancel} onAprobar={onAprobar} onRechazar={onRechazar} />
      )}
      {esReservaPendientePasada && (
        <div className="flex justify-end">
          <Button
            title="Rechazar Reserva"
            type="button"
            variant="default"
            color="danger"
            onClick={handleRechazarReserva}
          >
            Rechazar Reserva
          </Button>
        </div>
      )}
    </div>
  );
};

// TODO @Alex: si es reserva pasada, mostrar boton para indicar que asistió o no
