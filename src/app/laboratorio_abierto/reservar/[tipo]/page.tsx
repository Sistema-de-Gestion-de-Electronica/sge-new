import DetalleReserva from "./detalle";
import { type LaboratorioAbiertoType } from "../_components/laboratorios";

type PageProps = {
  params: Promise<{ tipo: LaboratorioAbiertoType }>;
};

export default async function Page({ params }: PageProps) {
  const { tipo } = await params;
  return <DetalleReserva tipo={tipo} />;
}
