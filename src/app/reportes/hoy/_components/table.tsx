"use client";

import { Button, DataTable } from "@/components/ui";
import type { RouterOutputs } from "@/trpc/react";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { type GroupingState } from "@tanstack/react-table";
import { useState } from "react";
import { getColumnasReservas } from "./columns";

type Reserva = RouterOutputs["reservas"]["reservasLaboratorio"]["getAll"][number];

export const ReservasHoy = ({ reservas }: { reservas: Reserva[] }) => {
  const columns = getColumnasReservas();
  const [grouping, setGrouping] = useState<GroupingState>(["turnoTexto"]);

  return (
    <DataTable
      data={reservas ?? []}
      columns={columns}
      grouping={grouping}
      setGrouping={setGrouping}
      manualSorting
      action={{
        header: "Acciones",
        cell({ original }) {
          if (!original.tipo) return null;
          const endpoint = ["Cerrado", "Discrecional"].includes(original.tipo) ? "laboratorios" : "laboratorio_abierto";
          return (
            <Link href={`/${endpoint}/solicitudes/${original.id}`} passHref prefetch title="Ver reserva">
              <Button color={"outline"} className="h-8 w-8 px-1 py-1" variant={"icon"} icon={EyeIcon} />
            </Link>
          );
        },
      }}
    />
  );
};
