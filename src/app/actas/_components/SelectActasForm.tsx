"use client"

import { useFormContext, type FieldValues } from "react-hook-form"
import { FormSelect, type FormSelectProps } from "@/components/ui/autocomplete"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/trpc/react"
import type { ReactElement } from "react"

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
  const { watch } = useFormContext()
  const anioSeleccionado = watch("anio") as string | number | undefined

  const { data, isLoading, isError } = api.actas.getAllActas.useQuery(
    { anio: anioSeleccionado ? Number(anioSeleccionado) : undefined },
    { keepPreviousData: true }
  )

  if (isLoading) return <Skeleton className="h-10 w-full" />
  if (isError) return <div className="text-sm text-red-600">No se pudieron cargar las actas.</div>

  const items: Item[] =
    data?.map((a) => ({
      id: String(a.id),
      label: a.nombreActa,
    })) ?? []

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
