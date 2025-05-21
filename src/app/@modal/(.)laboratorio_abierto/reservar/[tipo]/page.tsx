import type { LaboratorioAbiertoType } from "@/app/laboratorio_abierto/reservar/_components/laboratorios";
import DetalleReserva from "./detalle";

type PageProps = {
  params: Promise<{ tipo: LaboratorioAbiertoType }>;
};

export default async function Page({ params }: PageProps) {
  const { tipo } = await params;
  return <DetalleReserva tipo={tipo} />;
}
