import { ConsultasDetalle } from "@/app/ventanilla/_components/info-basica-consultas";
import { ConsultasGestion } from "@/app/ventanilla/_components/consultas-gestion";

interface ConsultasViewAdminProps {
  consultaId: number;
  onEstados: () => void;
  onCancel: () => void;
}

export const ConsultasViewAdmin = ({ consultaId, onCancel, onEstados }: ConsultasViewAdminProps) => {
  return (
    <div className="container mx-auto space-y-8 p-4">
      <ConsultasDetalle consultaId={consultaId} />
      <ConsultasGestion consultaId={consultaId} onEstados={onEstados} onCancel={onCancel} />
    </div>
  );
};
