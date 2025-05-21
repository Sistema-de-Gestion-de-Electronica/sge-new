"use client";

import { useRouter } from "next/navigation";
import { LaboratorioAbiertoForm } from "./reserva-form";
import { LABORATORIO_ROUTE } from "@/shared/server-routes";
import { type LaboratorioAbiertoType } from "../_components/laboratorios";

const laboratorioRuta = LABORATORIO_ROUTE;

export default function DetalleReserva({ tipo }: { tipo: LaboratorioAbiertoType }) {
  const router = useRouter();

  const handleClickCancel = () => router.back();

  const handleClickSave = () => router.push(laboratorioRuta.href);

  return <LaboratorioAbiertoForm tipo={tipo} onCancel={handleClickCancel} onSubmit={handleClickSave} />;
}
