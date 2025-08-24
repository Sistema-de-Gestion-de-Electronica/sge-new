"use client"

import { type FieldValues } from "react-hook-form"
import { FormSelect, type FormSelectProps } from "@/components/ui/autocomplete"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/trpc/react"
import { type ReactElement } from "react"

export const SelectAniosForm = <
  T extends FieldValues,
  TType extends string
>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items">): ReactElement => {
  // `useQuery` devuelve { data, isLoading, error, ... }
  const { data, isLoading } = api.actas.getAllAniosActas.useQuery()

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />
  }

  const items =
    data?.map((anio) => ({
      label: String(anio),
      id: String(anio),
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
