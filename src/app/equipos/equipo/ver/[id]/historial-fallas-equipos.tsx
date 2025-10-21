"use client";

import { api, type RouterOutputs } from "@/trpc/react";
import { useState } from "react";
import { Button } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeEstatusFallas, type FallasEstatus } from "@/app/fallas/_components/badge-estatus-fallas";

type FallaEquipo = RouterOutputs["fallas"]["getHistorialPorEquipoId"][number];

type HistorialFallaProps = {
  equipoId: number;
};

export default function HistorialFallaEquipo({ equipoId }: HistorialFallaProps) {
  const [loadHistorial, setLoadHistorial] = useState(false);

  const {
    data: fallas,
    isLoading,
    error,
  } = api.fallas.getHistorialPorEquipoId.useQuery({ equipoId: Number(equipoId) }, { enabled: loadHistorial });

  if (!loadHistorial) {
    return (
      <div className="container mx-auto space-y-8 p-4">
        <h2 className="text-2xl">Historial de la Falla:</h2>
        <Button
          title={"Cargar historial"}
          variant="default"
          color="primary"
          className="w-full"
          onClick={() => setLoadHistorial(true)}
        >
          Cargar historial
        </Button>
      </div>
    );
  }

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!fallas || fallas.length === 0) return <div>No hay datos disponibles</div>;
  return (
    <>
      <div className="my-2 flex w-full flex-col space-y-4 px-0 text-left text-2xl md:px-6">Historial de Fallas:</div>
      <div className="flex w-full flex-col space-y-4">
        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr>
              <th className="border-b border-slate-300 bg-slate-100 px-4 py-2">#</th>
              <th className="border-b border-slate-300 bg-slate-100 px-4 py-2">Fallas</th>
              <th className="border-b border-slate-300 bg-slate-100 px-4 py-2">Descripción</th>
              <th className="border-b border-slate-300 bg-slate-100 px-4 py-2">Fecha Reporte</th>
              <th className="border-b border-slate-300 bg-slate-100 px-4 py-2">Observaciones</th>
              <th className="border-b border-slate-300 bg-slate-100 px-4 py-2">Estado</th>
              <th className="border-b border-slate-300 bg-slate-100 px-4 py-2">Fecha Cambio Estado</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7}>
                  <Skeleton className="h-4 w-full" />
                </td>
              </tr>
            ) : (
              fallas?.map((falla) => <FallaDeEquipo key={falla.id} falla={falla} />)
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

const FallaDeEquipo = ({ falla }: { falla: FallaEquipo }) => {
  return (
    <tr>
      <td className="border-t border-slate-200 px-4 py-2">{falla.id}</td>
      <td className="border-t border-slate-200 px-4 py-2">{falla.fallas.length > 0 ? falla.fallas.join(", ") : "-"}</td>
      <td className="border-t border-slate-200 px-4 py-2">{falla.descripcionFalla ?? "-"}</td>
      <td className="border-t border-slate-200 px-4 py-2">{falla.fechaReporte ?? "-"}</td>
      <td className="border-t border-slate-200 px-4 py-2">{falla.descripcionFalla ?? "-"}</td>
      <td className="border-t border-slate-200 px-4 py-2">
        {<BadgeEstatusFallas estatus={falla.estado as FallasEstatus | ""} />}
      </td>
      <td className="border-t border-slate-200 px-4 py-2">{falla.fechaCambioEstado ?? "-"}</td>
    </tr>
  );
};
