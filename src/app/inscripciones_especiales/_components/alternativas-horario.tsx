import { Fragment } from "react";
import { ClockIcon } from "lucide-react";

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];
const turnos = ["Mañana", "Tarde", "Noche"];

type AlternativaHorarioProps = {
    titulo: string;
    data: string; // Formato: Dia: horario | Dia: horario
}

export function AlternativaHorario({ titulo, data }: AlternativaHorarioProps) {
  const horarios: Record<string, string[]> = {};
  data.split("|").forEach((segmento) => {
    const [diaRaw, turnosRaw] = segmento.split(":");
    const dia = diaRaw ? diaRaw.trim() : "";
    const listaTurnos = turnosRaw
      ? turnosRaw.split(",").map((t) => t.trim())
      : [];
    horarios[dia] = listaTurnos;
  });

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <div className="p-1">
        <ClockIcon className="m-2 inline-block h-4 w-4" />
        <strong>{titulo}</strong>
      </div>

      {/* Tabla de horarios */}
      <div className="grid grid-cols-[100px_repeat(6,1fr)] border rounded-lg overflow-hidden text-sm">
        {/* Encabezado */}
        <div className="bg-gray-700 text-white font-semibold p-2 text-center">Turno</div>
        {dias.map((dia) => (
          <div key={dia} className="bg-gray-700 text-white font-semibold p-2 text-center">
            {dia}
          </div>
        ))}

        {/* Filas */}
        {turnos.map((turno) => (
          <Fragment key={turno}>
            <div className="bg-gray-100 font-medium p-2 text-center border-t">{turno}</div>
            {dias.map((dia) => {
              const match = horarios[dia]?.includes(turno);
              return (
                <div
                  key={`${dia}-${turno}`}
                  className={`p-2 text-center border-t ${
                    match ? "bg-green-100 text-green-700 font-semibold" : "text-gray-400"
                  }`}
                >
                  {match ? "✔" : "-"}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
