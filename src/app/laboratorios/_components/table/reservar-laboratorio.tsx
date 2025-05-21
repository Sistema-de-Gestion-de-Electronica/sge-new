import { Button } from "@/components/ui";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type EditCursoModalProps = {
  cursoId: number;
};

export const ReservarLaboratorioCerradoModal = (props: EditCursoModalProps) => {
  const pathname = usePathname();

  return (
    <Link key={props.cursoId} href={`${pathname}/${props.cursoId}`} passHref prefetch={true} title="Reservar curso">
      <Button type="button" color={"outline"} className="space-x-1 px-2" variant={"default"}>
        <CalendarCheck className="h-4 w-4" />
        <div className="flex flex-row gap-x-1 ">reservar</div>{" "}
      </Button>
    </Link>
  );
};
