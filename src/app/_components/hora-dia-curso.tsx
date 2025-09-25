import { calcularTurnoHora } from "@/shared/get-date";
import { type TurnoCurso } from "@/generated/prisma";

type HoraDiaProps = {
  dia1: string;
  dia2?: string | null;
  horaInicio1: string | number;
  horaInicio2?: string | number | null;
  duracion1: string | number;
  duracion2?: string | number | null;
  diaDeHoy: string;
  turno: TurnoCurso;
};

export const HoraDia = ({
  dia1,
  dia2,
  horaInicio1,
  horaInicio2,
  duracion1,
  duracion2,
  diaDeHoy,
  turno,
}: HoraDiaProps) => {
  const h1 = Number(horaInicio1 ?? 0);
  const h2 = Number(horaInicio2 ?? 0);
  const d1 = Number(duracion1 ?? 0);
  const d2 = Number(duracion2 ?? 0);

  const slots = [0, 1, 2, 3, 4, 5, 6];

  const esHoyDia1 = dia1 === diaDeHoy;
  const esHoyDia2 = dia2 === diaDeHoy;

  const start = esHoyDia1 ? h1 : esHoyDia2 ? h2 : null;
  const end   = esHoyDia1 ? h1 + d1 : esHoyDia2 ? h2 + d2 : null;
  const hayClase = start !== null && end !== null;

  const labelHorario = hayClase
    ? calcularTurnoHora(turno, start as number, (end as number) - 1)
    : null;

  const CELL = 28; // ancho del bloque (más grande para el número)
  const GAP  = 4;  // espacio entre bloques
  const GRID_WIDTH = 7 * CELL + 6 * GAP;

  const chipLeft =
    hayClase ? (start as number) * (CELL + GAP) : 0;

  const chipWidth =
    hayClase
      ? (end as number - (start as number)) * CELL +
        (end as number - (start as number) - 1) * GAP
      : 0;

  return (
    <div className="flex flex-col items-start">
      <div
        className="relative grid grid-cols-7 gap-[4px]"
        style={{ width: GRID_WIDTH }}
      >
        {/* Bloques con números 0..6 */}
        {slots.map((s) => (
          <div
            key={s}
            className="flex h-7 w-7 items-center justify-center rounded bg-slate-200 text-sm font-medium text-slate-700"
          >
            {s}
          </div>
        ))}

        {/* Chip azul con rango horario */}
        {hayClase && (
          <div
            className="absolute top-0 h-7 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-semibold shadow-sm"
            style={{ left: chipLeft, width: Math.max(chipWidth, CELL) }}
          >
            {labelHorario}
          </div>
        )}
      </div>
    </div>
  );
};
