import PrestarLibroModal from "../_components/modal-prestar";
import DevolverLibroModal from "../_components/modal-devolver";
import { EstadoDisponible, EstadoPrestado } from "@/app/_components/prestado-disponible";

type RemoveLibroModalProps = {
  id: number;
  disponible: boolean;
};

export function EstadoLibro({ disponible }: RemoveLibroModalProps) {
  if (disponible) {
    return <EstadoDisponible />;
  }

  return <EstadoPrestado />;
}

export const PrestarDevolverLibro = ({ disponible, id }: RemoveLibroModalProps) => {
  if (disponible) {
    return <PrestarLibroModal libroId={id} />;
  }

  return <DevolverLibroModal libroId={id} />;
};
