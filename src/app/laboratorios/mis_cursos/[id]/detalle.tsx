"use client";

import { useRouter } from "next/navigation";
import { LABORATORIO_ROUTE } from "@/shared/server-routes";
import { LaboratorioCerradoForm } from "../../_components/reserva-form";

const laboratorioRuta = LABORATORIO_ROUTE;

export default function DetalleReserva({ id }: { id: string }) {
  const router = useRouter();

  const handleClickCancel = () => router.back();

  const handleClickSave = () => router.push(laboratorioRuta.href);

  return <LaboratorioCerradoForm cursoId={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />;
}
