import { Button } from "@/components/ui/button";
import { LABORATORIO_ROUTE } from "@/shared/server-routes";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type VerReservaModalProps = {
  reservaID: number;
};

const rutaSolicitud = LABORATORIO_ROUTE.subRutas !== undefined ? LABORATORIO_ROUTE?.subRutas[5] : undefined;

export const VerReservaModal = (props: VerReservaModalProps) => {
  return (
    <Link key={props.reservaID} href={`${rutaSolicitud?.href}/${props.reservaID}`} passHref prefetch={false}>
      <Button
        color={"outline"}
        className="h-8 w-8 px-1 py-1"
        variant={"icon"}
        icon={EyeIcon}
        title="Detalles de reserva"
      />
    </Link>
  );
};
