import Link from "next/link";
import type { laboratoriosRouter } from "@/server/api/routers/laboratorios";
import type { inferRouterOutputs } from "@trpc/server";
import { format, isBefore } from "date-fns";
import { clsx } from "clsx";

export type Reserva = { id: number; materia?: string; division: string; profesor: string };

export type Laboratorio = inferRouterOutputs<typeof laboratoriosRouter>["getAll"][number] & {
  reservas: Record<string, Reserva[]>;
};

type ReservaBadgeProps = { reserva: Reserva; color: number; date: Date; today: Date };

type LabBadgeProps = {
  index: number;
  today: Date;
  laboratorio: Laboratorio;
  week: Date[];
  color: number;
};

const COLORS = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
  "bg-cyan-200",
  "bg-teal-200",
  "bg-lime-200",
];

export function ReservaBadge({ reserva, color, date, today }: ReservaBadgeProps) {
  return (
    <Link key={reserva.id} href={`/laboratorios/solicitudes/${reserva.id}`} passHref prefetch={false}>
      <div
        className={clsx(
          "mx-1 mb-1 rounded-md px-2 py-1",
          !color && "mt-1",
          isBefore(date, today) ? "border border-gray-100" : COLORS[color],
        )}
      >
        <strong>{`${reserva.materia}${reserva.division}`}</strong> {reserva.profesor}
      </div>
    </Link>
  );
}

export function LabBadge({ index, laboratorio, today, week, color }: LabBadgeProps) {
  return (
    <div key={index}>
      <div
        className={clsx(
          "mx-1 mb-1 rounded-md px-2",
          !color && "mt-1",
          week.some((date) => format(date, "yyyy-MM-dd") in laboratorio.reservas && !isBefore(date, today)) &&
            COLORS[color] + " py-1",
        )}
      >
        {laboratorio.nombre}
      </div>
    </div>
  );
}
