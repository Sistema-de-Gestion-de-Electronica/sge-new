import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type VerLibroModalProps = {
  libroId: number;
};

export const VerLibroModal = (props: VerLibroModalProps) => {
  return (
    <Link key={props.libroId} href={`/biblioteca/libros/ver/${props.libroId}`} passHref prefetch={false}>
      <Button
        color={"outline"}
        className="h-8 w-8 px-1 py-1"
        variant={"icon"}
        icon={EyeIcon}
        title="Detalles de libro"
      />
    </Link>
  );
};
