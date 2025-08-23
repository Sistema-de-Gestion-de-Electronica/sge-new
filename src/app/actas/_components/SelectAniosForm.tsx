'use client'

import { useFormContext, type FieldValues } from 'react-hook-form'
import { FormSelect, type FormSelectProps } from '@/components/ui/autocomplete'
import { useEffect, useState, useMemo, type ReactElement } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

type MockActa = {
  id: string
  titulo: string
  anio: number
}

const mockActas: MockActa[] = [
  { id: '1', titulo: 'Acta 01 - Reunión Enero', anio: 2025 },
  { id: '2', titulo: 'Acta 02 - Reunión Febrero', anio: 2025 },
  { id: '3', titulo: 'Acta 03 - Reunión Marzo', anio: 2024 },
  { id: '4', titulo: 'Acta 04 - Reunión Abril', anio: 2023 },
]

export const SelectAniosForm = <
  T extends FieldValues,
  TType extends string
>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, 'items'>): ReactElement => {
  const [data, setData] = useState<MockActa[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(mockActas)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  const anios = useMemo(() => {
    if (!data) return []
    const aniosUnicos = Array.from(new Set(data.map((a) => a.anio))).sort((a, b) => b - a)
    return aniosUnicos.map((anio) => ({
      label: String(anio),
      id: String(anio),
    }))
  }, [data])

  if (loading) {
    return <Skeleton className="h-10 w-full" />
  }

  return (
    <FormSelect
      name={name}
      control={control}
      items={anios}
      className={className}
      {...props}
    />
  )
}
