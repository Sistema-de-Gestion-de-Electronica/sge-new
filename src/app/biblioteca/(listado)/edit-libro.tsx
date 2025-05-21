import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

type EditLibroModalProps = {
  libroId: number;
};

export const EditLibroModal = (props: EditLibroModalProps) => {
  return (
    <Link key={props.libroId} href={`/biblioteca/libros/${props.libroId}`} passHref prefetch={false}>
      <Button
        type="button"
        color={"outline"}
        className="h-8 w-8 px-1 py-1"
        variant={"icon"}
        icon={PencilIcon}
        title="Editar libro"
      />
    </Link>
  );
};
