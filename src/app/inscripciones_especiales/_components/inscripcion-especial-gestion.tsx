import { api } from "@/trpc/react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui";
import { FormTextarea } from "@/components/ui/textarea";
import { inputGestionarInscripcionEspecial } from "@/shared/filters/inscripciones-especiales-filter.schema";

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
