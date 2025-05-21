import { Button } from "@/components/ui/button";
import { ADMIN_ROUTE } from "@/shared/server-routes";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

type EditLibroModalProps = {
  rolId: number;
};

const rutaAdmin = ADMIN_ROUTE;

export const EditarRolModal = (props: EditLibroModalProps) => {
  return (
    <Link key={props.rolId} href={`${rutaAdmin.href}/roles/${props.rolId}`} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1" title="Editar rol">
        <PencilIcon size={16} />
      </Button>
    </Link>
  );
};
