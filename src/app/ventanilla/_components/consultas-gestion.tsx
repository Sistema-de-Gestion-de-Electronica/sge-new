import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui";
import { FormTextarea } from "@/components/ui/textarea";
import { inputGestionarConsultas } from "@/shared/filters/ventanilla-filter.schema";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { SgeNombre } from "@/generated/prisma";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";

type GestionarConsultaFormData = z.infer<typeof inputGestionarConsultas>;

interface ConsultasGestionProps {
  consultaId: number;
  onEstados: () => void;
  onCancel: () => void;
}

export const ConsultasGestion = ({ consultaId, onCancel }: ConsultasGestionProps) => {
  const utils = api.useUtils();
  const { mutate: actualizarCampos } = api.ventanilla.gestionarConsulta.useMutation();

  const { data: consultaData } = api.ventanilla.getConsultaById.useQuery({
    id: consultaId,
  });

  const formHook = useForm<GestionarConsultaFormData>({
    mode: "onChange",
    resolver: zodResolver(inputGestionarConsultas),
    defaultValues: {
      id: consultaId,
      estado: "",
      respuesta: "",
    },
  });

  const { control, getValues } = formHook;

  useEffect(() => {
    if (!consultaData) return;

    const estado = consultaData?.estado ?? "";
    const respuesta = consultaData?.respuesta ?? "";

    formHook.reset({
      id: consultaId,
      estado,
      respuesta,
    });
  }, [consultaData, formHook, consultaId]);

  const handleResponder = () => {
    const values = getValues();

    actualizarCampos(
      {
        id: consultaId,
        estado: "RESPONDIDA",
        respuesta: values.respuesta,
      },
      {
        onSuccess: () => {
          const mensaje = "Consulta respondida con éxito";
          toast.success(mensaje);
          void utils.ventanilla.getConsultaById.invalidate({ id: consultaId });
          void utils.ventanilla.getAllConsultas.invalidate();
        },
        onError: (error) => {
          let errorMessage = "Hubo un problema al enviar tu consulta. Por favor, intenta nuevamente.";

          if (error.message) {
            try {
              const parsedError = JSON.parse(error.message);
              if (Array.isArray(parsedError) && parsedError.length > 0) {
                errorMessage = parsedError[0].message;
              } else {
                errorMessage = error.message;
              }
            } catch {
              errorMessage = error.message;
            }
          }

          toast.error(errorMessage);
        },
      },
    );
  };

  const handleMarcarPendiente = () => {
    const values = getValues();

    actualizarCampos(
      {
        id: consultaId,
        estado: "PENDIENTE",
        respuesta: values.respuesta,
      },
      {
        onSuccess: () => {
          const mensaje = "Consulta marcada como pendiente";
          toast.success(mensaje);
          void utils.ventanilla.getConsultaById.invalidate({ id: consultaId });
          void utils.ventanilla.getAllConsultas.invalidate();
        },
        onError: (error) => {
          let errorMessage = "No se pudo marcar la consulta como pendiente, pruebo nuevamente mas tarde";

          if (error.message) {
            try {
              const parsedError = JSON.parse(error.message);
              if (Array.isArray(parsedError) && parsedError.length > 0) {
                errorMessage = parsedError[0].message;
              } else {
                errorMessage = error.message;
              }
            } catch {
              errorMessage = error.message;
            }
          }

          toast.error(errorMessage);
        },
      },
    );
  };

  const handleEliminar = () => {
    actualizarCampos(
      { id: consultaId, estado: "ELIMINADA" },
      {
        onSuccess: () => {
          toast.success("Consulta eliminada");
          void utils.ventanilla.getAllConsultas.invalidate();
          setOpen(false);
          onCancel();
        },
        onError: (error) => {
          let errorMessage = "No se pudo eliminar la consulta";

          if (error.message) {
            try {
              const parsedError = JSON.parse(error.message);
              if (Array.isArray(parsedError) && parsedError.length > 0) {
                errorMessage = parsedError[0].message;
              } else {
                errorMessage = error.message;
              }
            } catch {
              errorMessage = error.message;
            }
          }

          toast.error(errorMessage);
        },
      },
    );
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Consulta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-[400px] min-h-[200px] overflow-y-auto rounded-md border bg-gray-50 p-4">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{consultaData?.consulta}</div>
          </div>
        </CardContent>
      </Card>

      {consultaData?.respuesta && consultaData?.estado === "RESPONDIDA" && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Respuesta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-[400px] min-h-[200px] overflow-y-auto rounded-md border bg-gray-50 p-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{consultaData.respuesta}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <TienePermiso permisos={[SgeNombre.VENTANILLA_RESPONDER_CONSULTAS]}>
        <FormProvider {...formHook}>
          <form className="space-y-6">
            {(consultaData?.estado === "NUEVA" || consultaData?.estado === "PENDIENTE") && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Gestión de Consulta - Estado: {consultaData?.estado}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex w-full flex-col gap-y-4">
                    <FormTextarea
                      id="respuesta"
                      name="respuesta"
                      label={"Escribir respuesta"}
                      control={control}
                      className="min-h-[150px] resize-none"
                      placeholder="Escribe aquí la respuesta a la consulta..."
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {(consultaData?.estado === "NUEVA" || consultaData?.estado === "PENDIENTE") && (
              <Button
                type="button"
                variant="default"
                color="secondary"
                onClick={handleResponder}
                className="w-full border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
              >
                Responder
              </Button>
            )}

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
              {(consultaData?.estado === "NUEVA" || consultaData?.estado === "PENDIENTE") && (
                <Button
                  title="Eliminar"
                  type="button"
                  variant="default"
                  color="danger"
                  onClick={() => setOpen(true)}
                  className="w-full"
                >
                  Eliminar
                </Button>
              )}

              {consultaData?.estado === "NUEVA" && (
                <Button
                  title="Marcar como pendiente"
                  type="button"
                  variant="default"
                  color="primary"
                  onClick={handleMarcarPendiente}
                  className="w-full"
                >
                  Marcar como pendiente
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </TienePermiso>

      <ModalDrawer
        titulo={"Eliminar consulta"}
        description={"¿Estás seguro de que deseas eliminar esta consulta?"}
        open={open}
        onOpenChange={() => setOpen(false)}
        className={"max-h-[calc(100vh_-_10%)]"}
      >
        <div className="flex max-h-max w-full flex-row gap-4">
          <Button
            title="Cancelar"
            type="button"
            variant="default"
            color="secondary"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancelar
          </Button>
          <Button
            title="Eliminar"
            type="button"
            variant="default"
            color="danger"
            onClick={handleEliminar}
            className="w-full"
          >
            Eliminar
          </Button>
        </div>
      </ModalDrawer>
    </div>
  );
};
