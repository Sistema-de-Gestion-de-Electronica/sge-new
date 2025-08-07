

import PageLayout from '@/components/ui/template/page-template'
import { CONSEJEROS_ROUTE } from '@/shared/server-routes'
import { Suspense } from 'react'

export default function Page() {
  return (
    <PageLayout route={CONSEJEROS_ROUTE}>
      <Suspense fallback={<p className="p-4">Cargando acta...</p>}>
        <div className="space-y-6">
          {/* Header acta */}
          <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
            <h1 className="text-xl font-semibold text-gray-900">Acta 1</h1>
            <p className="text-sm text-gray-600">
              Acta emitida bla bla bla sobre temas importantes tratados en la reunión...
            </p>
          </div>

          {/* Filtros Año y Acta */}
          <div className="flex flex-wrap gap-4 items-end">
            {/* Año */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 font-medium mb-1">Año</label>
              <select
                className="h-10 px-3 border border-gray-300 bg-white text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="2025"
              >
                <option>2025</option>
                <option>2024</option>
              </select>
            </div>

            {/* Acta */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 font-medium mb-1">Acta</label>
              <select
                className="h-10 px-3 border border-gray-300 bg-white text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="acta-2025-01"
              >
                <option>Seleccionar acta</option>
                <option>Acta título</option>
              </select>
            </div>
          </div>

          {/* Votación */}
          <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
            <h2 className="text-base font-medium text-gray-900 mb-4">Votar sobre el acta</h2>
            <div className="flex gap-3 flex-wrap">
              {['ACUERDO', 'DESACUERDO', 'PARCIAL'].map((op) => (
                <button
                  key={op}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-orange-300 bg-orange-100 text-orange-800 hover:bg-orange-200 transition"
                >
                  {op === 'ACUERDO'
                    ? 'De acuerdo'
                    : op === 'DESACUERDO'
                    ? 'En desacuerdo'
                    : 'Acuerdo parcial'}
                </button>
              ))}
            </div>
          </div>

          {/* Comentario */}
          <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
            <h2 className="text-base font-medium text-gray-900 mb-4">Dejar un comentario</h2>
            <textarea
              className="w-full border border-gray-300 text-sm rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Escribí tu comentario aquí..."
            />
            <button
              className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Enviar voto
            </button>
          </div>
        </div>
      </Suspense>
    </PageLayout>
  )
}