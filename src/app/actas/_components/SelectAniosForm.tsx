"use client"

import { useEffect, useMemo, type ReactElement } from "react"
import { useFormContext, type FieldValues } from "react-hook-form"
import { FormSelect, type FormSelectProps } from "@/components/ui/autocomplete"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/trpc/react"

export const SelectAniosForm = <
  T extends FieldValues,
  TType extends string
>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, "items">): ReactElement => {
  // 1) Hooks SIEMPRE arriba
  const { getValues, setValue } = useFormContext()
  const { data, isLoading } = api.actas.getAllAniosActas.useQuery()

  // 2) Derivo items de manera segura
  const items = useMemo(
    () =>
      (data ?? []).map((anio) => ({
        label: String(anio),
        id: String(anio),
      })),
    [data]
  )

  // 3) Autoseleccionar el año más reciente si no hay valor actual
  useEffect(() => {
    if (!items.length) return
    const current = getValues(name as string) as string | undefined
    if (current) return
    setValue(name as string, items[0]!.id, { shouldValidate: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  // 4) Recién acá render condicional
  if (isLoading) return <Skeleton className="h-10 w-full" />

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
