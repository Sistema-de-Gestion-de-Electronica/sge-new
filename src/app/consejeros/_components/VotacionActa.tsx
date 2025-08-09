"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Voto = "ACUERDO" | "DESACUERDO" | "PARCIAL" | null;

export default function VotacionActa() {
  const [voto, setVoto] = useState<Voto>(null);

  const opciones: Exclude<Voto, null>[] = ["ACUERDO", "DESACUERDO", "PARCIAL"];

  const labelDe = (op: Exclude<Voto, null>) =>
    op === "ACUERDO" ? "Acuerdo" : op === "DESACUERDO" ? "Desacuerdo" : "Acuerdo parcial";

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
        <h1 className="text-gray-90 text-center mr-8 truncate border-r border-slate-200 pr-8 text-2xl font-bold tracking-tight">Expresión de acuerdo/desacuerdo con el acta</h1>

        <br/>

        <p className="text-center antialiased sm:text-md lg:px-28">
            Consejeros/as: Indique a continuación su voluntad respecto del acta.
            En caso de disconformidad o conformidad parcial,
            háganos saber a continuación sus inquietudes al respecto. Gracias.
        </p>

        <br/>

        <div className="flex gap-3 flex-wrap mb-6 items-center justify-center">
            {opciones.map((op) => (
            <div key={op} className="flex items-center justify-center gap-2">
                <Checkbox
                id={op}
                checked={voto === op}
                // Si clickeás una ya seleccionada, la desmarca (deja voto en null).
                // Si querés que SIEMPRE haya una seleccionada, cambia el else a: setVoto(op)
                onCheckedChange={(checked) => setVoto(checked ? op : (voto === op ? null : voto))}
                />
                <label htmlFor={op} className="text-sm text-gray-800 cursor-pointer select-none">
                {labelDe(op)}
                </label>
            </div>
            ))}
        </div>

        <textarea
            className="w-full border border-gray-300 text-sm rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Escriba su comentario aquí..."
        />

        <br/>
        <br/>

        <div className="flex items-center justify-center">
        <Button
        color="primary"
        type="button"
        disabled={!voto}
        onClick={() => {
            if (voto) {
            // TODO enviar voto y comentario
            console.log("Voto:", voto);
            }
        }}
        >
        Votar
        </Button>
        </div>

    </div>
  );
}