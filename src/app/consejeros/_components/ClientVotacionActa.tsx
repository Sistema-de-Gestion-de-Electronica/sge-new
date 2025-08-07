'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { SelectActasForm } from './SelectActasForm'
import { SelectAniosForm } from './SelectAniosForm'

export function ClientVotacionActa() {
  const methods = useForm({ defaultValues: { anio: '2025', acta: '' } })

  return (
    <FormProvider {...methods}>
      <form className="space-y-6">
        {/* Filtros Año y Acta */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="w-[200px]">
            <SelectAniosForm name="anio" control={methods.control} />
          </div>
          <div className="w-[300px]">
            <SelectActasForm name="acta" control={methods.control} />
          </div>
        </div>

        {/* Header acta */}
        <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">Acta 1</h1>
          <p className="text-sm text-gray-600">
            Acta emitida bla bla bla sobre temas importantes tratados en la reunión...
          </p>
        </div>

        {/* Votación + Comentario*/}
        <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
          <h2 className="text-base font-medium text-gray-900 mb-4">Votar sobre el acta</h2>
          <div className="flex gap-3 flex-wrap mb-6">
            {['ACUERDO', 'DESACUERDO', 'PARCIAL'].map((op) => (
              <button key={op}
                type="button"
                className="px-4 py-2 text-sm font-medium rounded-md border border-orange-300 bg-orange-100 text-orange-800 hover:bg-orange-200 transition"
              >
                {op === 'ACUERDO' ? 'De acuerdo' : op === 'DESACUERDO' ? 'En desacuerdo' : 'Acuerdo parcial'}
              </button>
            ))}
          </div>

          <h2 className="text-base font-medium text-gray-900 mb-2">Dejar un comentario</h2>
          <textarea
            className="w-full border border-gray-300 text-sm rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Escribí tu comentario aquí..."
          />
          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Enviar voto
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
