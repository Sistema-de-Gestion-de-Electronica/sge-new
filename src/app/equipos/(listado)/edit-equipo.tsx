import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

type EditEquipoModalProps = {
  equipoId: number;
};

export const EditarEquipoModal = (props: EditEquipoModalProps) => {
  return (
    <Link key={props.equipoId} href={`/equipos/equipo/${props.equipoId}`} passHref prefetch={false}>
      <Button color={"outline"} size="xs" variant={"icon"} icon={PencilIcon} type="button" title="Editar equipo" />
    </Link>
  );
};
