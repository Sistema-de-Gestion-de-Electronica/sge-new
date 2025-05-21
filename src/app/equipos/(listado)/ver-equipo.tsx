import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type VerEquipoModalProps = {
  equipoId: number;
};

export const VerEquipoModal = (props: VerEquipoModalProps) => {
  return (
    <Link key={props.equipoId} href={`/equipos/equipo/ver/${props.equipoId}`} passHref prefetch={false}>
      <Button color={"outline"} size="xs" variant={"icon"} icon={EyeIcon} type="button" title="Detalles de equipo" />
    </Link>
  );
};
