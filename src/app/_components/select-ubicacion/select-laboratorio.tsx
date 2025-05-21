import { useEffect, useMemo, useState, type ReactElement } from "react";
import type { FieldValues } from "react-hook-form";
import { api, type RouterInputs } from "@/trpc/react";
import { FormSelect, type ISelectItem, type FormSelectProps } from "@/components/ui/autocomplete";
import { Skeleton } from "@/components/ui/skeleton";
import { Label, Select, SelectTrigger, SelectValue } from "@/components/ui";
import { CheckIcon, XIcon } from "lucide-react";
import { LaboratorioOcupado } from "../laboratorio-ocupado";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/components/utils";

type Props = RouterInputs["admin"]["laboratorios"]["getAll"];
export const SelectLaboratorioConArmariosForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items"> & Props): ReactElement => {
  const { data, isLoading, isError } = api.admin.laboratorios.getAllConArmarios.useQuery({ sedeId: props.sedeId });

  const laboratorios: ISelectItem[] = useMemo(() => {
    if (!data) return [];

    return data.map((laboratorio) => {
      const { id, nombre: label } = laboratorio;

      return {
        label,
        id: String(id),
      };
    });
  }, [data]);

  if (isLoading) {
    return <SelectLoading label={props.label ?? ""} className={className} />;
  }

  if (isError) {
    return <SelectError />;
  }

  return (
    <FormSelect
      isLoading={isLoading}
      className={className}
      name={name}
      control={control}
      items={laboratorios}
      label={"Seleccioná un laboratorio"}
      {...props}
    />
  );
};

type PropsConEstadoReserva = RouterInputs["admin"]["laboratorios"]["getAllConEstadoReserva"];
export const SelectLaboratorioFormConEstadoReservaForm = <T extends FieldValues, TType extends string>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items"> &
  PropsConEstadoReserva & { laboratorioId: string | null | undefined; esAbierto?: boolean }): ReactElement => {
  const [seleccionoFueraSede, setSeleccionoFueraSede] = useState(false);
  const [ignorarSede, setIgnorarSede] = useState(false);

  const propsQuery: PropsConEstadoReserva = {
    excepcionReservaId: props.excepcionReservaId,
    fechaHoraFin: props.fechaHoraFin,
    fechaHoraInicio: props.fechaHoraInicio,
    searchText: undefined,
    sedeId: props.sedeId,
    ignorarSede,
  };

  const { data, isLoading, isError } = api.admin.laboratorios.getAllConEstadoReserva.useQuery(propsQuery);

  const laboratorios: ISelectItem[] = useMemo(() => {
    if (!data) return [];

    return data.laboratorios.map((laboratorio) => {
      const { id, nombre: label, estaOcupado } = laboratorio;

      return {
        label: `${ignorarSede ? `(${laboratorio.sede.nombre})` : ""} ${label} (${estaOcupado ? "Ocupado" : "Libre"})`,
        id: String(id),
        icon: !estaOcupado ? <CheckIcon className="text-success" /> : <XIcon className="text-danger" />,
      };
    });
  }, [data, ignorarSede]);

  useEffect(() => {
    if (!data) return;
    if (!props.laboratorioId) return;

    const seSeleccionoLaboratorioEnLista = data?.laboratorios.some(
      (laboratorio) => laboratorio.id === Number(props.laboratorioId),
    );
    if (!seSeleccionoLaboratorioEnLista) {
      setIgnorarSede(true);
      setSeleccionoFueraSede(true);
    } else {
      setSeleccionoFueraSede(false);
    }
  }, [data, props.laboratorioId]);

  if (isLoading) {
    return <SelectLoading label={props.label ?? ""} className={className} />;
  }

  if (isError) {
    return <SelectError />;
  }

  const onChangeIgnorarSede = (value: boolean) => {
    if (seleccionoFueraSede) {
      return;
    }
    setIgnorarSede(value);
  };

  return (
    <div className="flex flex-col gap-x-2">
      <FormSelect
        className={className}
        name={name}
        control={control}
        items={laboratorios}
        {...props}
        disabled={!props.sedeId || props.disabled}
        clearable
      />
      {props.fechaHoraInicio && props.fechaHoraFin && props.laboratorioId && (
        <LaboratorioOcupado
          laboratorioId={Number(props.laboratorioId)}
          excepcionReservaId={props.excepcionReservaId}
          fechaHoraInicio={props.fechaHoraInicio}
          fechaHoraFin={props.fechaHoraFin}
        />
      )}
      <div className="mt-2 flex flex-row gap-x-2 text-base">
        <Switch id="ignorarSede" name="ignorarSede" checked={ignorarSede} onCheckedChange={onChangeIgnorarSede} />
        <label htmlFor="ignorarSede">
          <span className="text-base">Ignorar sede</span>
        </label>
      </div>
    </div>
  );
};

const SelectLoading = ({ label, className }: { label: string; className?: string }) => {
  return (
    <div className="flex flex-col gap-x-2">
      <div className={cn("relative", className)}>
        <Label className="mb-3 block text-sm">{label}</Label>
        <Skeleton className="h-10 w-full" />
        <div className="mt-2 flex flex-row gap-x-2 text-base">
          <Skeleton className="h-6 w-11 rounded-full" />
          <label htmlFor="ignorarSede">
            <span className="text-base">Ignorar sede</span>
          </label>
        </div>
      </div>
    </div>
  );
};

const SelectError = () => {
  return (
    <Select>
      <div className="flex flex-row items-center space-x-2">
        <SelectTrigger
          disabled
          id="selectLaboratorio"
          className="group-hover:border-input-hover h-10 transition-colors focus:border-primary focus:ring-0"
        >
          <SelectValue placeholder="Error cargando laboratorios" />
        </SelectTrigger>
      </div>
    </Select>
  );
};
