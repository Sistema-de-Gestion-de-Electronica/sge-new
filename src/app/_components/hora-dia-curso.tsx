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
  /** altura visual de la fila donde va el chip (en px) */
  rowHeightPx?: number;
  /** ancho de cada columna/slot (en px) */
  cellPx?: number;
  /** separación entre columnas (en px) */
  gapPx?: number;
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
  rowHeightPx = 30, // ≈ h-7/h-8; ajustá a tu tabla
  cellPx = 24,      // columnas más estrechas
  gapPx = 2,        // columnas más juntas
}: HoraDiaProps) => {
  const h1 = Number(horaInicio1 ?? 0);
  const h2 = Number(horaInicio2 ?? 0);
  const d1 = Number(duracion1 ?? 0);
  const d2 = Number(duracion2 ?? 0);

  const esHoyDia1 = dia1 === diaDeHoy;
  const esHoyDia2 = dia2 === diaDeHoy;

  const start = esHoyDia1 ? h1 : esHoyDia2 ? h2 : null;
  const end   = esHoyDia1 ? h1 + d1 : esHoyDia2 ? h2 + d2 : null;
  const hayClase = start !== null && end !== null;

  const labelHorario = hayClase
    ? calcularTurnoHora(turno, start as number, (end as number) - 1)
    : null;

  // grid total width = 7 columnas + 6 gaps
  const GRID_WIDTH = 7 * cellPx + 6 * gapPx;

  // posición/ancho del chip en función de la grilla
  const chipLeft = hayClase ? (start as number) * (cellPx + gapPx) : 0;
  const dur = hayClase ? (end as number - (start as number)) : 0;
  const chipWidth = hayClase
    ? dur * cellPx + Math.max(0, dur - 1) * gapPx
    : 0;

  return (
    <div className="flex flex-col items-start" style={{ height: rowHeightPx }}>
      <div
        className="relative grid grid-cols-7"
        style={{
          width: GRID_WIDTH,
          columnGap: gapPx,
          height: rowHeightPx, // para que el chip herede la altura de la fila
        }}
      >
        {/* Chip azul con rango horario, centrado verticalmente */}
        {hayClase && (
          <div
            className="absolute left-0 flex items-center justify-center rounded-lg bg-primary text-black text-xs font-semibold shadow-sm"
            style={{
              left: chipLeft,
              width: Math.max(chipWidth, cellPx),
              height: rowHeightPx,     // misma altura que la fila
              top: "50%",              // centrado vertical
              transform: "translateY(-50%)",
            }}
          >
            {labelHorario}
          </div>
        )}
      </div>
    </div>
  );
};
