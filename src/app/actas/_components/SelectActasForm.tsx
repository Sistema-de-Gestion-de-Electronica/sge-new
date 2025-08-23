'use client'

import { useFormContext, type FieldValues } from 'react-hook-form'
import { FormSelect, type FormSelectProps } from '@/components/ui/autocomplete'
import { useEffect, useMemo, useState, type ReactElement } from 'react'
import { Select, SelectTrigger, SelectValue } from '@/components/ui'
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

export const SelectActasForm = <
  T extends FieldValues,
  TType extends string
>({
  name,
  control,
  className,
  ...props
}: Omit<FormSelectProps<T, TType>, 'items'>): ReactElement => {
  const { watch } = useFormContext()
  const anioSeleccionado = watch('anio')
  const [data, setData] = useState<MockActa[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData(mockActas)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  const actasFiltradas = useMemo(() => {
    if (!data) return []
    return data
      .filter((acta) => !anioSeleccionado || acta.anio === parseInt(anioSeleccionado))
      .map((acta) => ({
        label: acta.titulo,
        id: acta.id,
        anio: acta.anio,
      }))
  }, [data, anioSeleccionado])

  if (loading) {
    return <Skeleton className="h-10 w-full" />
  }

  return (
    <FormSelect
      name={name}
      control={control}
      items={actasFiltradas}
      className={className}
      {...props}
    />
  )
}
