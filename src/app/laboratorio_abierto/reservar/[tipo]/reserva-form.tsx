import { FormProvider, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { Button, FormInput, ScrollArea, toast } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useEffect, useState } from "react";
import {
  type inputEditarReservaLaboratorioAbiertoSchema,
  inputEditarReservaLaboratorioForm,
  inputReservaLaboratorioAbiertoForm,
} from "@/shared/filters/reserva-laboratorio-filter.schema";
import { FormTextarea } from "@/components/ui/textarea";
import { FormEquipoTipoSelector } from "@/app/laboratorios/_components/filtros/equipo-tipo-selector";
import { type LaboratorioAbiertoType } from "../_components/laboratorios";
import { esFechaPasada, getDateISOString, getTimeISOString } from "@/shared/get-date";
import { SelectEspecialidadForm } from "@/app/_components/select-especialidad";
import { FormInputPoliticas } from "@/app/_components/input-form-politicas";
import { LaboratorioAbiertoTipo, ReservaEstatus } from "@/generated/prisma";
import { ReservaDetalle } from "../../_components/info-basica-reserva";
import { FormSelect } from "@/components/ui/autocomplete";
import { ConfirmarCambioEstadoModal } from "@/app/laboratorios/_components/modal-confirmar-reserva";
import { MotivoRechazo } from "@/app/laboratorios/_components/rechazo-alert";
import CustomDatePicker from "@/components/date-picker";
import { SelectSedeConLaboratorioForm } from "@/app/_components/select-ubicacion/select-sede-con-laboratorio";

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
} & ({ reservaId: number; tipo?: undefined } | { reservaId?: undefined; tipo: LaboratorioAbiertoType });

export type FormReservarLaboratorioAbiertoType = z.infer<typeof inputEditarReservaLaboratorioForm>;
export type DataLaboratorioAbiertoBack = z.infer<typeof inputEditarReservaLaboratorioAbiertoSchema>;

const cantidadPersonas = [...Array(8).keys()].map((i) => (i + 1).toString());

const turnos = [
  { label: "10:00 - 12:00", start: "10:00", end: "12:00" },
  { label: "12:00 - 14:00", start: "12:00", end: "14:00" },
  { label: "14:00 - 16:00", start: "14:00", end: "16:00" },
  { label: "16:00 - 18:00", start: "16:00", end: "18:00" },
  { label: "18:00 - 20:00", start: "18:00", end: "20:00" },
  { label: "20:00 - 22:00", start: "20:00", end: "22:00" },
];

export const LaboratorioAbiertoForm = ({ tipo, reservaId, onSubmit, onCancel }: Props) => {
  const esNuevo = reservaId === undefined;
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormReservarLaboratorioAbiertoType | null>(null);

  const crearReservaLaboratorioAbierto = api.reservas.reservaLaboratorioAbierto.crearReserva.useMutation();
  const modificarReservaLaboratorioAbierto = api.reservas.reservaLaboratorioAbierto.editarReserva.useMutation();
  const cancelarReservaLaboratorioAbierto = api.reservas.reservaLaboratorioAbierto.cancelarReserva.useMutation();
  const { data: reservaData } = api.reservas.reservaLaboratorioAbierto.getReservaPorID.useQuery(
    {
      id: reservaId!,
    },
    {
      enabled: !esNuevo,
    },
  );

  const diasDeshabilitados = [0];
  const estaEstatusAprobada = reservaData?.reserva.estatus === ReservaEstatus.FINALIZADA;
  const estaEstatusCancelada = reservaData?.reserva.estatus === ReservaEstatus.CANCELADA;

  const esTLA =
    tipo === LaboratorioAbiertoTipo.TLA || reservaData?.laboratorioAbiertoTipo === LaboratorioAbiertoTipo.TLA;

  const formHook = useForm<FormReservarLaboratorioAbiertoType>({
    mode: "onChange",
    defaultValues: {
      id: reservaId,
      tipo: esNuevo ? tipo : reservaData?.laboratorioAbiertoTipo,
      aceptoTerminos: false,
      concurrentes: esNuevo ? "1" : reservaData?.concurrentes.toString(),
      equipoReservado: esNuevo ? [] : (reservaData?.equipoReservado ?? []),
      fechaReserva: esNuevo ? undefined : getDateISOString(reservaData?.reserva.fechaHoraInicio as unknown as Date),
      turno: esNuevo
        ? undefined
        : turnos.find(
            (t) =>
              t.start === getTimeISOString(reservaData?.reserva.fechaHoraInicio) &&
              t.end === getTimeISOString(reservaData?.reserva.fechaHoraFin),
          )?.label,
      observaciones: esNuevo ? "" : (reservaData?.descripcion ?? ""),
      sedeId: esNuevo ? undefined : String(reservaData?.sedeId),
      especialidad: esNuevo ? "" : reservaData?.especialidad,
    },
    resolver: zodResolver(esNuevo ? inputReservaLaboratorioAbiertoForm : inputEditarReservaLaboratorioForm),
  });

  const { handleSubmit, control, setValue } = formHook;

  interface Turno {
    label: string;
    start: string;
    end: string;
  }

  const handleTurnoChange = (selectedTurnoLabel: string | null | undefined) => {
    const turno: Turno | undefined = turnos.find((t) => t.label === selectedTurnoLabel);
    if (turno) {
      if (selectedTurnoLabel) {
        setValue("turno", selectedTurnoLabel);
      }
    }
  };

  const handleFormSubmit = async (data: FormReservarLaboratorioAbiertoType) => {
    const selectedTurno = turnos.find((turno) => turno.label === data.turno);
    const dataToSend = {
      ...data,
      horaInicio: selectedTurno?.start ?? "",
      horaFin: selectedTurno?.end ?? "",
    };
    if (esNuevo) {
      await onFormSubmit(dataToSend);
    } else {
      setFormData(dataToSend);
      setModalOpen(true);
    }
  };

  const handleConfirmModificacion = () => {
    if (!formData) return;
    const selectedTurno = turnos.find((turno) => turno.label === formData.turno);
    const dataToSend = {
      ...formData,
      horaInicio: selectedTurno?.start ?? "",
      horaFin: selectedTurno?.end ?? "",
    };

    modificarReservaLaboratorioAbierto.mutate(dataToSend, {
      onSuccess: () => {
        toast.success("Reserva actualizada con éxito.");
        onSubmit();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al actualizar la reserva");
      },
    });
    setModalOpen(false);
  };

  useEffect(() => {
    if (reservaData) {
      const initialTurno = esNuevo
        ? undefined
        : turnos.find(
            (t) =>
              t.start === getTimeISOString(reservaData?.reserva.fechaHoraInicio) &&
              t.end === getTimeISOString(reservaData?.reserva.fechaHoraFin),
          )?.label;

      formHook.reset({
        id: reservaId,
        tipo: esNuevo ? tipo : reservaData?.laboratorioAbiertoTipo,
        aceptoTerminos: false,
        concurrentes: esNuevo ? "1" : reservaData?.concurrentes.toString(),
        equipoReservado: esNuevo ? [] : (reservaData?.equipoReservado ?? []),
        fechaReserva: esNuevo ? undefined : getDateISOString(reservaData?.reserva.fechaHoraInicio as unknown as Date),
        turno: initialTurno,
        observaciones: esNuevo ? "" : (reservaData?.descripcion ?? ""),
        sedeId: esNuevo ? undefined : String(reservaData?.sedeId),
      });
    }
  }, [esNuevo, formHook, reservaData, reservaId, tipo]);

  useEffect(() => {
    if (esNuevo) {
      setValue("tipo", tipo);
    }
    if (esTLA) {
      // Hack porque especialidad a veces no carga al apenas carga el formulario y requiere cerrar y volver a abrirlo
      setValue("especialidad", reservaData?.especialidad ?? "");
    }
  }, [esNuevo, tipo, setValue, reservaData?.especialidad, esTLA]);

  const onFormSubmit = async (formData: DataLaboratorioAbiertoBack) => {
    if (esNuevo) {
      crearReservaLaboratorioAbierto.mutate(formData, {
        onSuccess: () => {
          toast.success("Reserva creada con éxito.");
          onSubmit();
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al crear la reserva");
        },
      });

      return;
    }

    modificarReservaLaboratorioAbierto.mutate(formData, {
      onSuccess: () => {
        toast.success("Reserva actualizada con éxito.");
        onSubmit();
      },
      onError: (error) => {
        toast.error(error?.message ?? "Error al actualizar la reserva");
      },
    });
  };

  const handleClickClose = () => {
    formHook.reset();
    onCancel();
  };

  const handleCancelReserva = () => {
    cancelarReservaLaboratorioAbierto.mutate(
      { id: reservaId! },
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

  const haSidoRechazada = !!(
    reservaData &&
    reservaData?.reserva?.motivoRechazo &&
    reservaData.reserva.motivoRechazo.length > 0 &&
    reservaData?.reserva.estatus === ReservaEstatus.RECHAZADA
  );

  const esReservaPasada = esFechaPasada(reservaData?.reserva?.fechaHoraFin);

  if (reservaId && esReservaPasada) {
    return <ReservaDetalle reservaId={reservaId} mostrarCompleto />;
  }

  return (
    <FormProvider {...formHook}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="relative flex w-full flex-col md:px-4">
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full">
          <div className="mx-auto max-w-3xl space-y-6">
            {haSidoRechazada && <MotivoRechazo motivoRechazo={reservaData?.reserva.motivoRechazo ?? ""} />}
            <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormInput label={"Tipo de laboratorio"} control={control} name="tipo" type={"text"} readOnly />
              <SelectSedeConLaboratorioForm
                name="sedeId"
                label={"Sede"}
                control={control}
                placeholder={"Selecciona una sede"}
              />
              <FormSelect
                name={"concurrentes"}
                control={control}
                items={cantidadPersonas}
                label={"¿Cuántas personas concurrirán al laboratorio?"}
                clearable
              />
              <CustomDatePicker
                label="Fecha de reserva"
                control={control}
                name="fechaReserva"
                className=""
                disabledDays={diasDeshabilitados}
              />
              <FormSelect
                name="turno"
                label="Seleccionar Turno"
                control={control}
                items={turnos.map((turno) => turno.label)}
                onChange={handleTurnoChange}
              />
              <p className="text-sm text-gray-500">
                Si necesita utilizar el Laboratorio Abierto por un período superior a dos horas, reserve dos turnos
                consecutivos. En estos casos, tendrán prioridad los estudiantes que aún no hayan hecho uso del
                laboratorio durante el día.
              </p>
            </div>
            <div className="mx-auto space-y-6">
              {esTLA && (
                <SelectEspecialidadForm
                  name="especialidad"
                  label={"Especialidad"}
                  control={control}
                  placeholder={"Selecciona una especialidad"}
                />
              )}
              <FormTextarea
                label={"Breve descripción de la actividad"}
                control={control}
                name="observaciones"
                maxLength={250}
                showCharCount={true}
              />
              <FormEquipoTipoSelector name="equipoReservado" />
              <FormInputPoliticas name="aceptoTerminos" control={control} />
            </div>
          </div>
        </ScrollArea>
        <div className="flex w-full flex-row items-end justify-end space-x-4 pt-4">
          <Button title="Cerrar" type="button" variant="default" color="secondary" onClick={handleClickClose}>
            Cerrar
          </Button>
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
            <Button title="Guardar" type="submit" variant="default" color="primary">
              {estaEstatusAprobada ? "Modificar" : "Guardar"}
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
