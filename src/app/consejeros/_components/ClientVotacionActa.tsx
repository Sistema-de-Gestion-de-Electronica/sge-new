'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { SelectActasForm } from './SelectActasForm'
import { SelectAniosForm } from './SelectAniosForm'
import PdfIframeViewer from './PdfIframeViewer'
import { Button } from '@/components/ui/button'

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
          {/* acta.estado === abierta ? ( */}
          {true ? (
            <>
              <h1 className="text-xl font-semibold text-gray-900">
                Acta del Consejo Departamental a evaluar
              </h1>
              <p className="text-sm text-gray-600">
                Consejeros/as: El acta que se muestra a continuación contiene el resumen de lo tratado en la última reunión con fecha 2025-05-08.
                Por favor exprese al pie su conformidad o disconformidad con la misma a los efectos de considerar su aprobación en la próxima reunión.
                En caso de disconformidad o conformidad parcial, les pedimos que nos hagan saber en los comentarios las razones de esa opinión, con el objeto de evaluar cambios en la redacción. Gracias.
              </p> 
            </>
          ) : (
            <h1 className="text-xl font-semibold text-gray-900">Acta-2025-05-08</h1>
          )}
               <PdfIframeViewer file="https://sge-dev.frba.utn.edu.ar/Acta-2025-05-08.pdf" />
        </div>

        {/* Votación + Comentario*/}
        <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
          <h2 className="text-base font-medium text-gray-900 mb-4">Votar sobre el acta</h2>
          <div className="flex gap-3 flex-wrap mb-6">
            {['ACUERDO', 'DESACUERDO', 'PARCIAL'].map((op) => (
              <div key={op} className="flex items-center gap-1">
                <label htmlFor={op}>
                  {op === 'ACUERDO'
                    ? 'Acuerdo'
                    : op === 'DESACUERDO'
                    ? 'Desacuerdo'
                    : 'Acuerdo parcial'}
                </label>
                <input type="radio" id={op} name="votacion" value={op} />
              </div>
            ))}
          </div>

          <h2 className="text-base font-medium text-gray-900 mb-2">Dejar un comentario</h2>
          <textarea
            className="w-full border border-gray-300 text-sm rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Escribí tu comentario aquí..."
          />
          <Button color="primary">
            Enviar voto
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
