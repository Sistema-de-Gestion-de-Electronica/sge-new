import { Badge } from "@/components/ui/badge";

export enum ConsultaEstatus {
  NUEVA = "NUEVA",
  RESPONDIDA = "RESPONDIDA",
  PENDIENTE = "PENDIENTE",
  ELIMINADA = "ELIMINADA",
}

export const BadgeEstatusConsulta = ({ estatus }: { estatus: ConsultaEstatus | "" }) => {
  return <Badge color={getStatusColor(estatus)}>{getStatusText(estatus)}</Badge>;
};

const getStatusColor = (status: ConsultaEstatus | "") => {
  switch (status) {
    case ConsultaEstatus.NUEVA:
      return "aqua";
    case ConsultaEstatus.RESPONDIDA:
      return "success";
    case ConsultaEstatus.PENDIENTE:
      return "warning";
    default:
      return "aqua";
  }
};

const getStatusText = (status: ConsultaEstatus | "") => {
  switch (status) {
    case ConsultaEstatus.NUEVA:
      return "Nueva";
    case ConsultaEstatus.RESPONDIDA:
      return "Respondida";
    case ConsultaEstatus.PENDIENTE:
      return "Pendiente";
    default:
      return "Nueva";
  }
};
