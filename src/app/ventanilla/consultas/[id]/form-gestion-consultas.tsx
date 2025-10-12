import { api } from "@/trpc/react";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

import { ConsultasDetalle } from "@/app/ventanilla/_components/info-basica-consultas";
import { ConsultasGestion } from "@/app/ventanilla/_components/consultas-gestion";
import { ConsultaEstatus } from "@/app/ventanilla/_components/badge-estatus-consulta";


interface ConsultasViewAdminProps {
  consultaId: number;
  onEstados: () => void;
  onCancel: () => void;
}

export const ConsultasViewAdmin = ({
  consultaId,
  onCancel,
  onEstados,
}: ConsultasViewAdminProps) => {
  const { data: consultasData } = api.ventanilla.getConsultaById.useQuery({
    id: Number(consultaId),
  });

  return (
    <div className="container mx-auto space-y-8 p-4">
      <ConsultasDetalle consultaId={consultaId} />
        <TienePermiso permisos={[SgeNombre.VENTANILLA_RESPONDER_CONSULTAS]}>
          <ConsultasGestion
            consultaId={consultaId}
            onEstados={onEstados}
            onCancel={onCancel}
          />
        </TienePermiso>
    </div>
  );
};
