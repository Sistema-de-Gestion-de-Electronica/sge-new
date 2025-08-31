"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

type Voto = "ACUERDO" | "DESACUERDO" | "ACUERDO_PARCIAL" | null;

export default function VotacionActa() {
  const [voto, setVoto] = useState<Voto>(null);
  const [comentario, setComentario] = useState("");

  // ✅ Opción A: guardo el objeto entero
  const crearVoto = api.actas.agregarVoto.useMutation({
    onSuccess: () => {
      setVoto(null);
      setComentario("");
    },
  });

  const opciones: Exclude<Voto, null>[] = ["ACUERDO", "DESACUERDO", "ACUERDO_PARCIAL"];
  const labelDe = (op: Exclude<Voto, null>) =>
    op === "ACUERDO" ? "Acuerdo" : op === "DESACUERDO" ? "Desacuerdo" : "Acuerdo parcial";

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
      <h1 className="text-gray-900 text-center text-2xl font-bold tracking-tight">
        Expresión de acuerdo/desacuerdo con el acta
      </h1>

      <br />

      <p className="text-center antialiased sm:text-md lg:px-28">
        Consejeros/as: Indique a continuación su voluntad respecto del acta. En caso de disconformidad o conformidad
        parcial, háganos saber a continuación sus inquietudes al respecto. Gracias.
      </p>

      <br />

      <div className="flex gap-3 flex-wrap mb-6 items-center justify-center">
        {opciones.map((op) => (
          <div key={op} className="flex items-center justify-center gap-2">
            <Checkbox
              id={op}
              checked={voto === op}
              // Radix pasa boolean | "indeterminate"
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                setVoto(isChecked ? op : voto === op ? null : voto);
              }}
              disabled={crearVoto.isPending}
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
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        disabled={crearVoto.isPending}
      />

      {crearVoto.error ? (
        <p className="mt-2 text-sm text-red-600 text-center">{crearVoto.error.message}</p>
      ) : null}

      <br />

      <div className="flex items-center justify-center">
        <Button
          type="button"
          disabled={!voto || crearVoto.isPending}
          onClick={async () => {
            if (!voto) return;
            try {
              await crearVoto.mutateAsync({
                posicion: voto,                       // ACUERDO | DESACUERDO | ACUERDO_PARCIAL
                comentario: comentario.trim() || null // normaliza vacío → null
              });
            } catch (e) {
              console.error(e);
            }
          }}
        >
          {crearVoto.isPending ? "Enviando…" : "Votar"}
        </Button>
      </div>
    </div>
  );
}
