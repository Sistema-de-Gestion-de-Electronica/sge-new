import { Button } from "@/components/ui/button";
import { VENTANILLA_ROUTE } from "@/shared/server-routes";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type VerConsultaModalProps = {
  consultaId: number;
};

const rutaSolicitud = VENTANILLA_ROUTE.subRutas !== undefined ? VENTANILLA_ROUTE?.subRutas[1] : undefined;

export const VerConsultaModal = (props: VerConsultaModalProps) => {
  return (
    <Link key={props.consultaId} href={`${rutaSolicitud?.href}/${props.consultaId}`} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1">
        <EyeIcon size={16} />
      </Button>
    </Link>
  );
};
