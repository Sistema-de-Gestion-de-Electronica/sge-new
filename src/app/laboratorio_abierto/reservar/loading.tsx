import { Button } from "@/components/ui";
import LoadingLaboratorioAbiertoReserva from "./_components/table/loading-reserva-laboratorio-abierto";
import { LABORATORIO_ABIERTO_ROUTE } from "@/shared/server-routes";
import PageLayout from "@/components/ui/template/page-template";

const subRutas = LABORATORIO_ABIERTO_ROUTE.subRutas ?? [];

export default function CursoLoading() {
  return (
    <PageLayout route={LABORATORIO_ABIERTO_ROUTE}>
      <div className="relative flex w-full flex-col items-center justify-between space-y-2 md:flex-row-reverse  md:space-x-1.5 md:space-y-0">
        <div className="relative flex w-full flex-row justify-end md:w-auto md:basis-1/3">
          {subRutas.map((subRuta, index) => (
            <Button key={index} color={"primary"} isLoading>
              {subRuta.label}
            </Button>
          ))}
        </div>

        <div className="w-full md:basis-1/3"></div>
      </div>

      <LoadingLaboratorioAbiertoReserva />
    </PageLayout>
  );
}
