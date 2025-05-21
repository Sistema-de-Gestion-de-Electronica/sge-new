import { type ReadonlyURLSearchParams } from "next/navigation";
import React from "react";
import { PantallaTableContainer } from "./_components/pantalla-container";
import { inputGetReservasEnPntallaActivas } from "@/shared/filters/reserva-pantalla-filter.schema";

type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const filters = inputGetReservasEnPntallaActivas.parse(await searchParams);

  return <PantallaTableContainer filters={filters} />;
}
