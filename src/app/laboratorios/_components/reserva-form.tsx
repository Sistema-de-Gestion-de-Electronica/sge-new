/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, FormProvider, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { Button, FormInput, Input, ScrollArea, toast } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useEffect, useMemo, useState } from "react";
import {
  inputEditarReservaLaboratorioCerradoSchema,
  inputReservaLaboratorioCerrado,
  inputReservaLaboratorioDiscrecional,
} from "@/shared/filters/reserva-laboratorio-filter.schema";
import { FormTextarea } from "@/components/ui/textarea";
import { FormEquipoTipoSelector } from "./filtros/equipo-tipo-selector";
import { CursoTurno } from "@/app/_components/turno-text";
import { Switch } from "@/components/ui/switch";
import { FormInputPoliticas } from "@/app/_components/input-form-politicas";
import { armarFechaReserva, esFechaPasada, getDateISOString } from "@/shared/get-date";
import { ReservaEstatus, TurnoCurso } from "@/generated/prisma";
import { ReservaDetalle } from "./info-basica-reserva";
import CustomDatePicker from "@/components/date-picker";
import { MotivoRechazo } from "./rechazo-alert";
import { LaptopIcon, ProjectorIcon, ScreenShareIcon } from "lucide-react";
import { SelectLaboratorioFormConEstadoReservaForm } from "@/app/_components/select-ubicacion/select-laboratorio";
import { ConfirmarCambioEstadoModal } from "./modal-confirmar-reserva";
import { SelectSedeConLaboratorioForm } from "@/app/_components/select-ubicacion/select-sede-con-laboratorio";
import { SelectMateriasForm } from "@/app/cursos/_components/select-materia";
import { getUserLabelNameForSelect, SelectProfesorForm } from "@/app/_components/select-usuario";

type Props = {
  cursoId?: string | null | number;
  reservaId?: number;
  onSubmit: () => void;
  onCancel: () => void;
};

type FormHelperType = {
  discrecionalDocente: { id: string; label: string };
};

type FormReservarLaboratorioType =
  | z.infer<typeof inputEditarReservaLaboratorioCerradoSchema>
  | (z.infer<typeof inputReservaLaboratorioDiscrecional> & FormHelperType);

export const LaboratorioCerradoForm = ({ reservaId, cursoId, onSubmit, onCancel }: Props) => {
  const esNuevo = reservaId === undefined;
  const esDiscrecional = !cursoId;
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormReservarLaboratorioType | null>(null);

  const {
    data: curso,
    isLoading,
    isError,
  } = api.cursos.cursoPorId.useQuery({ id: Number(cursoId!) }, { enabled: !esDiscrecional });
  const { data: reservaData } = api.reservas.reservarLaboratorioCerrado.getReservaPorID.useQuery(
    { id: reservaId! },
    { enabled: !esNuevo },
  );

  const crearReservaLaboratorio = api.reservas.reservarLaboratorioCerrado.crearReserva.useMutation();
  const crearReservaDiscrecional = api.reservas.reservarLaboratorioCerrado.crearReservaDiscrecional.useMutation();
  const modificarReservaLaboratorio = api.reservas.reservarLaboratorioCerrado.editarReserva.useMutation();
  const cancelarReservaLaboratorio = api.reservas.reservarLaboratorioCerrado.cancelarReserva.useMutation();

  const estaEstatusAprobada = reservaData?.reserva.estatus === ReservaEstatus.FINALIZADA;
  const estaEstatusCancelada = reservaData?.reserva.estatus === ReservaEstatus.CANCELADA;
  const haSidoRechazada = !!(
    reservaData &&
    reservaData?.reserva?.motivoRechazo &&
    reservaData.reserva.motivoRechazo.length > 0
  );

  const esReservaPasada = esFechaPasada(reservaData?.reserva?.fechaHoraFin);

  const reservaBase = useMemo(() => {
    return {
      id: reservaId ?? undefined,
      cursoId: cursoId ? Number(cursoId) : undefined,
      aceptoTerminos: false,
      equipoReservado: esNuevo ? [] : (reservaData?.equipoReservado ?? []),
      fechaReserva: esNuevo ? undefined : getDateISOString(reservaData?.reserva.fechaHoraInicio as unknown as Date),
      requierePc: reservaData?.requierePC ?? false,
      requiereProyector: reservaData?.requiereProyector ?? false,
      turno: esNuevo ? TurnoCurso.MANANA : reservaData?.curso?.turno,
      observaciones: reservaData?.descripcion ?? "",
      esDiscrecional: esDiscrecional,
      sedeId: esDiscrecional ? String(reservaData?.sedeId) : undefined,
      agregarAPantalla: esDiscrecional ? false : undefined,
      discrecionalTitulo: esDiscrecional ? reservaData?.discrecionalTitulo : undefined,
      discrecionalMateriaId: esDiscrecional ? reservaData?.discrecionalMateriaId : undefined,
      discrecionalDocente: esDiscrecional
        ? {
            id: reservaData?.discrecionalDocenteId ?? undefined,
            label: reservaData?.discrecionalDocente ? getUserLabelNameForSelect(reservaData.discrecionalDocente) : "",
          }
        : undefined,
      discrecionalDocenteId: esDiscrecional ? reservaData?.discrecionalDocenteId : undefined,
    } as FormReservarLaboratorioType;
  }, [cursoId, esDiscrecional, esNuevo, reservaData, reservaId]);

  const diasDeshabilitados = useMemo(() => {
    const mapDias = {
      DOMINGO: 0,
      LUNES: 1,
      MARTES: 2,
      MIERCOLES: 3,
      JUEVES: 4,
      VIERNES: 5,
      SABADO: 6,
    };
    const allDays = Object.values(mapDias);
    if (!curso) return [];
    if (curso.dia1 && !curso.dia2) return allDays.filter((day) => day !== mapDias[curso.dia1]);
    return allDays.filter((day) => day !== mapDias[curso.dia1] && (curso.dia2 ? day !== mapDias[curso.dia2] : true));
  }, [curso]);

  const formHook = useForm<FormReservarLaboratorioType>({
    mode: "onChange",
    defaultValues: reservaBase,
    resolver: zodResolver(
      esDiscrecional
        ? inputReservaLaboratorioDiscrecional
        : esNuevo
          ? inputReservaLaboratorioCerrado
          : inputEditarReservaLaboratorioCerradoSchema,
    ),
  });

  const handleFormSubmit = async (data: FormReservarLaboratorioType) => {
    if (esNuevo) {
      await onFormSubmit(data);
    } else {
      setFormData(data);
      setModalOpen(true);
    }
  };

  const handleConfirmModificacion = () => {
    if (!formData) return;

    modificarReservaLaboratorio.mutate(
      { ...formData, id: reservaId!, cursoId: Number(reservaData?.cursoId) },
      {
        onSuccess: () => {
          toast.success("Reserva modificada con éxito.");
          onSubmit();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al modificar la reserva");
        },
      },
    );
    setModalOpen(false);
  };

  useEffect(() => formHook.reset(reservaBase), [formHook, reservaBase]);

  const [discrecionalDocente] = formHook.watch(["discrecionalDocente"]);
  useEffect(() => formHook.setValue("discrecionalDocenteId", discrecionalDocente?.id), [formHook, discrecionalDocente]);

  if (reservaId && esReservaPasada) {
    return <ReservaDetalle reservaId={reservaId} mostrarCompleto />;
  }

  const { handleSubmit, control } = formHook;

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar...</div>;
  }

  const onFormSubmit = async (formData: FormReservarLaboratorioType) => {
    if (esDiscrecional) {
      crearReservaDiscrecional.mutate(
        {
          ...formData,
          sedeId: String(formHook.watch("sedeId")),
          horaInicio: formHook.watch("horaInicio"),
          horaFin: formHook.watch("horaFin"),
          laboratorioId: String(formHook.watch("laboratorioId")),
          agregarAPantalla: formHook.watch("agregarAPantalla"),
          discrecionalTitulo: formHook.watch("discrecionalTitulo"),
          discrecionalMateriaId: formHook.watch("discrecionalMateriaId"),
          discrecionalDocenteId: formHook.watch("discrecionalDocenteId"),
        },
        {
          onSuccess: () => {
            toast.success("Reserva creada con éxito.");
            onSubmit();
          },
          onError: (error) => {
            toast.error(error?.message ?? "Error al crear la reserva");
          },
        },
      );
      return;
    }

    if (esNuevo) {
      crearReservaLaboratorio.mutate(
        { ...formData, cursoId: Number(cursoId) },
        {
          onSuccess: () => {
            toast.success("Reserva creada con éxito.");
            onSubmit();
          },
          onError: (error) => {
            toast.error(error?.message ?? "Error al crear la reserva");
          },
        },
      );
      return;
    }

    modificarReservaLaboratorio.mutate(
      { ...formData, id: reservaId, cursoId: Number(reservaData?.cursoId) },
      {
        onSuccess: () => {
          toast.success("Reserva modificada con éxito.");
          onSubmit();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al modificar la reserva");
        },
      },
    );
  };

  const handleCancelReserva = () => {
    cancelarReservaLaboratorio.mutate(
      { id: reservaId!, motivo: "Cancelada por el usuario" },
      {
        onSuccess: () => {
          toast.success("Reserva cancelada con éxito.");
          onCancel();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al cancelar la reserva");
        },
      },
    );
  };

  const caracteresEnObservaciones = formHook.watch("observaciones")?.length ?? 0;

  return (
    <FormProvider {...formHook}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="relative flex w-full flex-col gap-4">
        <ScrollArea className="max-h-[calc(100vh_-_320px)]">
          <div className="flex w-full flex-col items-center justify-center">
            {haSidoRechazada && <MotivoRechazo motivoRechazo={reservaData?.reserva.motivoRechazo ?? ""} />}
            <div className="flex flex-col space-y-4 px-0 md:px-6">
              {!esDiscrecional && (
                <>
                  <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                    <div className="mt-4 w-full">
                      <Input
                        label={"Materia"}
                        name="materia"
                        type={"text"}
                        disabled
                        className="mt-2"
                        value={curso?.materia.nombre ?? ""}
                        readOnly
                      />
                    </div>
                    <div className="mt-4 w-full">
                      <Input
                        label={"División"}
                        name="division"
                        disabled
                        type={"text"}
                        className="mt-2"
                        value={curso?.division.nombre ?? ""}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                    <div className="mt-4 w-full">
                      <Input
                        label={"Turno"}
                        name="turno"
                        type={"text"}
                        disabled
                        className="mt-2"
                        value={CursoTurno({ turno: curso?.turno })}
                        readOnly
                      />
                    </div>
                    <div className="mt-4 w-full">
                      <Input
                        label={"Sede"}
                        name="sede"
                        disabled
                        type={"text"}
                        className="mt-2"
                        value={curso?.sede.nombre ?? ""}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                    <div className="mt-4 w-full">
                      <Input
                        label={"Profesor"}
                        name="profesor"
                        type={"text"}
                        disabled
                        className="mt-2"
                        value={`${curso?.profesor.nombre} ${curso?.profesor.apellido}`}
                        readOnly
                      />
                    </div>
                    <div className="mt-4 w-full">
                      <Input
                        label={"Ayudante/s"}
                        name="ayudante"
                        disabled
                        type={"text"}
                        className="mt-2"
                        value={curso?.ayudantes.map((ayudante) => ayudante.usuario.apellido).join(", ") ?? ""}
                        readOnly
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                <div className="mt-4 basis-1/2">
                  <CustomDatePicker
                    label="Fecha de reserva"
                    control={control}
                    name="fechaReserva"
                    className="mt-2"
                    disabledDays={diasDeshabilitados}
                  />
                </div>
              </div>

              {esDiscrecional && (
                <div className="rounded-lg border border-gray-800 p-4">
                  <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                    <p className="text-sm italic text-gray-950">Reserva Discrecional</p>
                  </div>

                  <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                    <div className="mt-4 w-full">
                      <FormInput
                        label={"Título de la reserva discrecional"}
                        control={control}
                        name="discrecionalTitulo"
                        type={"text"}
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                    <div className="mt-4 basis-1/2">
                      <SelectSedeConLaboratorioForm
                        name="sedeId"
                        label={"Sede"}
                        control={control}
                        className="mt-2"
                        placeholder={"Selecciona una sede"}
                      />
                    </div>

                    <div className="mt-4 basis-1/2">
                      <SelectMateriasForm
                        name="discrecionalMateriaId"
                        control={control}
                        className="mt-2"
                        label="Materia"
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                    <div className="mt-4 w-full">
                      <SelectProfesorForm
                        name="discrecionalDocente"
                        realNameId="discrecionalDocenteId"
                        control={control}
                        className="mt-2"
                        label="Profesor"
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                    <div className="mt-4 basis-1/2">
                      <FormInput
                        label={"Hora de inicio"}
                        control={control}
                        name="horaInicio"
                        className="mt-2"
                        type={"time"}
                      />
                    </div>
                    <div className="mt-4 basis-1/2">
                      <FormInput
                        label={"Hora de fin"}
                        control={control}
                        name="horaFin"
                        className="mt-2"
                        type={"time"}
                      />
                    </div>
                  </div>

                  <SelectLaboratorioFormConEstadoReservaForm
                    name="laboratorioId"
                    control={control}
                    className="mt-2"
                    label="Laboratorio"
                    placeholder="Selecciona un laboratorio"
                    sedeId={formHook.watch("sedeId")}
                    excepcionReservaId={reservaId}
                    fechaHoraInicio={armarFechaReserva(formHook.watch("fechaReserva"), formHook.watch("horaInicio"))}
                    fechaHoraFin={armarFechaReserva(formHook.watch("fechaReserva"), formHook.watch("horaFin"))}
                    laboratorioId={formHook.watch("laboratorioId")}
                  />

                  <div className="items-top mt-4 flex space-x-2">
                    <Controller
                      control={control}
                      name="agregarAPantalla"
                      render={({ field }) => (
                        <label
                          htmlFor="agregarAPantalla"
                          className="flex w-full items-center justify-between rounded-md border p-2 hover:cursor-pointer hover:bg-gray-100/20"
                        >
                          <div className="flex flex-row justify-center text-base">
                            <ScreenShareIcon className="m-auto mr-2 h-4 w-4" /> Agregar a pantalla
                          </div>
                          <Switch id="agregarAPantalla" checked={field.value} onCheckedChange={field.onChange} />
                        </label>
                      )}
                    />
                  </div>
                </div>
              )}

              <div className="flex w-full flex-col justify-end gap-y-4 lg:justify-between">
                <div className="items-top flex space-x-2">
                  <Controller
                    control={control}
                    name="requierePc"
                    render={({ field }) => (
                      <label
                        htmlFor="requierePc"
                        className="flex w-full items-center justify-between rounded-md border p-2 hover:cursor-pointer hover:bg-gray-100/20"
                      >
                        <div className="flex flex-row justify-center text-base">
                          <LaptopIcon className="m-auto mr-2 h-4 w-4" /> Requiere PCs para los alumnos
                        </div>
                        <Switch id="requierePc" checked={field.value} onCheckedChange={field.onChange} />
                      </label>
                    )}
                  />
                </div>

                <div className="items-top flex space-x-2">
                  <Controller
                    control={control}
                    name="requiereProyector"
                    render={({ field }) => (
                      <label
                        htmlFor="requiereProyector"
                        className="flex w-full items-center justify-between rounded-md border p-2 hover:cursor-pointer hover:bg-gray-100/20"
                      >
                        <div className="flex flex-row justify-center text-base">
                          <ProjectorIcon className="m-auto mr-2 h-4 w-4" /> Requiere proyector
                        </div>
                        <Switch id="requiereProyector" checked={field.value} onCheckedChange={field.onChange} />
                      </label>
                    )}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col justify-end gap-y-4 lg:justify-between">
                <FormEquipoTipoSelector name="equipoReservado" />
              </div>

              <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                <div className="mt-4 w-full">
                  <FormTextarea
                    label={"Descripción de la actividad"}
                    control={control}
                    name="observaciones"
                    className="mt-2 max-h-[100px] w-full"
                    maxLength={250}
                  />
                  <small className="text-sm text-muted-foreground">
                    {250 - caracteresEnObservaciones} caracteres restantes
                  </small>
                </div>
              </div>
              <div className="flex w-full flex-row gap-x-4 lg:flex-row lg:justify-between">
                <div className="mt-4">
                  <div className="items-top flex space-x-2">
                    <FormInputPoliticas name="aceptoTerminos" control={control} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex w-full flex-row items-end justify-end space-x-4">
          {!esNuevo && !estaEstatusCancelada && !esReservaPasada && (
            <Button
              title="Cancelar Reserva"
              type="button"
              variant="default"
              color="danger"
              onClick={handleCancelReserva}
            >
              Cancelar Reserva
            </Button>
          )}
          {!estaEstatusCancelada && !esReservaPasada && (
            <Button title="Guardar" type="submit" variant="default" color="primary" className="">
              {estaEstatusAprobada
                ? "Modificar"
                : haSidoRechazada
                  ? "Modificar y solicitar"
                  : esDiscrecional
                    ? "Guardar y aprobar"
                    : "Guardar"}
            </Button>
          )}
          {!esNuevo && (
            <ConfirmarCambioEstadoModal
              open={isModalOpen}
              onOpenChange={setModalOpen}
              handleModificar={handleConfirmModificacion}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};
