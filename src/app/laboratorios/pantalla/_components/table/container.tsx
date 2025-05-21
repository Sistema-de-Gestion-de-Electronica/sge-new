"use client";

import { api } from "@/trpc/react";
import { PantallaTable } from "./pantalla-table";

export default function PantallaTableContainer() {
  const { data: reservasEnPantalla } = api.reservas.pantalla.getAllActivas.useQuery({});

  return <PantallaTable data={reservasEnPantalla ?? []} />;
}
