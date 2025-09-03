'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { SelectActasForm } from './SelectActasForm'
import { SelectAniosForm } from './SelectAniosForm'
import PdfIframeViewer from './PdfIframeViewer'
import  VotacionActa from './VotacionActa'
import { api } from "@/trpc/react"
import { useState } from 'react'
import { Acta } from './TypeActa'
import GraciasPorVotar from './thankYouDiv'

export function ClientVotacionActa() {
  const methods = useForm();
  const { data: esConsejero, isLoading, isError } = api.actas.tieneRolConsejero.useQuery();
  const [acta, setActa] = useState<Acta | undefined>(undefined);
  const { data: yaVoto } = api.actas.yaVoto.useQuery();
  const {data: reunion} = api.reunion.getUltimaReunion.useQuery();

  const handleState = (acta: Acta) => {
    console.log('Información del acta seleccionada:', acta);
    setActa(acta);
  }

  const pdfUrl =
    (acta as any)?.pdfUrl ??
    (acta?.label ? `https://sge-dev.frba.utn.edu.ar/actas/${acta.label}.pdf` : 'https://sge-dev.frba.utn.edu.ar/Acta-2025-05-08.pdf')

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
              <SelectActasForm name="acta" control={methods.control} onStateChange={handleState} />
            </div>
          </div>
          {isLoading ? (
            <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
          ) : esConsejero ? (
            <div className="flex flex-col items-center">
              <p>Próxima reunión: {reunion.fechaNormalizada}</p>
              <a href={reunion?.link} target="_blank" className="text-blue-600">Conectarse a la reunión</a>
            </div>
          ) : (
          <div className="flex flex-col items-center"></div>
          )}
        </div>
                
        {/* Header acta */}
        <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
          { acta?.estado === "ABIERTA" ? (
            <>
              <h1 className="text-gray-900 text-center text-2xl font-bold tracking-tight">
                Acta del Consejo Departamental a evaluar
              </h1>
              <br/>
              <p className="text-center antialiased sm:text-md lg:px-28">
                Consejeros/as: El acta que se muestra a continuación contiene el resumen de lo tratado en la última reunión con fecha {acta?.label}.
                Por favor exprese al pie su conformidad o disconformidad con la misma a los efectos de considerar su aprobación en la próxima reunión.
                En caso de disconformidad o conformidad parcial, les pedimos que nos hagan saber en los comentarios las razones de esa opinión, con el objeto de evaluar cambios en la redacción. Gracias.
              </p> 
            </>
          ) : (
            <h1 className="text-xl font-semibold text-gray-900">Acta-{acta?.label}</h1>
          )}
          <br/>
          <PdfIframeViewer file={pdfUrl} />
          
        </div>
        {esConsejero && acta?.estado === "ABIERTA"? (
          !yaVoto
            ? <VotacionActa />
            : <GraciasPorVotar />
        ) : <></>}
      </form>
    </FormProvider>
  )
}

