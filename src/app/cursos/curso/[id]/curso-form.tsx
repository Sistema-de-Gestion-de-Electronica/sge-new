import { FormProvider, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { Button, toast } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { inputEditarCurso } from "@/shared/filters/cursos-filter.schema";
import { FormSelect } from "@/components/ui/autocomplete";
import { turnosValues } from "@/app/_components/turno-text";
import { SelectMateriasForm } from "@/app/cursos/_components/select-materia";
import { SelectDivisionesForm } from "../../_components/select-division";
import { SelectSedeForm } from "@/app/_components/select-ubicacion/select-sede";
import {
  getUserLabelNameForSelect,
  SelectMultipleProfesorForm,
  SelectProfesorForm,
} from "@/app/_components/select-usuario";
import { CheckboxActivo } from "../../_components/checkbox";

type Props = {
  id?: string;
  onSubmit: () => void;
  onCancel: () => void;
};

type FormHelperType = {
  profesorUser: { id: string; label: string };
};

export type FormEditarCursoType = z.infer<typeof inputEditarCurso> & FormHelperType;

const dias = [
  { id: "LUNES", label: "Lunes" },
  { id: "MARTES", label: "Martes" },
  { id: "MIERCOLES", label: "Miércoles" },
  { id: "JUEVES", label: "Jueves" },
  { id: "VIERNES", label: "Viernes" },
  { id: "SABADO", label: "Sábado" },
];

const horas = ["0", "1", "2", "3", "4", "5", "6"].map((item) => ({
  id: item,
  label: item,
}));

const duracion = ["1", "2", "3", "4", "5", "6", "7"].map((item) => ({
  id: item,
  label: item,
}));

const ac = [
  { id: "A", label: "Anual" },
  { id: "C", label: "Cuatrimestral" },
];

export const CursoForm = ({ id, onSubmit, onCancel }: Props) => {
  const [mostrarDia2, setMostrarDia2] = useState(false);

  const handleAddDia2 = () => {
    setMostrarDia2(true);
  };

  const handleRemoveDia2 = () => {
    setValue("dia2", undefined);
    setValue("horaInicio2", undefined);
    setValue("duracion2", undefined);
    setMostrarDia2(false);
  };

  const cursoId = parseInt(id ?? "");
  const { data: curso, isLoading, isError } = api.cursos.cursoPorId.useQuery({ id: cursoId }, { enabled: !!id });

  const editarCurso = api.cursos.editarCurso.useMutation(); // Se llama si existe cursoId
  const agregarCurso = api.cursos.nuevoCurso.useMutation(); // Se llama si no existe cursoId

  const cursoBase = useMemo((): FormEditarCursoType => {
    if (!curso) return {} as FormEditarCursoType;
    return {
      id: curso.id,
      horaInicio1: curso.horaInicio1,
      duracion1: curso.duracion1,
      horaInicio2: curso.horaInicio2 ?? undefined,
      duracion2: curso.duracion2 ?? undefined,
      dia1: curso.dia1,
      dia2: curso.dia2 ?? undefined,
      profesorUser: {
        id: curso.profesorId ?? undefined,
        label: curso.profesor ? getUserLabelNameForSelect(curso.profesor) : "",
      },
      profesorUserId: curso.profesorId,
      ayudanteUsersIds: curso.ayudantes?.map((a) => a.usuario.id) ?? [],
      anioDeCarrera: curso.anioDeCarrera ? String(curso.anioDeCarrera) : "",
      activo: curso.activo,
      ac: curso.ac,
      sedeId: curso.sedeId?.toString(),
      materiaId: curso.materiaId.toString(),
      divisionId: curso.division?.id.toString(),
      turno: curso.turno,
    };
  }, [curso]);

  const formHook = useForm<FormEditarCursoType>({
    mode: "onChange",
    defaultValues: cursoBase,
    resolver: zodResolver(inputEditarCurso),
  });

  const { handleSubmit, control, reset, watch, setValue } = formHook;

  useEffect(() => {
    if (curso?.dia2) {
      setMostrarDia2(true);
    }
  }, [curso]);

  useEffect(() => formHook.reset(cursoBase), [formHook, curso, cursoBase]);

  const [profesorUser] = watch(["profesorUser"]);
  useEffect(() => formHook.setValue("profesorUserId", profesorUser?.id), [formHook, profesorUser]);

  const esNuevo = id === undefined;

  const [horaInicio1, horaInicio2, turno] = formHook.watch(["horaInicio1", "horaInicio2", "turno"]);

  const posibleDuracion1 = useMemo(
    () => duracion.filter((duracion) => Number(duracion.id) + Number(horaInicio1) <= (turno === "NOCHE" ? 6 : 7)),
    [horaInicio1, turno],
  );
  const posibleDuracion2 = useMemo(
    () => duracion.filter((duracion) => Number(duracion.id) + Number(horaInicio2) <= (turno === "NOCHE" ? 6 : 7)),
    [horaInicio2, turno],
  );

  if (!esNuevo && isNaN(cursoId)) {
    return <div>Error al cargar...</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar...</div>;
  }

  const onFormSubmit = (formData: FormEditarCursoType) => {
    if (esNuevo) {
      agregarCurso.mutate(formData, {
        onSuccess: () => {
          toast.success("Curso agregado con éxito.");
          onSubmit();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al agregar el curso");
        },
      });
      return;
    }
    editarCurso.mutate(formData, {
      onSuccess: () => {
        toast.success("Curso actualizado con éxito.");
        onSubmit();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al actualizar el curso");
      },
    });
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <FormProvider {...formHook}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="relative flex w-full flex-col md:px-4">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectMateriasForm
              label={"Materia"}
              control={control}
              name="materiaId"
              placeholder={"Seleccione una materia"}
            />
            <SelectDivisionesForm
              label={"División"}
              control={control}
              name="divisionId"
              placeholder={"Seleccione una división"}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
            <SelectProfesorForm
              label={"Profesor"}
              control={control}
              name="profesorUser"
              realNameId="profesorUserId"
              className="bg-white text-gray-900"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <SelectSedeForm label={"Sede"} control={control} name="sedeId" placeholder={"Seleccione una sede"} />
            <FormSelect label={"Turno"} control={control} name="turno" items={turnosValues} />
            <FormSelect label={"Duración"} control={control} name="ac" items={ac} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <FormSelect label={"Día 1"} control={control} name="dia1" items={dias} />
            <FormSelect
              label={"Hora inicio 1"}
              control={control}
              name="horaInicio1"
              items={horas}
              onChange={(value) => {
                if (value) {
                  formHook.setValue("duracion1", "1");
                }
              }}
            />
            <FormSelect label={"Duración 1"} control={control} name="duracion1" items={posibleDuracion1} />
            {!mostrarDia2 && (
              <button type="button" className="h-10 self-end text-left text-blue-600" onClick={handleAddDia2}>
                + Agregar día 2
              </button>
            )}
          </div>
          {mostrarDia2 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <FormSelect label={"Día 2"} control={control} name="dia2" items={dias} />
              <FormSelect
                label={"Hora inicio 2"}
                control={control}
                name="horaInicio2"
                items={horas}
                onChange={(value) => {
                  if (value) {
                    formHook.setValue("duracion2", "1");
                  }
                }}
              />
              <FormSelect label={"Duración 2"} control={control} name="duracion2" items={posibleDuracion2} />
              <Button
                type="button"
                className="h-10 self-end"
                onClick={handleRemoveDia2}
                variant={"default"}
                color={"danger"}
              >
                Eliminar día 2
              </Button>
            </div>
          )}
          {!esNuevo && <CheckboxActivo name="activo" className="h-8 w-8" control={control}></CheckboxActivo>}
          <div className="w-full">
            <label className="text-sm" htmlFor="jefesTrabajoPracticoUserId">
              Ayudantes:
              <SelectMultipleProfesorForm label="Ayudantes" control={control} name="ayudanteUsersIds" />
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 mb-2 flex w-full flex-row items-end justify-end space-x-4 bg-white pt-4">
          <Button title="Cancelar" type="button" variant="default" color="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button title="Guardar" type="submit" variant="default" color="primary">
            Guardar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
