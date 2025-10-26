"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { api } from "@/trpc/react";
import { Button, FormInput, toast } from "@/components/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, Plus, Edit, Save, X } from "lucide-react";

const periodoSchema = z
  .object({
    fechaInicio: z
      .string()
      .min(1, "La fecha de inicio es requerida")
      .transform((str) => new Date(str)),
    fechaFin: z
      .string()
      .min(1, "La fecha de fin es requerida")
      .transform((str) => new Date(str)),
  })
  .refine((data) => data.fechaFin > data.fechaInicio, {
    message: "La fecha de fin debe ser posterior a la fecha de inicio",
    path: ["fechaFin"],
  });

type PeriodoFormData = {
  fechaInicio: string;
  fechaFin: string;
};

export default function GestionarPeriodosInscripcionEspecial() {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const { data: ultimoPeriodo, refetch: refetchUltimoPeriodo } =
    api.inscripcionesEspeciales.getUltimoPeriodoInscripcionEspecial.useQuery({});
  const { data: periodoActivo } = api.inscripcionesEspeciales.getPeriodoInscripcionEspecialActual.useQuery({});

  const crearPeriodo = api.inscripcionesEspeciales.crearPeriodoInscripcionEspecial.useMutation({
    onSuccess: () => {
      toast.success("Período creado exitosamente");
      setIsCreating(false);
      form.reset();
      void refetchUltimoPeriodo();
    },
    onError: (error) => {
      toast.error(`Error al crear el período: ${error.message}`);
    },
  });

  const actualizarPeriodo = api.inscripcionesEspeciales.actualizarPeriodoInscripcionEspecial.useMutation({
    onSuccess: () => {
      toast.success("Período actualizado exitosamente");
      setIsEditing(false);
      form.reset();
      void refetchUltimoPeriodo();
    },
    onError: (error) => {
      toast.error(`Error al actualizar el período: ${error.message}`);
    },
  });

  const form = useForm<PeriodoFormData>({
    resolver: zodResolver(periodoSchema),
    defaultValues: {
      fechaInicio: ultimoPeriodo
        ? new Date(ultimoPeriodo.fechaInicio).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
      fechaFin: ultimoPeriodo
        ? new Date(ultimoPeriodo.fechaFin).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
    },
  });

  const { handleSubmit, control, reset, setValue } = form;

  const onSubmit = (data: PeriodoFormData) => {
    if (isCreating) {
      crearPeriodo.mutate({
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: new Date(data.fechaFin),
      });
    } else if (isEditing && ultimoPeriodo) {
      actualizarPeriodo.mutate({
        id: ultimoPeriodo.id,
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: new Date(data.fechaFin),
      });
    }
  };

  const handleEdit = () => {
    if (ultimoPeriodo) {
      setValue("fechaInicio", new Date(ultimoPeriodo.fechaInicio).toISOString().slice(0, 16));
      setValue("fechaFin", new Date(ultimoPeriodo.fechaFin).toISOString().slice(0, 16));
      setIsEditing(true);
      setIsCreating(false);
    }
  };

  const handleCreate = () => {
    setValue("fechaInicio", new Date().toISOString().slice(0, 16));
    setValue("fechaFin", new Date().toISOString().slice(0, 16));
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
    reset();
  };

  const isFormDisabled = crearPeriodo.isPending || actualizarPeriodo.isPending;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestión de Períodos de Inscripción Especial</h1>
        <p className="text-muted-foreground">
          Administra los períodos durante los cuales los estudiantes pueden solicitar inscripciones especiales.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Estado Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          {periodoActivo ? (
            <Alert className="border-green-200 bg-green-50">
              <Calendar className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Período Activo:</strong> Las inscripciones especiales están abiertas.
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      <strong>Inicio:</strong>{" "}
                      {format(new Date(periodoActivo.fechaInicio), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", {
                        locale: es,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      <strong>Fin:</strong>{" "}
                      {format(new Date(periodoActivo.fechaFin), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                    </span>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-orange-200 bg-orange-50">
              <Calendar className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Sin Período Activo:</strong> No hay un período de inscripciones especiales abierto actualmente.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {ultimoPeriodo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Último Período Registrado
            </CardTitle>
            <CardDescription>Información del período más reciente de inscripciones especiales.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fecha de Inicio</label>
                  <p className="text-lg">
                    {format(new Date(ultimoPeriodo.fechaInicio), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", {
                      locale: es,
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Fecha de Fin</label>
                  <p className="text-lg">
                    {format(new Date(ultimoPeriodo.fechaFin), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Creado por</label>
                <p className="text-lg">
                  {ultimoPeriodo.usuarioCreador.nombre} {ultimoPeriodo.usuarioCreador.apellido} (
                  {ultimoPeriodo.usuarioCreador.legajo})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(isEditing || isCreating) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isEditing ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {isEditing ? "Editar Período" : "Crear Nuevo Período"}
            </CardTitle>
            <CardDescription>
              {isEditing
                ? "Modifica las fechas del último período registrado."
                : "Crea un nuevo período de inscripciones especiales."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormInput
                    name="fechaInicio"
                    control={control}
                    label="Fecha de Inicio"
                    type="datetime-local"
                    disabled={isFormDisabled}
                    required
                  />
                  <FormInput
                    name="fechaFin"
                    control={control}
                    label="Fecha de Fin"
                    type="datetime-local"
                    disabled={isFormDisabled}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isFormDisabled} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {isEditing ? "Actualizar" : "Crear"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={isFormDisabled}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      )}

      {!isEditing && !isCreating && (
        <div className="flex gap-2">
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Crear Nuevo Período
          </Button>
          {ultimoPeriodo && (
            <Button onClick={handleEdit} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar Último Período
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
