import { type FieldValues, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { PoliticasPrivacidadModal } from "@/app/_components/politicas-privacidad";
import { type FormInputProps } from "@/components/ui";

export const FormInputPoliticas = <T extends FieldValues>({ name, control }: FormInputProps<T>): React.ReactElement => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <div className="space-y-3 leading-none">
            <p className="text-sm text-black">
              La política de uso de laboratorio ha cambiado,{" "}
              <PoliticasPrivacidadModal triggerText="presione aquí para verla" />
            </p>
            <label
              htmlFor="aceptoTerminos"
              className="flex items-center space-x-2 text-sm leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Checkbox
                id="aceptoTerminos"
                name="aceptoTerminos"
                className="h-5 w-5"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <span>Declaro conocer las nuevas políticas de uso de laboratorio</span>
            </label>
            <div className="min-h-4 text-sm text-danger">{fieldState.error && fieldState.error.message}</div>
          </div>
        </>
      )}
    />
  );
};
