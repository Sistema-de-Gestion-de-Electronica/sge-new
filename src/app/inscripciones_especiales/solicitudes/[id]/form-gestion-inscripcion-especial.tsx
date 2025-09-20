import { api } from "@/trpc/react";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

import { InscripcionEspecialDetalle } from "@/app/inscripciones_especiales/_components/info-basica-inscripcion-especial";
import { InscripcionEspecialGestion } from "@/app/inscripciones_especiales/_components/inscripcion-especial-gestion";

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
  const { data: inscripcionData } = api.inscripcionesEspeciales.getInscripcionEspecialPorId.useQuery({
    id: Number(inscripcionEspecialId),
  });

  const esInscripcionPendiente = inscripcionData?.estado === InscripcionEspecialEstatus.PENDIENTE;
  const esInscripcionElimnada = inscripcionData?.eliminada ?? false

  return (
    <div className="container mx-auto space-y-8 p-4">
      <InscripcionEspecialDetalle inscripcionEspecialId={inscripcionEspecialId} />
      {esInscripcionPendiente && !esInscripcionElimnada && (
        <TienePermiso permisos={[SgeNombre.ADMIN_VER_PANEL_ADMIN]}>
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
