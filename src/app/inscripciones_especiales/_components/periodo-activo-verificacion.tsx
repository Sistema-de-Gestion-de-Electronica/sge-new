"use client";

import { api } from "@/trpc/react";
import { SgeNombre } from "@/generated/prisma";
import { useTienePermisos } from "@/app/_hooks/use-tiene-permisos";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface PeriodoActivoVerificacionProps {
  children: React.ReactNode;
}

export default function PeriodoActivoVerificacion({ children }: PeriodoActivoVerificacionProps) {
  const { tienePermisos: tienePermisosAdmin } = useTienePermisos([SgeNombre.INSCRIPCIONES_ESPECIALES_ADMIN]);

  const { data: periodoActivo, isLoading: isLoadingPeriodo } =
    api.inscripcionesEspeciales.verificarPeriodoActivo.useQuery();
  const { data: ultimoPeriodo, isLoading: isLoadingUltimo } =
    api.inscripcionesEspeciales.getUltimoPeriodoInscripcionEspecial.useQuery({});

  if (isLoadingPeriodo || isLoadingUltimo) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (tienePermisosAdmin) {
    return <div className="m-auto w-full max-w-4xl">{children}</div>;
  }

  if (!periodoActivo) {
    return (
      <div className="m-auto w-full max-w-4xl">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              Período de Inscripciones Especiales Cerrado
            </CardTitle>
            <CardDescription className="text-orange-700">
              Actualmente no hay un período activo para solicitar inscripciones especiales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ultimoPeriodo ? (
              <div className="space-y-4">
                <Alert>
                  <Calendar className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Último período registrado:</strong>
                    <br />
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          <strong>Inicio:</strong>{" "}
                          {format(new Date(ultimoPeriodo.fechaInicio), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", {
                            locale: es,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          <strong>Fin:</strong>{" "}
                          {format(new Date(ultimoPeriodo.fechaFin), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", {
                            locale: es,
                          })}
                        </span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-orange-600">
                  Para solicitar una inscripción especial, debe estar dentro del período habilitado. Contacte a la
                  administración para más información sobre los próximos períodos.
                </p>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No hay períodos de inscripción especial registrados. Contacte a la administración para más
                  información.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return <div className="m-auto w-full max-w-4xl">{children}</div>;
}
