"use client"

import { useFormContext, useWatch, type FieldValues } from "react-hook-form"
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

  // 1) setear valor por defecto cuando cambia la lista (p.ej., cambia el año)
  useEffect(() => {
    const fieldName = name as string
    if (!items.length) {
      setValue(fieldName, undefined, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      onStateChange?.(undefined);
      return;
    }

    const currentRaw = getValues(fieldName) as unknown
    const currentId =
      typeof currentRaw === "object" && currentRaw !== null
        ? (currentRaw as any).id
        : (currentRaw as string | undefined)

    const exists = currentId ? items.some(i => i.id === String(currentId)) : false

    if (!exists) {
      const first = items[0]!
      setValue(fieldName, first.id, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
      onStateChange?.(first)
    }
  }, [items, name, getValues, setValue, onStateChange])


    // 2) reaccionar a cambios de selección dentro del MISMO año
  const selectedId = useWatch({ name: name as string, control }) as string | undefined

  useEffect(() => {
    if (!items.length || !selectedId) return
    const sel = items.find(i => i.id === String(selectedId))
    if (sel) onStateChange?.(sel)
  }, [selectedId, items, onStateChange])

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
