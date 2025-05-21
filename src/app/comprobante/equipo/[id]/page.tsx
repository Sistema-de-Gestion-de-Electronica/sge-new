"use server";

import ComprobanteContent from "../../_components/comprobante-prestamo";
import { api } from "@/trpc/server";

type PageProps = {
  params: Promise<{ id?: string }>;
};

export default async function ComprobantePage({ params }: PageProps) {
  const { id } = await params;
  const datosReserva = await api.reservas.reservaEquipo.getReservaPorId({ id: Number(id) });
  return <ComprobanteContent datosEquipo={datosReserva} datosLibro={undefined} />;
}
