"use client";

import * as React from "react";
import { useMemo } from "react";
import { ActaVotosTable } from "./TableActaVotos";
import { loadMockVotos } from "./MockData";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";


export function AdminConsejeros() {
  //const acta = getActaEnCurso
  const data = useMemo(() => loadMockVotos(15), []);
  //Votos = TRPC GetAllVots {ActaID: 123}
  //data = ConvertToVotoActaType(votos)

  return (
    <section className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          {/* <h2>Acta en curso: {acta.nombre}</h2> */}
          <h1 className="text-gray-900 text-center text-2xl font-bold tracking-tight">Acta en curso: 2025-08-04</h1>
          <Button
            title="Eliminar Acta"
            variant="icon"
            color="danger"
            className="h-8 w-8 px-2 py-2"
            icon={TrashIcon}
          />
          <Button color={"outline"} className="h-8 w-8 px-1 py-1" title="Editar Acta">
            <PencilIcon size={16} />
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <h2 className="text-gray-900 text-center text-xl font-bold tracking-tight">Votos del acta</h2>
        </div>
        <ActaVotosTable data={data} />
    </section>
  );
}