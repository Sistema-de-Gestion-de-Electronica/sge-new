import { Button } from "@/components/ui/button";
import { FALLAS_ROUTE } from "@/shared/server-routes";
import { HistoryIcon } from "lucide-react";
import Link from "next/link";

type VerHistorialFallaProps = {
  fallaId?: number; // id de la falla (preferido)
  id?: number; // alias común en tablas
  equipoId?: number; // legacy: NO usar para historial, se mantiene por compatibilidad
};

const rutaBaseFallas = FALLAS_ROUTE.href.split("/")[1];

export const VerHistorialFallaModal = (props: VerHistorialFallaProps) => {
  const id = props.fallaId ?? props.id ?? props.equipoId;
  const href = `/${rutaBaseFallas}/reportes/${id}/historial`;

  return (
    <Link key={id} href={href} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1">
        <HistoryIcon size={16} />
      </Button>
    </Link>
  );
};
