'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { SelectActasForm } from './SelectActasForm'
import { SelectAniosForm } from './SelectAniosForm'
import PdfIframeViewer from './PdfIframeViewer'
import  VotacionActa from './VotacionActa'

export function ClientVotacionActa() {
  const methods = useForm({ defaultValues: { anio: '2025', acta: 'Acta 01 - Reunión Enero' } })

  return (
    <FormProvider {...methods}>
      <form className="space-y-6">
        {/* Filtros Año y Acta */}
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="w-[200px]">
              <SelectAniosForm name="anio" control={methods.control} />
            </div>
            <div className="w-[300px]">
              <SelectActasForm name="acta" control={methods.control} />
            </div>
          </div>
          <div className="flex flex-col items-center">
            {/* <p>Proxima reunión: {proximaFecha.fecha}</p> */}
            <p>Próxima reunión: 2025-09-01</p>
            <a href="https://zoom.com" target="_blank" className="text-blue-600">Conectarse a la reunión</a>
          </div>
        </div>
                
        {/* Header acta */}
        <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
          {/* acta.estado === abierta ? ( */}
          {true ? (
            <>
              <h1 className="text-gray-900 text-center text-2xl font-bold tracking-tight">
                Acta del Consejo Departamental a evaluar
              </h1>
              <br/>
              <p className="text-center antialiased sm:text-md lg:px-28">
                Consejeros/as: El acta que se muestra a continuación contiene el resumen de lo tratado en la última reunión con fecha 2025-05-08.
                Por favor exprese al pie su conformidad o disconformidad con la misma a los efectos de considerar su aprobación en la próxima reunión.
                En caso de disconformidad o conformidad parcial, les pedimos que nos hagan saber en los comentarios las razones de esa opinión, con el objeto de evaluar cambios en la redacción. Gracias.
              </p> 
            </>
          ) : (
            <h1 className="text-xl font-semibold text-gray-900">Acta-2025-05-08</h1>
          )}
          <br/>
          <PdfIframeViewer file="https://sge-dev.frba.utn.edu.ar/Acta-2025-05-08.pdf" />
          
        </div>
          {/* {acta.estado === "abierta" && <VotacionActa />} */}
          {true && <VotacionActa />}
      </form>
    </FormProvider>
  )
}
