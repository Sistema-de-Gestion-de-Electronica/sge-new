import { api } from "@/trpc/react";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

import { FallasDetalle } from "@/app/fallas/_components/info-basica-fallas";
// import { FallasGestion } from "@/app/fallas/_components/falla-gestion";
import { FallasEstatus } from "@/app/fallas/_components/badge-estatus-fallas";


interface FallasViewAdminProps {
  fallaId: number;
  onEstados: () => void;
  onCancel: () => void;
}

export const FallasViewAdmin = ({
  fallaId,
  onCancel,
  onEstados,
}: FallasViewAdminProps) => {
  const { data: fallasData } = api.fallas.getFallaPorId.useQuery({
    id: Number(fallaId),
  });

  const esFallaEliminado = fallasData?.estado === FallasEstatus.ELIMINADO;

  return (
    <div className="container mx-auto space-y-8 p-4">
      <FallasDetalle fallaId={fallaId} />
      {/* { !esFallaEliminado && (
        <TienePermiso permisos={[SgeNombre.ADMIN_VER_PANEL_ADMIN]}>
          <FallasGestion
            fallaId={fallaId}
            onEstados={onEstados}
            onCancel={onCancel}
          />
        </TienePermiso>
      )} */}
      {/* <FallasHistorial fallaId={fallaId} /> */}
    </div>
  );
};
