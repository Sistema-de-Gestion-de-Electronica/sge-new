import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  PersonStandingIcon,
  TextIcon,
  FlaskConicalIcon,
  WrenchIcon,
  BadgeDollarSignIcon,
  ReceiptTextIcon,
} from "lucide-react";
import { Label, Button, toast } from "@/components/ui";
import { BadgeEstatusConsulta, ConsultaEstatus } from "@/app/ventanilla/_components/badge-estatus-consulta";
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

type ConsultasDetalleProps = {
  consultaId: number;
  mostrarCompleto?: boolean;
};

export function ConsultasDetalle({ consultaId, mostrarCompleto }: ConsultasDetalleProps) {
  const {
    data: consulta,
    isLoading,
    isError,
    refetch: refetchConsulta,
  } = api.ventanilla.getConsultaById.useQuery({
    id: Number(consultaId),
  });

  if (isError) {
    return <div>Error al cargar la consulta...</div>;
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
              <div>#{consulta?.id}</div>
            </CardTitle>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <BadgeEstatusConsulta estatus={(consulta?.estado as ConsultaEstatus) ?? ""} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid auto-cols-max grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ...[
              {
                icon: <FlaskConicalIcon className="h-4 w-4" />,
                label: "Nombre",
                value: consulta?.nombre,
              },
              {
                icon: <WrenchIcon className="h-4 w-4" />,
                label: "Apellido",
                value: consulta?.apellido,
              },
              {
                icon: <BadgeDollarSignIcon className="h-4 w-4" />,
                label: "Legajo",
                value: consulta?.legajo,
              },
              {
                icon: <ReceiptTextIcon className="h-4 w-4" />,
                label: "Email",
                value: consulta?.email,
              },
              {
                icon: <CalendarIcon className="h-4 w-4" />,
                label: "Fecha Consulta",
                value: consulta?.fechaConsulta,
              },
              {
                icon: <CalendarIcon className="h-4 w-4" />,
                label: "Fecha Respuesta",
                value: consulta?.fechaRespuesta,
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
                <p className="text-sm">{value instanceof Date ? value.toLocaleDateString() : value}</p>
              </div>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <div className="flex flex-row space-x-2">
              <div className="flex items-start justify-center">
                <TextIcon className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left">
                <Label className="text-xs font-semibold">Consulta</Label>
                <p className="text-sm">{consulta?.consulta}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
