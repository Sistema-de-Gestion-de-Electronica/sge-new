import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, PersonStandingIcon, TextIcon, NotebookIcon, Mail, Copy } from "lucide-react";
import { Label, Button, toast } from "@/components/ui";
import {
  BadgeEstatusInscripcionEspecial,
  InscripcionEspecialEstatus,
} from "@/app/_components/badge-estatus-inscripcion-especial";
import { Skeleton } from "@/components/ui/skeleton";
import { DatoUsuarioReserva } from "@/app/_components/datos-usuario";
import { AlternativaHorario } from "./alternativas-horario";

function CardLoading() {
  return (
    <div className="p-4">
      <Skeleton className="mb-2 h-6 w-1/3" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

type InscripcionEspecialDetalleProps = {
  inscripcionEspecialId: number;
  mostrarCompleto?: boolean;
};

export function InscripcionEspecialDetalle({
  inscripcionEspecialId,
  mostrarCompleto,
}: InscripcionEspecialDetalleProps) {
  const {
    data: inscripcionEspecial,
    isLoading,
    isError,
    refetch: refetchInscripcion,
  } = api.inscripcionesEspeciales.getInscripcionEspecialPorId.useQuery({
    id: Number(inscripcionEspecialId),
  });

  if (isError) {
    return <div>Error al cargar inscripcion especial...</div>;
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
              <div>#{inscripcionEspecial?.id}</div>
            </CardTitle>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <BadgeEstatusInscripcionEspecial
                estatus={(inscripcionEspecial?.estado as InscripcionEspecialEstatus) ?? ""}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid auto-cols-max grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ...[
              {
                icon: <CalendarIcon className="h-4 w-4" />,
                label: "Fecha Solicitud",
                value: inscripcionEspecial?.fechaSolicitud,
              },
              {
                icon: <PersonStandingIcon className="h-4 w-4" />,
                label: "Solicitante",
                value: inscripcionEspecial?.solicitante ? (
                  <DatoUsuarioReserva usuario={inscripcionEspecial?.solicitante} />
                ) : (
                  "Sin asignar"
                ),
              },
              {
                icon: <CalendarIcon className="h-4 w-4" />,
                label: "Legajo",
                value: inscripcionEspecial?.solicitante?.legajo,
              },
              {
                icon: <NotebookIcon className="h-4 w-4" />,
                label: "Materias",
                value: inscripcionEspecial?.materias.join(", "),
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
        </div>
        <div className="col-span-3 space-y-2">
          <Label className="flex items-center font-semibold">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Label>
          <div className="flex items-center gap-2">
            <p className="text-xl">{inscripcionEspecial?.solicitante.email ?? "Sin informar"}</p>
            {inscripcionEspecial?.solicitante?.email && (
              <Button
                size="sm"
                variant="icon"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(inscripcionEspecial.solicitante.email);
                    toast.success("Email copiado al portapapeles");
                  } catch {
                    toast.error("No se pudo copiar el email");
                  }
                }}
                aria-label="Copiar email"
                icon={Copy}
              />
            )}
          </div>
        </div>
        <div className="col-span-3 space-y-2">
          <Label className="flex items-center font-semibold">
            <TextIcon className="mr-2 h-4 w-4" />
            Justificacion
          </Label>
          <div className="whitespace-pre-wrap rounded-md border border-gray-300 bg-gray-50 p-4">
            {inscripcionEspecial?.justificacion ?? "Sin informar"}
          </div>
        </div>
        <div className="col-span-3 flex flex-col items-start justify-center gap-4 md:flex-row">
          {inscripcionEspecial?.turnoAlternativa1 && (
            <AlternativaHorario titulo="Alternativa Horario 1" data={inscripcionEspecial?.turnoAlternativa1} />
          )}
          {inscripcionEspecial?.turnoAlternativa2 && (
            <AlternativaHorario titulo="Alternativa Horario 2" data={inscripcionEspecial?.turnoAlternativa2} />
          )}
        </div>

        

        {inscripcionEspecial?.estado === InscripcionEspecialEstatus.ACEPTADA_CON_CONDICION && (
          <div>
            <div>
              <div className="flex flex-row items-center justify-between">
                <Label className="flex items-center font-semibold">
                  <TextIcon className="mr-2 h-4 w-4" />
                  Respuesta
                </Label>
                <div className="flex flex-row items-center justify-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Fecha respuesta:{" "}
                  <span className="text-sm">{inscripcionEspecial?.fechaRespuesta ?? "Sin informar"}</span>
                </div>
              </div>
              <div className="mt-2 whitespace-pre-wrap rounded-md border border-gray-300 bg-yellow-50 p-4">
                {inscripcionEspecial?.respuesta ?? "Sin informar"}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
