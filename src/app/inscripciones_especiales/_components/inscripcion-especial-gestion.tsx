import { api } from "@/trpc/react";
import { useState, useEffect } from "react";
import * as React from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui";
import { FormTextarea } from "@/components/ui/textarea";
import { inputGestionarInscripcionEspecial } from "@/shared/filters/inscripciones-especiales-filter.schema";
import { Checkbox } from "@/components/ui/checkbox";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

type GestionarInscripcionEspecialFormData = z.infer<typeof inputGestionarInscripcionEspecial>;

interface InscripcionEspecialGestionProps {
  inscripcionEspecialId: number;
  onAprobar: () => void;
  onCancel: () => void;
  onRechazar: () => void;
}

interface SelectCursoPorMateriaProps {
  materiaId: number;
  materiaNombre: string;
  selectedCurso: number;
  onCursoChange: (cursoId: number) => void;
}

const SelectCursoPorMateria = ({
  materiaId,
  materiaNombre,
  selectedCurso,
  onCursoChange,
}: SelectCursoPorMateriaProps) => {
  const { data: cursosData, isLoading: isLoadingCursos } = api.cursos.getAll.useQuery({
    materia: String(materiaId),
    filtrByActivo: "true",
  });
  const { data: cursoSeleccionadoData, isLoading: isLoadingCursoSeleccionado } = api.cursos.cursoPorId.useQuery(
    { id: selectedCurso },
    { enabled: selectedCurso > 0 },
  );

  const cursosConSeleccionado = React.useMemo(() => {
    const cursos = cursosData?.cursos ?? [];
    if (selectedCurso > 0) {
      const cursoEnLista = cursos.find((c) => c.id === selectedCurso);

      if (cursoSeleccionadoData) {
        if (!cursoEnLista) {
          return [cursoSeleccionadoData, ...cursos];
        }
        const cursosActualizados = cursos.map((c) => (c.id === selectedCurso ? cursoSeleccionadoData : c));
        return cursosActualizados;
      }

      if (cursoEnLista) {
        return cursos;
      }
    }
    return cursos;
  }, [cursosData?.cursos, cursoSeleccionadoData, selectedCurso]);

  const placeholderText = React.useMemo(() => {
    if (selectedCurso > 0) {
      const curso = cursoSeleccionadoData ?? cursosConSeleccionado.find((c) => c.id === selectedCurso);
      if (curso?.division?.nombre) {
        return undefined;
      }
      if (isLoadingCursoSeleccionado) {
        return "Cargando...";
      }
    }
    return "Seleccionar curso (División)";
  }, [selectedCurso, cursoSeleccionadoData, cursosConSeleccionado, isLoadingCursoSeleccionado]);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div>
        <Label className="text-xs font-semibold">{materiaNombre}</Label>
      </div>
      <div>
        <Select
          value={selectedCurso && selectedCurso > 0 ? String(selectedCurso) : ""}
          onValueChange={(val) => {
            onCursoChange(Number(val));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholderText} />
          </SelectTrigger>
          <SelectContent>
            {isLoadingCursos ? (
              <SelectItem value="loading" disabled>
                Cargando cursos...
              </SelectItem>
            ) : (
              <>
                {selectedCurso > 0 && !cursosConSeleccionado.some((c) => c.id === selectedCurso) && (
                  <SelectItem
                    key={`selected-${selectedCurso}`}
                    value={String(selectedCurso)}
                    disabled={isLoadingCursoSeleccionado && cursoSeleccionadoData == null}
                  >
                    {cursoSeleccionadoData?.division?.nombre ??
                      (isLoadingCursoSeleccionado ? `Curso ${selectedCurso} (cargando...)` : `Curso ${selectedCurso}`)}
                  </SelectItem>
                )}
                {cursosConSeleccionado.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.division?.nombre ?? `Curso ${c.id}`}
                  </SelectItem>
                ))}
                {cursosConSeleccionado.length === 0 && selectedCurso === 0 && (
                  <SelectItem value="no-cursos" disabled>
                    No hay cursos disponibles
                  </SelectItem>
                )}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export const InscripcionEspecialGestion = ({
  inscripcionEspecialId,
  onAprobar,
  onCancel,
  onRechazar,
}: InscripcionEspecialGestionProps) => {
  const utils = api.useUtils();
  const { isPending: estaAprobando, mutate: aprobarSolcitud } =
    api.inscripcionesEspeciales.aprobarInscripcionEspecial.useMutation();
  const { isPending: estaAprobandoCondicion, mutate: aprobarSolicitudConCondicion } =
    api.inscripcionesEspeciales.aprobarInscripcionEspecialConCondicion.useMutation();
  const { mutate: rechazarSolicitud } = api.inscripcionesEspeciales.rechazarInscripcionEspecial.useMutation();
  const { data: inscripcionEspecialData } = api.inscripcionesEspeciales.getInscripcionEspecialPorId.useQuery({
    id: inscripcionEspecialId,
  });
  const actualizarCursosMutation = api.inscripcionesEspeciales.actualizarCursos.useMutation();

  const [selectedCursos, setSelectedCursos] = useState<number[]>([]);

  const cursoPorMateriaMap = React.useMemo(() => {
    const map = new Map<number, number>();
    if (inscripcionEspecialData?.materiasInscripcion) {
      inscripcionEspecialData.materiasInscripcion.forEach((mi) => {
        if (mi.cursoId != null && mi.cursoId > 0) {
          map.set(mi.materiaId, mi.cursoId);
        }
      });
    }
    return map;
  }, [inscripcionEspecialData?.materiasInscripcion]);

  useEffect(() => {
    if (inscripcionEspecialData?.materiasInscripcion && inscripcionEspecialData.materiasInscripcion.length > 0) {
      const cursosMapeados = inscripcionEspecialData.materiasInscripcion.map((mi) => mi.cursoId ?? 0);
      setSelectedCursos(cursosMapeados);
    } else if (inscripcionEspecialData?.materiasIds) {
      const cursosMapeados = inscripcionEspecialData.materiasIds.map(
        (materiaId) => cursoPorMateriaMap.get(materiaId) ?? 0,
      );
      setSelectedCursos(cursosMapeados);
    }
  }, [inscripcionEspecialData, cursoPorMateriaMap]);

  const { mutate: enviarMailContacto, isPending: enviandoMail } =
    api.inscripcionesEspeciales.enviarMailContacto.useMutation();

  const formHook = useForm<GestionarInscripcionEspecialFormData>({
    mode: "onChange",
    resolver: zodResolver(inputGestionarInscripcionEspecial),
    defaultValues: {
      id: inscripcionEspecialId,
      respuesta: "",
      alumnoContactado: inscripcionEspecialData?.fueContactado ?? false,
      alumnoAsistio: inscripcionEspecialData?.vinoPresencialmente ?? false,
    },
  });

  const { handleSubmit, control, getValues, reset } = formHook;

  useEffect(() => {
    if (inscripcionEspecialData) {
      reset({
        id: inscripcionEspecialId,
        respuesta: inscripcionEspecialData.respuesta ?? "",
        alumnoContactado: inscripcionEspecialData.fueContactado ?? false,
        alumnoAsistio: inscripcionEspecialData.vinoPresencialmente ?? false,
      });
    }
  }, [inscripcionEspecialData, inscripcionEspecialId, reset]);

  const handleAprobar = (data: GestionarInscripcionEspecialFormData) => {
    aprobarSolcitud(data, {
      onSuccess: () => {
        toast.success("Solicitud de inscripcion especial aprobada con éxito");
        void utils.inscripcionesEspeciales.getInscripcionEspecialPorId.invalidate({ id: inscripcionEspecialId });
        void utils.inscripcionesEspeciales.getAllInscripcionesEspeciales.invalidate();
        onAprobar();
      },
      onError: (error) => {
        toast.error("Error al aprobar la reserva");
        console.error(error);
      },
    });
  };

  const handleAprobarConCondicion = (data: GestionarInscripcionEspecialFormData) => {
    aprobarSolicitudConCondicion(data, {
      onSuccess: () => {
        toast.success("Solicitud de inscripcion especial aprobada con condición");
        void utils.inscripcionesEspeciales.getInscripcionEspecialPorId.invalidate({ id: inscripcionEspecialId });
        void utils.inscripcionesEspeciales.getAllInscripcionesEspeciales.invalidate();
        onAprobar();
      },
      onError: (error) => {
        toast.error("Error al aprobar la reserva con condición");
        console.error(error);
      },
    });
  };

  const handleRechazo = () => {
    const values = getValues();
    const respuesta = values.respuesta ?? "";
    if (respuesta.trim() === "") {
      toast.error("La justificación es obligatoria para rechazar la inscripción especial.");
      formHook.setError("respuesta", {
        type: "manual",
        message: "La justificación es obligatoria para rechazar la inscripción especial.",
      });
      return;
    }
    rechazarSolicitud(
      { id: inscripcionEspecialId, respuesta },
      {
        onSuccess: () => {
          toast.success("Solicitud de inscripcion especial rechazada con éxito");
          void utils.inscripcionesEspeciales.getInscripcionEspecialPorId.invalidate({ id: inscripcionEspecialId });
          void utils.inscripcionesEspeciales.getAllInscripcionesEspeciales.invalidate();
          onRechazar();
        },
        onError: (error) => {
          toast.error("Error al rechazar la reserva");
          console.error(error);
        },
      },
    );
  };

  const { mutate: guardarContacto } = api.inscripcionesEspeciales.actualizarContactoAsistencia.useMutation();
  const handleGuardar = () => {
    const values = getValues();
    guardarContacto(
      {
        id: inscripcionEspecialId,
        alumnoContactado: values.alumnoContactado ?? false,
        alumnoAsistio: values.alumnoAsistio ?? false,
      },
      {
        onSuccess: () => {
          toast.success("Cambios guardados");
          void utils.inscripcionesEspeciales.getInscripcionEspecialPorId.invalidate({ id: inscripcionEspecialId });
          void utils.inscripcionesEspeciales.getAllInscripcionesEspeciales.invalidate();
        },
        onError: () => toast.error("No se pudieron guardar los cambios"),
      },
    );
  };

  const handleGuardarCursos = () => {
    if (!inscripcionEspecialData) return;

    const data = inscripcionEspecialData;
    const materiasParaMapear = data.materiasInscripcion
      ? data.materiasInscripcion
      : (data.materiasIds ?? []).map((id, idx) => ({
          materiaId: id,
          materiaNombre: data.materias?.[idx] ?? "",
          cursoId: null,
          materiasAdeudadasIds: [],
          materiasAdeudadasNombres: [],
        }));

    const cursosAEnviar = materiasParaMapear.map((_, index) => selectedCursos[index] ?? 0);

    actualizarCursosMutation.mutate(
      { id: inscripcionEspecialId, cursos: cursosAEnviar },
      {
        onSuccess: () => {
          toast.success("Cursos actualizados");
          void utils.inscripcionesEspeciales.getInscripcionEspecialPorId.invalidate({
            id: inscripcionEspecialId,
          });
          void utils.inscripcionesEspeciales.getAllInscripcionesEspeciales.invalidate();
        },
        onError: () => toast.error("No se pudieron actualizar los cursos"),
      },
    );
  };

  const [open, setOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState(
    "Estimado/a alumno/a\n\n" + "Saludos cordiales,\n" + "Departamento de Ing. Electronica",
  );

  const { mutate: eliminarInscripcionEspecial } = api.inscripcionesEspeciales.eliminarInscripcionEspecial.useMutation();
  const handleEliminar = () => {
    eliminarInscripcionEspecial(
      { id: inscripcionEspecialId },
      {
        onSuccess: () => {
          toast.success("Inscripción especial eliminada con éxito");
          void utils.inscripcionesEspeciales.getInscripcionEspecialPorId.invalidate({ id: inscripcionEspecialId });
          void utils.inscripcionesEspeciales.getAllInscripcionesEspeciales.invalidate();
          setOpen(false);
          onCancel();
        },
        onError: () => {
          toast.error("No se pudo eliminar la inscripción especial");
        },
      },
    );
  };

  return (
    <FormProvider {...formHook}>
      <form className="space-y-6">
        {inscripcionEspecialData && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Asignar curso por materia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(
                inscripcionEspecialData.materiasInscripcion ??
                inscripcionEspecialData.materiasIds?.map((id, idx) => ({
                  materiaId: id,
                  materiaNombre: inscripcionEspecialData.materias?.[idx] ?? "",
                  cursoId: cursoPorMateriaMap.get(id) ?? null,
                  materiasAdeudadasIds: [],
                  materiasAdeudadasNombres: [],
                })) ??
                []
              ).map((mi, index) => {
                const cursoDelEstado = selectedCursos[index];
                const cursoSeleccionado =
                  cursoDelEstado !== undefined && cursoDelEstado > 0 ? cursoDelEstado : (mi.cursoId ?? 0);
                return (
                  <SelectCursoPorMateria
                    key={mi.materiaId}
                    materiaId={mi.materiaId}
                    materiaNombre={mi.materiaNombre}
                    selectedCurso={cursoSeleccionado}
                    onCursoChange={(cursoId) => {
                      setSelectedCursos((prev) => {
                        const updated = [...prev];
                        updated[index] = cursoId;
                        return updated;
                      });
                    }}
                  />
                );
              })}
              <div className="flex justify-end">
                <Button type="button" variant="default" onClick={handleGuardarCursos} className="w-full md:w-auto">
                  Guardar cursos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Campos de Contacto y Asistencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                      <div className="text-md min-h-4 text-danger">{fieldState.error && fieldState.error.message}</div>
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
                      <div className="text-md min-h-4 text-danger">{fieldState.error && fieldState.error.message}</div>
                    </div>
                  </>
                )}
              />
            </div>
            <Button
              type="button"
              variant="default"
              className="w-full border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
              onClick={() => setOpenContact(true)}
            >
              Contactar
            </Button>
            <Button
              type="button"
              variant="default"
              color="secondary"
              onClick={handleGuardar}
              className="w-full border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
            >
              Guardar cambios
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Campos para Aprobación con condición o Rechazo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex w-full flex-col gap-y-4">
              <FormTextarea
                id="respuesta"
                name="respuesta"
                label={"Comentarios"}
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
            title="Cancelar"
            type="button"
            variant="default"
            color="danger"
            onClick={() => setOpen(true)}
            className="w-full"
          >
            Eliminar
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
          <Button
            title="Aprobar"
            type="button"
            variant="default"
            color="primary"
            onClick={handleSubmit(handleAprobar)}
            className="w-full"
            disabled={estaAprobando}
          >
            Aprobar
          </Button>
          <Button
            title="Aprobar con condición"
            type="button"
            variant="default"
            color="primary"
            onClick={handleSubmit(handleAprobarConCondicion)}
            className="w-full"
            disabled={estaAprobandoCondicion}
          >
            Aprobar con condición
          </Button>
        </div>
      </form>
      <Dialog open={openContact} onOpenChange={setOpenContact}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Contactar Alumno</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input value={inscripcionEspecialData?.solicitante.email ?? ""} readOnly placeholder="Email" />
            <Input placeholder="Asunto" value={asunto} onChange={(e) => setAsunto(e.target.value)} maxLength={200} />
            <Textarea
              placeholder="Mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              maxLength={5000}
              className="min-h-[140px]"
            />
          </div>
          <DialogFooter>
            <Button variant="default" className="w-full" onClick={() => setOpenContact(false)}>
              Cancelar
            </Button>
            <Button
              variant="default"
              className="w-full"
              color="primary"
              onClick={() => {
                if (!asunto.trim() || !mensaje.trim()) {
                  toast.error("Asunto y mensaje son obligatorios");
                  return;
                }
                enviarMailContacto(
                  { id: inscripcionEspecialId, asunto: asunto.trim(), mensaje: mensaje.trim() },
                  {
                    onSuccess: () => {
                      toast.success("Correo enviado exitosamente");
                      setOpenContact(false);
                      setAsunto("");
                      setMensaje("");
                    },
                    onError: (error) => {
                      toast.error("Error al enviar el correo, intente de nuevo mas tarde");
                      console.error(error);
                    },
                  },
                );
              }}
              disabled={enviandoMail}
            >
              {enviandoMail ? "Enviando..." : "Enviar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ModalDrawer
        titulo={"Eliminar inscripción especial"}
        description={"¿Estás seguro de que deseas eliminar esta inscripción especial?"}
        open={open}
        onOpenChange={() => setOpen(false)}
        className={"max-h-[calc(100vh_-_10%)]"}
      >
        <div className="flex max-h-max w-full flex-row  gap-4">
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
            title="Cancelar"
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
