import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircleIcon } from "lucide-react";

type Props = {
  motivoRechazo: string;
};

export const MotivoRechazo = ({ motivoRechazo }: Props) => {
  if (!motivoRechazo) {
    return null;
  }

  return (
    <Alert variant={"destructive"} className="w-full bg-red-500 text-white">
      <AlertTitle className="flex flex-row items-center">
        <XCircleIcon className="mr-2 h-4 w-4" />
        Reserva Rechazada
      </AlertTitle>
      <AlertDescription>
        <p className="text-sm">
          <b>Motivo de rechazo:</b> {motivoRechazo}
        </p>
      </AlertDescription>
    </Alert>
  );
};
