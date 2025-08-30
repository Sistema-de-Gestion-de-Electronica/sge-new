"use client"

import { useFormContext, type FieldValues } from "react-hook-form"
import { FormSelect, type FormSelectProps } from "@/components/ui/autocomplete"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/trpc/react"
import { useEffect, useMemo, type ReactElement } from "react"

type Estado = "ABIERTA" | "CERRADA";
type Item = { id: string; label: string; estado: Estado };

export const SelectActasForm = <
  T extends FieldValues,
  TType extends string
>({
  name,
  control,
  className,
  onStateChange,
  ...props
}: Omit<FormSelectProps<T, TType>, "items">): ReactElement => {
  const { watch, getValues, setValue } = useFormContext()
  const anioSeleccionado = watch("anio") as string | number | undefined

  const { data, isLoading, isError } = api.actas.getAllActas.useQuery(
    { anio: anioSeleccionado ? Number(anioSeleccionado) : undefined },
    { keepPreviousData: true, enabled: !!anioSeleccionado }
  )

  const items: Item[] = useMemo(
    () => (data ?? []).map(a => ({ id: String(a.id), label: a.nombreActa, estado: a.estado,})),
    [data]
  )

  useEffect(() => {
    if (!items.length) return
    const fieldName = name as string

    const currentRaw = getValues(fieldName) as unknown
    const currentId =
      typeof currentRaw === "object" && currentRaw !== null
        ? (currentRaw as any).id
        : (currentRaw as string | undefined)

    const exists = currentId ? items.some(i => i.id === String(currentId)) : false

    if (!exists) {
      const first = items[0]!;
      setValue(fieldName, first.id, { shouldValidate: true });
      onStateChange?.(first.estado);
    } else {
      const sel = items.find((i) => i.id === String(currentId));
      if (sel) onStateChange?.(sel.estado);
    }
  }, [items]);

  if (isLoading) return <Skeleton className="h-10 w-full" />
  if (isError)   return <div className="text-sm text-red-600">No se pudieron cargar las actas.</div>

  const currentRaw = getValues(name as string) as unknown
  const currentId =
    typeof currentRaw === "object" && currentRaw !== null
      ? (currentRaw as any).id
      : (currentRaw as string | undefined)
  const ready = !!items.length && items.some(i => i.id === String(currentId))

  if (!ready) return <Skeleton className="h-10 w-full" />

  return (
    <FormSelect
      name={name}
      control={control}
      items={items}
      className={className}
      {...props}
    />
  )
}
