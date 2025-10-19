import { Button } from "@/components/ui/button";
import { INSCRIPCIONES_ESPECIALES_ROUTE } from "@/shared/server-routes";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type VerInscripcionEspecialModalProps = {
  inscripcionEspecialID: number;
};

const rutaSolicitud =
  INSCRIPCIONES_ESPECIALES_ROUTE.subRutas !== undefined ? INSCRIPCIONES_ESPECIALES_ROUTE?.subRutas[0] : undefined;

export const VerInscripcionEspecialModal = (props: VerInscripcionEspecialModalProps) => {
  return (
    <Link key={props.inscripcionEspecialID} href={`${rutaSolicitud?.href}/${props.inscripcionEspecialID}`} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1" title="Detalles de inscripción especial">
        <EyeIcon size={16} />
      </Button>
    </Link>
  );
};
