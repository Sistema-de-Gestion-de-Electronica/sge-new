"use client";

import * as React from "react";
import { ActaVotosTable } from "./TableActaVotos";
import EditActaModal from "./ModalEditarActa";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

function EmptyStateNoActa() {
  return (
    <section className="space-y-3 text-center py-10">
      <h1 className="text-2xl font-semibold">No hay un acta abierta</h1>
      <p className="text-muted-foreground">
        Cuando se abra una nueva acta vas a poder ver el detalle y los votos acá.
      </p>
    </section>
  );
}

export function AdminConsejeros() {
  const { data, isLoading, error } = api.admin.actas.actaYvotos.useQuery();

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (!data?.acta) {
    return <EmptyStateNoActa />;
  }

  const acta = data?.acta;
  const votos = data?.votos ?? [];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-gray-900 text-center text-2xl font-bold tracking-tight">
          Acta en curso: {acta?.nombreActa ?? "—"}
        </h1>
        <EditActaModal acta={acta}/>
      </div>

      <div className="flex items-center justify-center">
        <h2 className="text-gray-900 text-center text-xl font-bold tracking-tight">
          Votos del acta
        </h2>
      </div>

      <ActaVotosTable data={votos} />
    </section>
  );
}
