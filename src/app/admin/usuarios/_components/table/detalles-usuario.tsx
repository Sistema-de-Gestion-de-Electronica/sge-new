import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type EditLibroModalProps = {
  usuarioId: string;
};

export const DetallesUsuarioPage = (props: EditLibroModalProps) => {
  return (
    <Link key={props.usuarioId} href={`/perfil/${props.usuarioId}`} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1" title="Detalles de usuario">
        <EyeIcon size={16} />
      </Button>
    </Link>
  );
};
