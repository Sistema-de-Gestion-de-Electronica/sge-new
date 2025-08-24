"use client"

import { useFormContext, type FieldValues } from "react-hook-form"
import { FormSelect, type FormSelectProps } from "@/components/ui/autocomplete"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/trpc/react"
import { useEffect, type ReactElement } from "react"

type Item = { id: string; label: string }

export const SelectActasForm = <
  T extends FieldValues,
  TType extends string
>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items">): ReactElement => {
  const { watch, getValues, setValue } = useFormContext()
  const anioSeleccionado = watch("anio") as string | number | undefined

  const { data, isLoading, isError } = api.actas.getAllActas.useQuery(
    { anio: anioSeleccionado ? Number(anioSeleccionado) : undefined },
    { keepPreviousData: true, enabled: !!anioSeleccionado }
  )

  if (isLoading) return <Skeleton className="h-10 w-full" />
  if (isError)   return <div className="text-sm text-red-600">No se pudieron cargar las actas.</div>

  const items: Item[] =
    data?.map((a) => ({ id: String(a.id), label: a.nombreActa })) ?? []

  // Autoseleccionar la más reciente (primer ítem) si no hay valor
  useEffect(() => {
    if (!items.length) return
    const current = getValues(name as string) as string | undefined
    if (current) return
    setValue(name as string, items[0]!.id, { shouldValidate: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

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
