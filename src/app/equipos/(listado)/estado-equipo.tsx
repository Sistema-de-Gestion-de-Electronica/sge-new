import PrestarEquipoModal from "../_components/modal-prestar";
import DevolverEquipoModal from "../_components/modal-devolver";
import { EstadoDisponible, EstadoPrestado } from "@/app/_components/prestado-disponible";

type EstadoEquipoProps = {
  id: number;
  disponible: boolean;
};

export function EstadoEquipo({ disponible }: EstadoEquipoProps) {
  if (disponible) {
    return <EstadoDisponible />;
  }

  return <EstadoPrestado />;
}

export const PrestarDevolverEquipo = ({ disponible, id }: EstadoEquipoProps) => {
  if (disponible) {
    return <PrestarEquipoModal equipoId={id} />;
  }

  return <DevolverEquipoModal equipoId={id} />;
};
