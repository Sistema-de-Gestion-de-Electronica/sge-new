import { api } from "@/trpc/react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui";
import { FormTextarea } from "@/components/ui/textarea";
import { inputGestionarInscripcionEspecial } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { Checkbox } from "@/components/ui/checkbox";

type GestionarInscripcionEspecialFormData = z.infer<typeof inputGestionarInscripcionEspecial>;

interface InscripcionEspecialGestionProps {
  inscripcionEspecialId: number;
  onAprobar: () => void;
  onCancel: () => void;
  onRechazar: () => void;
}

export const InscripcionEspecialGestion = ({
  inscripcionEspecialId,
  onAprobar,
  onCancel,
  onRechazar,
}: InscripcionEspecialGestionProps) => {
  const utils = api.useUtils();
  const { isPending: estaAprobando, mutate: aprobarSolcitud } =
    api.inscripcionesEspeciales.aprobarInscripcionEspecial.useMutation();
  const { isPending: estaRechazando, mutate: rechazarSolicitud } =
    api.inscripcionesEspeciales.rechazarInscripcionEspecial.useMutation();
  const { data: inscripcionEspecialData } = api.inscripcionesEspeciales.getInscripcionEspecialPorId.useQuery({
    id: inscripcionEspecialId,
  });

  const formHook = useForm<GestionarInscripcionEspecialFormData>({
    mode: "onChange",
    resolver: zodResolver(inputGestionarInscripcionEspecial),
    defaultValues: {
      id: inscripcionEspecialId,
      respuesta: "",
      alumnoContactado: inscripcionEspecialData?.alumnoContactado ?? false,
      alumnoAsistio: inscripcionEspecialData?.alumnoAsistio ?? false,
    },
  });

  const { handleSubmit, control, getValues } = formHook;

  const onSubmit = async (data: GestionarInscripcionEspecialFormData) => {
    aprobarSolcitud(data, {
      onSuccess: () => {
        toast.success("Solicitud de inscripcion especial aprobada con éxito");
        utils.inscripcionesEspeciales.getInscripcionEspecialPorId
          .invalidate({ id: inscripcionEspecialId })
          .catch((err) => {
            console.error(err);
          });
        onAprobar();
      },
      onError: (error) => {
        toast.error("Error al aprobar la reserva");
        console.error(error);
      },
    });
    console.log("Aprobando con justificacion: ", data.respuesta);
    onAprobar();
  };

  const handleRechazo = async () => {
    const values = getValues();
    rechazarSolicitud(
      { id: inscripcionEspecialId, respuesta: values.respuesta },
      {
        onSuccess: () => {
          toast.success("Solicitud de inscripcion especial rechazada con éxito");
          utils.inscripcionesEspeciales.getInscripcionEspecialPorId
            .invalidate({ id: inscripcionEspecialId })
            .catch((err) => {
              console.error(err);
            });
          onRechazar();
        },
        onError: (error) => {
          toast.error("Error al rechazar la reserva");
          console.error(error);
        },
      },
    );
    console.log("Rechazando con justificacion: ", values.respuesta);
    onRechazar();
  };

  const { mutate: guardarContacto } = api.inscripcionesEspeciales.actualizarContactoAsistencia.useMutation();
  const handleGuardar = () => {
    const values = getValues();
    guardarContacto(
      { id: inscripcionEspecialId, alumnoContactado: values.alumnoContactado, alumnoAsistio: values.alumnoAsistio },
      {
        onSuccess: () => {
          toast.success("Cambios guardados");
          utils.inscripcionesEspeciales.getInscripcionEspecialPorId.invalidate({ id: inscripcionEspecialId });
        },
        onError: () => toast.error("No se pudieron guardar los cambios"),
      },
    );
  };

  return (
    <FormProvider {...formHook}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Campos para Aprobacion con condicion o Rechazo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex w-full flex-col gap-y-4">
              <FormTextarea
                id="respuesta"
                name="respuesta"
                label={"Justificación"}
                control={control}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center gap-2">
          <Controller
            name="alumnoAsistio"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <div className="space-y-3 leading-none">
                  <label
                    htmlFor="aceptoTerminos"
                    className="flex items-center space-x-2 text-sm leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Checkbox
                      id="aceptoTerminos"
                      name="aceptoTerminos"
                      className="h-8 w-8"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span>Alumno asistió</span>
                  </label>
                  <div className="min-h-4 text-md text-danger">{fieldState.error && fieldState.error.message}</div>
                </div>
              </>
            )}
          />
          <Controller
            name="alumnoContactado"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <div className="space-y-3 leading-none">
                  <label
                    htmlFor="aceptoTerminos"
                    className="flex items-center space-x-2 text-sm leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Checkbox
                      id="aceptoTerminos"
                      name="aceptoTerminos"
                      className="h-8 w-8"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span>Alumno contactado</span>
                  </label>
                  <div className="min-h-4 text-md text-danger">{fieldState.error && fieldState.error.message}</div>
                </div>
              </>
            )}
          />
        </div>
        <Button type="button" variant="outline" color="secondary" onClick={handleGuardar} className="w-full">
          Guardar cambios
        </Button>

        <div className="sticky bottom-0 flex w-full flex-row items-end justify-end space-x-4 bg-white p-2 pb-2">
          <Button
            title="Cancelar"
            type="button"
            variant="default"
            color="secondary"
            onClick={onCancel}
            className="w-full"
          >
            Cancelar
          </Button>
          <Button
            title="Rechazar"
            type="button"
            variant="default"
            color="danger"
            onClick={handleRechazo}
            className="w-full"
          >
            Rechazar
          </Button>
          <Button title="Aprobar" type="submit" variant="default" color="primary" className="w-full">
            Aprobar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
