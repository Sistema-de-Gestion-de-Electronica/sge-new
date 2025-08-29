import { api } from "@/trpc/react";
// import { InscripcionEspecialEstatus } from "@/generated/prisma";
import { Button, toast } from "@/components/ui";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClockIcon } from "lucide-react";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

import { InscripcionEspecialDetalle } from "@/app/inscripciones_especiales/_components/info-basica-inscripcion-especial";
import { InscripcionEspecialGestion } from "@/app/inscripciones_especiales/_components/inscripcion-especial-gestion"

import { MOCK_RESPUESTA_MIS_INSCRIPCIONES_ESPECIALES } from "../../_components/mock-mis-inscripciones"; //TODO eliminar cuando fucione el backend

enum InscripcionEspecialEstatus {
  ACEPTADA = "ACEPTADA",
  ACEPTADA_CON_CONDICION = "ACEPTADA_CON_CONDICION",
  RECHAZADA = "RECHAZADA",
  PENDIENTE = "PENDIENTE",
}

interface InscripcionEspecialViewAdminProps {
  inscripcionEspecialId: number;
  onAprobar: () => void;
  onRechazar: () => void;
  onCancel: () => void;
}

export const InscripcionEspecialViewAdmin = ({
  inscripcionEspecialId,
  onCancel,
  onAprobar,
  onRechazar,
}: InscripcionEspecialViewAdminProps) => {
  //   const { data: inscripcionData } = api.inscripcionesEspeciales.getInscripcionPorID.useQuery({
  //     id: Number(inscripcionEspecialId),
  //   });
  const inscripcionData = MOCK_RESPUESTA_MIS_INSCRIPCIONES_ESPECIALES.solicitudes.find(
    (inscripcion) => inscripcion.id === inscripcionEspecialId,
  );


  //   const estaCancelada = inscripcionData?.reserva.estatus === ReservaEstatus.CANCELADA;
  const esInscripcionPendiente = inscripcionData?.estado === InscripcionEspecialEstatus.PENDIENTE;

  return (
    <div className="container mx-auto space-y-8 p-4">
      <InscripcionEspecialDetalle inscripcionEspecialId={inscripcionEspecialId} />
      {esInscripcionPendiente && (
        <TienePermiso permisos={[SgeNombre.INSCRIPCIONES_ESPECIALES_ADMIN]}>
          <InscripcionEspecialGestion
            inscripcionEspecialId={inscripcionEspecialId}
            onAprobar={onAprobar}
            onCancel={onCancel}
            onRechazar={onRechazar}
          />
        </TienePermiso>
      )}
    </div>
  );
};