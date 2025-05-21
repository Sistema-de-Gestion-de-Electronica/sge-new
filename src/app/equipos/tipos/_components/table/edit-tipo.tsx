import { Button } from "@/components/ui/button";
import { EQUIPOS_ROUTE } from "@/shared/server-routes";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

type EditTipoModalProps = {
  tipoId: number;
};

const rutaEquipos = EQUIPOS_ROUTE;

export const EditarTipoModal = (props: EditTipoModalProps) => {
  return (
    <Link key={props.tipoId} href={`${rutaEquipos.href}/tipos/${props.tipoId}`} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1" title="Editar tipo">
        <PencilIcon size={16} />
      </Button>
    </Link>
  );
};
