import { type ReservaEstatus } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";

export const BadgeReservaPasadaLibro = ({ estatus }: { estatus: ReservaEstatus | "" }) => {
  if (estatus === "PENDIENTE") {
    return <Badge color="warning">En curso</Badge>;
  }

  if (estatus === "FINALIZADA") {
    return <Badge color="success">Finalizada</Badge>;
  }

  // No debería pasar por aca nunca
  if (estatus === "CANCELADA") {
    return <Badge color="warning">Cancelada</Badge>;
  }

  // No debería pasar por aca nunca
  return <Badge color="danger">Rechazada</Badge>;
};

export const BadgeReservaPasadaEquipo = ({ estatus }: { estatus: ReservaEstatus | "" }) => {
  if (estatus === "PENDIENTE") {
    return <Badge color="warning">En curso</Badge>;
  }

  if (estatus === "FINALIZADA") {
    return <Badge color="success">Finalizada</Badge>;
  }

  // No debería pasar por aca nunca
  if (estatus === "CANCELADA") {
    return <Badge color="warning">Cancelada</Badge>;
  }

  // No debería pasar por aca nunca
  return <Badge color="danger">Rechazada</Badge>;
};

export const BadgeReservaPasadaLaboratorioAbierto = ({ estatus }: { estatus: ReservaEstatus | "" }) => {
  if (estatus === "PENDIENTE") {
    return <Badge color="warning">Pendiente de aprobación</Badge>;
  }

  if (estatus === "FINALIZADA") {
    return <Badge color="success">Aprobada</Badge>;
  }

  if (estatus === "CANCELADA") {
    return <Badge color="warning">Cancelada</Badge>;
  }

  if (estatus === "RECHAZADA") {
    return <Badge color="danger">Rechazada</Badge>;
  }

  return null;
};

export const BadgeReservaPasadaLaboratorioCerrado = ({ estatus }: { estatus: ReservaEstatus | "" }) => {
  if (estatus === "PENDIENTE") {
    return <Badge color="warning">Pendiente de aprobación</Badge>;
  }

  if (estatus === "FINALIZADA") {
    return <Badge color="success">Aprobada</Badge>;
  }

  if (estatus === "CANCELADA") {
    return <Badge color="warning">Cancelada</Badge>;
  }

  if (estatus === "RECHAZADA") {
    return <Badge color="danger">Rechazada</Badge>;
  }

  return null;
};
