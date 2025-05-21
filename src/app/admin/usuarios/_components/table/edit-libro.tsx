import { Button } from "@/components/ui/button";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

type EditLibroModalProps = {
  usuarioId: string;
};

const rutaAdmin = ADMIN_ROUTE;

export const EditarUsuarioModal = (props: EditLibroModalProps) => {
  return (
    <Link key={props.usuarioId} href={`${rutaAdmin.href}/usuarios/${props.usuarioId}`} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1" title="Editar usuario">
        <PencilIcon size={16} />
      </Button>
    </Link>
  );
};
