import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, PersonStandingIcon, TextIcon, NotebookIcon, Mail, Copy, Printer } from "lucide-react";
import { Label, Button, toast } from "@/components/ui";
import {
  BadgeEstatusInscripcionEspecial,
  InscripcionEspecialEstatus,
} from "@/app/_components/badge-estatus-inscripcion-especial";
import { Skeleton } from "@/components/ui/skeleton";
import { DatoUsuarioReserva } from "@/app/_components/datos-usuario";
import { AlternativaHorario } from "./alternativas-horario";
import { getStatusText } from "@/app/_components/badge-estatus-inscripcion-especial";

function CardLoading() {
  return (
    <div className="p-4">
      <Skeleton className="mb-2 h-6 w-1/3" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

const handlePrint = () => {
  const printContents = document.getElementById("print-inscripcion-especial")?.innerHTML;
  if (!printContents) return;

  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};

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
      <CardHeader className="print:hidden">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex-grow text-center sm:text-left">
            <CardTitle className="mb-1 flex flex-row justify-between text-2xl">
              <div>#{inscripcionEspecial?.id}</div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handlePrint} aria-label="Imprimir">
                  <Printer className="mr-2 h-4 w-4" /> Imprimir
                </Button>
              </div>
            </CardTitle>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <BadgeEstatusInscripcionEspecial
                estatus={(inscripcionEspecial?.estado as InscripcionEspecialEstatus) ?? ""}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 print:hidden">
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
              ...((inscripcionEspecial?.materiasAdeudadas?.length ?? 0) > 0
                ? [
                    {
                      icon: <NotebookIcon className="h-4 w-4" />,
                      label: "Materias adeudadas",
                      value: inscripcionEspecial?.materiasAdeudadas.join(", "),
                    },
                  ]
                : []),
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

      {/* Hoja de firmas para impresión */}
      <div className="hidden print:block">
        <div id="print-inscripcion-especial" className="mx-10 my-8 bg-white p-8 text-black">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-center text-xl font-semibold">Constancia de Inscripción Especial</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <span className="font-semibold">N° Solicitud:</span> {inscripcionEspecial?.id}
                </p>
                <p>
                  <span className="font-semibold">Fecha solicitud:</span> {inscripcionEspecial?.fechaSolicitud}
                </p>
                <p>
                  <span className="font-semibold">Estado:</span>{" "}
                  {getStatusText(inscripcionEspecial?.estado as InscripcionEspecialEstatus)}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Alumno:</span> {inscripcionEspecial?.solicitante?.apellido}{" "}
                  {inscripcionEspecial?.solicitante?.nombre}
                </p>
                <p>
                  <span className="font-semibold">Legajo:</span> {inscripcionEspecial?.solicitante?.legajo}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {inscripcionEspecial?.solicitante?.email}
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="font-semibold">Materias solicitadas:</p>
              <p>{inscripcionEspecial?.materias?.join(", ") ?? "-"}</p>
              {(inscripcionEspecial?.materiasAdeudadas?.length ?? 0) > 0 && (
                <div className="mt-2">
                  <p className="font-semibold">Materias adeudadas:</p>
                  <p>{inscripcionEspecial?.materiasAdeudadas?.join(", ")}</p>
                </div>
              )}
              {inscripcionEspecial?.estado === "ACEPTADA_CON_CONDICION" && (
                <div className="mt-4">
                  <p className="font-semibold">Condición:</p>
                  <p className="whitespace-pre-wrap">{inscripcionEspecial?.respuesta ?? "-"}</p>
                  {inscripcionEspecial?.fechaRespuesta && (
                    <p className="mt-1 text-xs">
                      <span className="font-semibold">Fecha respuesta:</span> {inscripcionEspecial.fechaRespuesta}
                    </p>
                  )}
                </div>
              )}
              {((inscripcionEspecial?.turnoAlternativa1 ?? "") !== "" ||
                (inscripcionEspecial?.turnoAlternativa2 ?? "") !== "") && (
                <div className="mt-4">
                  <p className="font-semibold">Alternativas de horario:</p>
                  {inscripcionEspecial?.turnoAlternativa1 && (
                    <p className="mt-1 text-sm">1) {inscripcionEspecial.turnoAlternativa1}</p>
                  )}
                  {inscripcionEspecial?.turnoAlternativa2 && (
                    <p className="mt-1 text-sm">2) {inscripcionEspecial.turnoAlternativa2}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8">
            {/* Firma Alumno */}
            <div className="flex flex-col items-center">
              <div className="mt-10 w-full border-b-2 border-black" />
              <p className="mt-2 text-center text-sm">Firma del Alumno</p>
              <div className="mt-8 w-full border-b border-black" />
              <p className="mt-1 text-center text-sm">Aclaración</p>
            </div>

            {/* Firma Administrador */}
            <div className="flex flex-col items-center">
              <div className="mt-10 w-full border-b-2 border-black" />
              <p className="mt-2 text-center text-sm">Firma del Administrador de Inscripciones Especiales</p>
              <div className="mt-8 w-full border-b border-black" />
              <p className="mt-1 text-center text-sm">Aclaración</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-semibold">Fecha:</p>
              <div className="mt-2 w-40 border-b border-black" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
