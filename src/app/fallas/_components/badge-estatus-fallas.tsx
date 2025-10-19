import { Badge } from "@/components/ui/badge";
// import { FallasEstatus } from "@/generated/prisma";

export enum FallasEstatus {
  FALLADO = "FALLADO",
  EN_REPARACION = "EN_REPARACION",
  REPARADO = "REPARADO",
  DESCARTADO = "DESCARTADO",
  ELIMINADO = "ELIMINADO",
}

export const BadgeEstatusFallas = ({ estatus }: { estatus: FallasEstatus | "" }) => {
  return <Badge color={getStatusColor(estatus)}>{getStatusText(estatus)}</Badge>;
};

const getStatusColor = (status: FallasEstatus | "") => {
  switch (status) {
    case FallasEstatus.EN_REPARACION:
      return "aqua";
    case FallasEstatus.REPARADO:
      return "success";
    case FallasEstatus.FALLADO:
      return "warning";
    case FallasEstatus.DESCARTADO:
      return "warning";
    case FallasEstatus.ELIMINADO:
      return "danger";
    default:
      return "aqua";
  }
};

const getStatusText = (status: FallasEstatus | "") => {
  switch (status) {
    case FallasEstatus.EN_REPARACION:
      return "En reparación";
    case FallasEstatus.REPARADO:
      return "Reparado";
    case FallasEstatus.FALLADO:
      return "Fallado";
    case FallasEstatus.DESCARTADO:
      return "Descartado";
    case FallasEstatus.ELIMINADO:
      return "Eliminado";
    default:
      return "Reparado";
  }
};
