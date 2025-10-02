import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, PersonStandingIcon, TextIcon, NotebookIcon } from "lucide-react";
import { Label, Button, toast } from "@/components/ui";
import { BadgeEstatusFallas, FallasEstatus } from "@/app/fallas/_components/badge-estatus-fallas";
import { Skeleton } from "@/components/ui/skeleton";
import { DatoUsuarioReserva } from "@/app/_components/datos-usuario";

function CardLoading() {
  return (
    <div className="p-4">
      <Skeleton className="mb-2 h-6 w-1/3" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

type FallasDetalleProps = {
  fallaId: number;
  mostrarCompleto?: boolean;
};

export function FallasDetalle({ fallaId, mostrarCompleto }: FallasDetalleProps) {
  const {
    data: falla,
    isLoading,
    isError,
    refetch: refetchFalla,
  } = api.fallas.getFallasPorId.useQuery({
    id: Number(fallaId),
  });

  if (isError) {
    return <div>Error al cargar falla...</div>;
  }

  if (isLoading) {
    return <CardLoading />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex-grow text-center sm:text-left">
            <CardTitle className="mb-1 flex flex-row justify-between text-2xl">
              <div>#{falla?.id}</div>
            </CardTitle>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <BadgeEstatusFallas estatus={(falla?.estado as FallasEstatus) ?? ""} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid auto-cols-max grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ...[
              {
                icon: <NotebookIcon className="h-4 w-4" />,
                label: "Laboratorio",
                value: falla?.laboratorio,
              },
              {
                icon: <NotebookIcon className="h-4 w-4" />,
                label: "Equipo",
                value: falla?.equipo,
              },
              {
                icon: <NotebookIcon className="h-4 w-4" />,
                label: "Marca",
                value: falla?.marca,
              },
              {
                icon: <NotebookIcon className="h-4 w-4" />,
                label: "Modelo",
                value: falla?.modelo,
              },
              {
                icon: <CalendarIcon className="h-4 w-4" />,
                label: "Fecha Reporte",
                value: falla?.fechaReporte,
              },
              {
                icon: <PersonStandingIcon className="h-4 w-4" />,
                label: "Reportado Por",
                value: <DatoUsuarioReserva usuario={falla?.reportadoPor} />,
              },
              {
                icon: <PersonStandingIcon className="h-4 w-4" />,
                label: "Asignado A",
                value: <DatoUsuarioReserva usuario={falla?.asignadoA} />,
              },
            ],
          ].map(({ icon, label, value }, index, array) => (
            <div
              key={index}
              className={`flex flex-row space-x-2 ${index === array.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <div className="flex items-start justify-center">{icon}</div>
              <div className="flex flex-col text-left">
                <Label className="text-xs font-semibold">{label}</Label>
                <p className="text-sm">{value}</p>
              </div>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-row space-x-2">
              <div className="flex items-start justify-center">
                <TextIcon className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left">
                <Label className="text-xs font-semibold">Fallas</Label>
                <p className="text-sm">{falla?.fallas?.join(", ") ?? "-"}</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-row space-x-2">
              <div className="flex items-start justify-center">
                <TextIcon className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left">
                <Label className="text-xs font-semibold">Descripcion</Label>
                <p className="text-sm">{falla?.descripcionFalla ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
