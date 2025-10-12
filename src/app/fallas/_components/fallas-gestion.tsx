import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui";
import { FormTextarea } from "@/components/ui/textarea";
import { inputGestionarFallas } from "@/shared/filters/fallas-filter.schema";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { SelectUsuarioForm, getUserLabelNameForSelect } from "@/app/_components/select-usuario";
import { FallasEstatus } from "./badge-estatus-fallas";

type FormHelperType = {
  asignadoAObject: { id: string; label: string };
};

type GestionarFallasFormData = z.infer<typeof inputGestionarFallas> & FormHelperType;

interface FallasGestionProps {
  fallaId: number;
  onEstados: () => void;
  onCancel: () => void;
}

export const FallasGestion = ({ fallaId, onEstados, onCancel }: FallasGestionProps) => {
  const utils = api.useUtils();
  const { mutate: cambiarEstado } = api.fallas.cambiarEstado.useMutation();
  const { mutate: eliminarFalla } = api.fallas.eliminarFalla.useMutation();
  const { mutate: actualizarCampos } = api.fallas.actualizarCampos.useMutation();

  const {
    data: fallaData,
    isLoading,
    error,
  } = api.fallas.getFallaPorId.useQuery({
    id: fallaId,
  });

  const formHook = useForm<GestionarFallasFormData>({
    mode: "onChange",
    resolver: zodResolver(inputGestionarFallas),
    defaultValues: {
      id: fallaId,
      descripcionFalla: fallaData?.descripcionFalla ?? "",
      asignadoA: fallaData?.asignadoA?.id ?? "",
      asignadoAObject: fallaData?.asignadoA
        ? {
            id: fallaData.asignadoA.id,
            label: getUserLabelNameForSelect(fallaData.asignadoA),
          }
        : undefined,
      palabraClave: fallaData?.palabrasClave ?? "",
    },
  });

  const { control, getValues, watch } = formHook;

  const asignadoAObject = watch("asignadoAObject");

  useEffect(() => formHook.setValue("asignadoA", asignadoAObject?.id), [formHook, asignadoAObject]);

  // Handler para marcar como "EN_REPARACION"
  const handleEnReparacion = () => {
    const values = getValues();
    cambiarEstado(
      {
        id: fallaId,
        estado: "EN_REPARACION",
        descripcionFalla: values.descripcionFalla,
        asignadoA: values.asignadoA,
        palabraClave: values.palabraClave,
      },
      {
        onSuccess: () => {
          toast.success("Falla marcada como en reparación");
          void utils.fallas.getFallaPorId.invalidate({ id: fallaId });
          onEstados();
        },
        onError: (error: any) => {
          toast.error("Error al cambiar el estado de la falla");
          console.error(error);
        },
      },
    );
  };

  // Handler para marcar como "REPARADO"
  const handleReparado = () => {
    const values = getValues();
    cambiarEstado(
      {
        id: fallaId,
        estado: "REPARADO",
        descripcionFalla: values.descripcionFalla,
      },
      {
        onSuccess: () => {
          toast.success("Falla marcada como reparada");
          void utils.fallas.getFallaPorId.invalidate({ id: fallaId });
          onEstados();
        },
        onError: (error: any) => {
          toast.error("Error al cambiar el estado de la falla");
          console.error(error);
        },
      },
    );
  };

  // Handler para marcar como "DESCARTADO"
  const handleDescartado = () => {
    const values = getValues();
    cambiarEstado(
      {
        id: fallaId,
        estado: "DESCARTADO",
        descripcionFalla: values.descripcionFalla,
      },
      {
        onSuccess: () => {
          toast.success("Equipo marcado como descartado");
          void utils.fallas.getFallaPorId.invalidate({ id: fallaId });
          onEstados();
        },
        onError: (error: any) => {
          toast.error("Error al cambiar el estado de la falla");
          console.error(error);
        },
      },
    );
  };

  const handleGuardar = () => {
    const values = getValues();
    actualizarCampos(
      {
        id: fallaId,
        asignadoA: values.asignadoA,
        palabraClave: values.palabraClave,
        descripcionFalla: values.descripcionFalla,
      },
      {
        onSuccess: () => {
          toast.success("Cambios guardados");
          void utils.fallas.getFallaPorId.invalidate({ id: fallaId });
        },
        onError: () => toast.error("No se pudieron guardar los cambios"),
      },
    );
  };

  const handleEliminar = () => {
    eliminarFalla(
      { id: fallaId },
      {
        onSuccess: () => {
          toast.success("Falla eliminada");
          void utils.fallas.getAllFallas.invalidate();
          setOpen(false);
          onCancel();
        },
        onError: () => toast.error("No se pudo eliminar la falla"),
      },
    );
  };

  const [open, setOpen] = useState(false);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!fallaData) return <div>No se encontró la falla</div>;

  return (
    <FormProvider {...formHook}>
      <form className="space-y-6">
        {(fallaData?.estado === FallasEstatus.FALLADO || fallaData?.estado === FallasEstatus.EN_REPARACION) && (
          <>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Gestión de Falla - Estado: {fallaData?.estado}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex w-full flex-col gap-y-4">
                  <FormTextarea
                    id="descripcionFalla"
                    name="descripcionFalla"
                    label={"Descripción de la/s falla/s / Reparación / Motivo del descarte"}
                    control={control}
                    className="resize-none"
                    placeholder="Describe el problema, reparación realizada, o motivo del descarte..."
                  />

                  <SelectUsuarioForm
                    name="asignadoAObject"
                    realNameId="asignadoA"
                    control={control}
                    className="mt-2"
                    label={"Usuario asignado"}
                    placeholder={"Selecciona un usuario"}
                  />
                  <FormTextarea
                    name="palabraClave"
                    label={"Palabras clave"}
                    control={control}
                    placeholder="Palabras clave para categorizar el problema"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="button"
              variant="default"
              color="secondary"
              onClick={handleGuardar}
              className="w-full border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
            >
              Guardar cambios
            </Button>
          </>
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

          {/* Botones condicionales según el estado actual */}
          {fallaData?.estado === FallasEstatus.FALLADO && (
            <Button
              title="Marcar en reparación"
              type="button"
              variant="default"
              color="primary"
              onClick={handleEnReparacion}
              className="w-full"
            >
              En Reparación
            </Button>
          )}

          {fallaData?.estado === FallasEstatus.EN_REPARACION && (
            <>
              <Button
                title="Marcar como descartado"
                type="button"
                variant="default"
                color="danger"
                onClick={handleDescartado}
                className="w-full"
              >
                Descartar
              </Button>

              <Button
                title="Marcar como reparado"
                type="button"
                variant="default"
                color="primary"
                onClick={handleReparado}
                className="w-full"
              >
                Reparado
              </Button>
            </>
          )}
        </div>
      </form>

      <ModalDrawer
        titulo={"Eliminar falla"}
        description={"¿Estás seguro de que deseas eliminar este reporte de falla?"}
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
    </FormProvider>
  );
};
