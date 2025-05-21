import { Badge } from "@/components/ui/badge";

export const EstadoDisponible = () => {
  return (
    <Badge variant={"default"} color={"success"} className="min-w-32 text-center">
      <div className="w-full text-[#00A873]">Disponible</div>
    </Badge>
  );
};

export const EstadoPrestado = () => {
  return (
    <Badge variant={"default"} color={"danger"} className="min-w-32 text-center">
      <div className="w-full text-[#E3412D]">Prestado</div>
    </Badge>
  );
};
