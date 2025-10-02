import { Button } from "@/components/ui/button";
import { FALLAS_ROUTE } from "@/shared/server-routes";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

type VerFallaModalProps = {
  fallaID: number;
};

const rutaSolicitud =
  FALLAS_ROUTE.subRutas !== undefined ? FALLAS_ROUTE?.subRutas[0] : undefined;

export const VerFallaModal = (props: VerFallaModalProps) => {
  return (
    <Link key={props.fallaID} href={`${rutaSolicitud?.href}/${props.fallaID}`} passHref prefetch={false}>
      <Button color={"outline"} className="h-8 w-8 px-1 py-1">
        <EyeIcon size={16} />
      </Button>
    </Link>
  );
};
