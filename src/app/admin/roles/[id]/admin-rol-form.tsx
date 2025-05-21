import { FormProvider, useForm } from "react-hook-form";
import { type RouterOutputs, api } from "@/trpc/react";
import { Button, FormInput, toast } from "@/components/ui";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useEffect, useState } from "react";
import { inputEditarRol } from "@/shared/filters/admin-roles-filter.schema";

type Props = {
  id?: string;
  onSubmit: () => void;
  onCancel: () => void;
};

type PermisoType = RouterOutputs["admin"]["roles"]["getAllPermisos"][number];
type FormEditarRolType = z.infer<typeof inputEditarRol>;

export const AdminRolForm = ({ id, onSubmit, onCancel }: Props) => {
  const esNuevo = id === undefined;
  const rolId = parseInt(id ?? "");

  const [permisosDictionario, setPermisosDictionario] = useState<Record<string, PermisoType>>({});

  const { data: todosLosPermisos } = api.admin.roles.getAllPermisos.useQuery();
  const { data: rol, isLoading, isError } = api.admin.roles.getRolById.useQuery({ id: rolId }, { enabled: !!id });

  const editarRol = api.admin.roles.editarRol.useMutation();
  const agregarRol = api.admin.roles.nuevoRol.useMutation();

  const formHook = useForm<FormEditarRolType>({
    mode: "onChange",
    defaultValues: {
      id: rol?.id ?? undefined,
      nombre: rol?.nombre ?? "",
      permisos: rol?.rolPermiso.map((permiso) => String(permiso.permisoId)) ?? [],
    },
    resolver: zodResolver(inputEditarRol),
  });

  const { handleSubmit, control, setValue, getValues, watch } = formHook;
  const currentPermisos = watch("permisos");

  useEffect(() => {
    if (rol) {
      formHook.reset({
        id: rol.id,
        nombre: rol.nombre,
        permisos: rol.rolPermiso.map((permiso) => String(permiso.permisoId)),
      });
    }
  }, [formHook, rol]);

  useEffect(() => {
    if (todosLosPermisos) {
      const newPermisos: Record<string, PermisoType> = {};
      todosLosPermisos.forEach((permiso) => {
        newPermisos[String(permiso.id)] = permiso;
      });
      setPermisosDictionario(newPermisos);
    }
  }, [todosLosPermisos]);

  const permisosPorGrupo: Record<string, string[]> = Object.keys(permisosDictionario).reduce(
    (acc, permisoId) => {
      const permiso = permisosDictionario[permisoId];
      if (permiso) {
        const grupo = permiso.rubro;
        if (!acc[grupo]) {
          acc[grupo] = [];
        }
        acc[grupo].push(permisoId);
      }
      return acc;
    },
    {} as Record<string, string[]>,
  );

  if (!esNuevo && isNaN(rolId)) {
    return <div>Error al cargar...</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar...</div>;
  }

  const onFormSubmit = (formData: FormEditarRolType) => {
    if (esNuevo) {
      agregarRol.mutate(formData, {
        onSuccess: () => {
          toast.success("Rol agregado con éxito.");
          onSubmit();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al agregar el rol");
        },
      });
      return;
    }

    editarRol.mutate(formData, {
      onSuccess: () => {
        toast.success("Rol actualizado con éxito.");
        onSubmit();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al actualizar el rol");
      },
    });
  };

  const handleCancel = () => {
    formHook.reset();
    onCancel();
  };

  const onPermissionChange = (permisoId: string) => {
    const permisos = getValues("permisos");

    if (permisos.includes(permisoId)) {
      setValue(
        "permisos",
        permisos.filter((id) => id !== permisoId),
      );
    } else {
      setValue("permisos", [...permisos, permisoId]);
    }
  };

  return (
    <FormProvider {...formHook}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="relative flex w-full flex-col gap-4">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-full flex-col space-y-4 px-0 md:px-6">
            <div className="flex w-full flex-row lg:flex-row lg:justify-between lg:gap-x-4">
              <div className="mt-4 w-full">
                <FormInput
                  label={"Título"}
                  control={control}
                  name="nombre"
                  type={"text"}
                  className="mt-2"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="flex w-full flex-col lg:justify-between">
              {Object.entries(permisosPorGrupo).map(([grupo, permisos]) => (
                <div key={grupo} className="mt-4 w-full">
                  <h3 className="mb-2 text-lg font-semibold">{grupo}</h3>
                  <div className="mb-2 grid w-full grid-cols-2 gap-2">
                    {permisos.map((permisoId) => (
                      <label key={permisoId} className="flex items-center space-x-2 hover:bg-slate-100">
                        <Checkbox
                          checked={currentPermisos.includes(permisoId)}
                          onCheckedChange={() => onPermissionChange(permisoId)}
                        />
                        <span>{permisosDictionario[permisoId]?.nombre ?? "Error"}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex w-full flex-row items-end justify-end space-x-4 bg-white p-2 pb-8">
          <Button
            className="w-full lg:w-auto"
            title="Cancelar"
            type="button"
            variant="default"
            color="secondary"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button className="w-full lg:w-auto" title="Guardar" type="submit" variant="default" color="primary">
            Guardar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
