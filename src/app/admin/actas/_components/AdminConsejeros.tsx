"use client";

import * as React from "react";
import { ActaVotosTable } from "./TableActaVotos";
import RemoverLaboratorioModal from "./ModalEliminarActa";
import EditarLaboratorioModal from "./ModalEditarActa";
import { api } from "@/trpc/react";

export function AdminConsejeros() {
  const { data, isLoading, error } = api.admin.actas.actaYvotos.useQuery();

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  const acta = data?.acta;
  const votos = data?.votos ?? [];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-gray-900 text-center text-2xl font-bold tracking-tight">
          Acta en curso: {acta?.nombreActa ?? "—"}
        </h1>
        <RemoverLaboratorioModal />
        <EditarLaboratorioModal />
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
