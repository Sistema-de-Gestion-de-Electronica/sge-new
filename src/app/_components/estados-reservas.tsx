import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/components/utils";
import { EstadoAprobada } from "@/shared/estado-reserva";
import { ReservaEstatus } from "@/generated/prisma";

const reservaEstatus = [
  {
    id: ReservaEstatus.PENDIENTE,
    label: "Pendientes",
  },
  {
    id: EstadoAprobada,
    label: "Aprobadas",
  },
  {
    id: ReservaEstatus.FINALIZADA,
    label: "Pasadas",
  },
  {
    id: ReservaEstatus.CANCELADA,
    label: "Canceladas",
  },
  {
    id: ReservaEstatus.RECHAZADA,
    label: "Rechazadas",
  },
  {
    id: "",
    label: "Todas",
  },
];

export const EstadoReservaToString = ({
  handleEstadoChange,
  currentEstado,
}: {
  handleEstadoChange: (estado: ReservaEstatus) => void;
  currentEstado: string;
}) => {
  return (
    <ToggleGroup type="single" className="flex flex-row justify-between overflow-auto">
      {reservaEstatus.map(({ id: value, label }) => (
        <ToggleGroupItem
          key={value || "all"}
          value={value}
          aria-label={`Cambiar a ${label}`}
          className={cn("w-full text-center hover:bg-primary", {
            "bg-primary": currentEstado === value,
          })}
          onClick={() => handleEstadoChange(value as ReservaEstatus)}
        >
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
