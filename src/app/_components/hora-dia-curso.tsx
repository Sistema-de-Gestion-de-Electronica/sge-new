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
  horaInicio1 = Number(horaInicio1);
  horaInicio2 = Number(horaInicio2);
  duracion1 = Number(duracion1);
  duracion2 = Number(duracion2);

  const horas = [0, 1, 2, 3, 4, 5, 6];

  const esHoyDia1 = dia1 === diaDeHoy;
  const esHoyDia2 = dia2 === diaDeHoy;

  const finClase1 = esHoyDia1 ? horaInicio1 + duracion1 : 0;
  const finClase2 = esHoyDia2 ? horaInicio2 + duracion2 : 0;

  return (
    <div className="flex flex-col space-y-0">
      <div className="flex flex-row space-x-0">
        {horas.map((hora) => {
          if (esHoyDia1) {
            if (esHoyDia1 && hora >= horaInicio1 && hora < finClase1) {
              return (
                <div key={hora} className="flex h-5 w-5  justify-center bg-primary/20">
                  {hora}
                </div>
              );
            }
          }

          if (esHoyDia2 && hora >= horaInicio2 && hora < finClase2) {
            return (
              <div key={`hora2-${hora}`} className="flex h-5 w-5 justify-center bg-primary/20">
                {hora}
              </div>
            );
          }

          return (
            <div key={hora} className="flex h-5 w-5 justify-center bg-slate-300">
              {hora}
            </div>
          );
        })}
      </div>
      <span className="text-center text-xs">
        {esHoyDia1 ? (
          <span>{calcularTurnoHora(turno, horaInicio1, finClase1 - 1)}</span>
        ) : esHoyDia2 ? (
          <span>{calcularTurnoHora(turno, horaInicio2, finClase2 - 1)}</span>
        ) : null}
      </span>
    </div>
  );
};
