import { Button } from "@/components/ui/button";
import { FALLAS_ROUTE } from "@/shared/server-routes";
import { HistoryIcon } from "lucide-react";
import Link from "next/link";

type VerFallaModalProps = {
  fallaID: number;
};

const rutaBaseFallas = FALLAS_ROUTE.href.split("/")[1];

export const VerHistorialFallaModal = (props: VerFallaModalProps) => {
  const href = `/${rutaBaseFallas}/reportes/${props.fallaID}/historial`;

  return (
    <Link key={props.fallaID} href={href} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1">
        <HistoryIcon size={16} />
      </Button>
    </Link>
  );
};
