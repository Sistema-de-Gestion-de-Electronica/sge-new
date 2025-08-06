
import PageLayout from '@/components/ui/template/page-template'
import { CONSEJEROS_ROUTE } from '@/shared/server-routes'

export default function Page() {
  

  return (
    <PageLayout route={CONSEJEROS_ROUTE}>
      <div className="space-y-6 p-6">
        {/* Minuta */}
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">Acta 1</h1>
          <p className="text-gray-700">Acta emitida bla bl bla</p>
        </div>
        
        <div className="flex flex-wrap gap-4 bg-white p-4 rounded shadow mb-6">
          {/* Dropdown Año */}
          <div>
            <label className="block text-sm font-medium mb-1">Año</label>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value="2025"
            >
              <option>
                  2025
              </option>
            </select>
          </div>

          {/* Dropdown Acta */}
          <div>
            <label className="block text-sm font-medium mb-1">Acta</label>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              value="Acta bla bla bla"
            >
              <option value="">Seleccionar acta</option>
                <option>
                  Acta titulo
                </option>
            </select>
          </div>
        </div>

        {/* Votación */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Votar sobre el acta</h2>
          <div className="flex flex-wrap gap-4">
            {['ACUERDO', 'DESACUERDO', 'PARCIAL'].map((op) => (
              <button
                key={op}
              >
                {op === 'ACUERDO'
                  ? 'Agree'
                  : op === 'DESACUERDO'
                  ? 'Disagree'
                  : 'Partially Agree'}
              </button>
            ))}
          </div>
        </div>

        {/* Comentario */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Dejar un comentario</h2>
          <textarea
            className="w-full border rounded p-3"
            rows={4}
            placeholder="Type your comment here..."
          />
          <button
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
          >
            Submit
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
