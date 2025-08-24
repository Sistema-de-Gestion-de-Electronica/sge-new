import { Badge } from "@/components/ui/badge";
// import { InscripcionEspecialEstatus } from "@/generated/prisma";

export enum InscripcionEspecialEstatus {
    ACEPTADA = "ACEPTADA",
    ACEPTADA_CON_CONDICION = "ACEPTADA_CON_CONDICION",
    RECHAZADA = "RECHAZADA",
    PENDIENTE = "PENDIENTE"
};

export const BadgeEstatusInscripcionEspecial = ({ estatus }: { estatus: InscripcionEspecialEstatus | "" }) => {
  return <Badge color={getStatusColor(estatus)}>{getStatusText(estatus)}</Badge>;
};

const getStatusColor = (status: InscripcionEspecialEstatus | "") => {
  switch (status) {
    case InscripcionEspecialEstatus.PENDIENTE:
      return "aqua";
    case InscripcionEspecialEstatus.ACEPTADA:
      return "success";
    case InscripcionEspecialEstatus.ACEPTADA_CON_CONDICION:
      return "warning";
    case InscripcionEspecialEstatus.RECHAZADA:
      return "danger";
    default:
      return "aqua";
  }
};

const getStatusText = (status: InscripcionEspecialEstatus | "") => {
  switch (status) {
    case InscripcionEspecialEstatus.PENDIENTE:
      return "Pendiente";
    case InscripcionEspecialEstatus.ACEPTADA:
      return "Aprobada";
    case InscripcionEspecialEstatus.ACEPTADA_CON_CONDICION:
      return "Aprobada con condición";
    case InscripcionEspecialEstatus.RECHAZADA:
      return "Rechazada";
    default:
      return "Pendiente";
  }
};
