// page.tsx
import PageLayout from '@/components/ui/template/page-template'
import { CONSEJEROS_ROUTE } from '@/shared/server-routes'
import { Suspense } from 'react'
import { ClientVotacionActa } from './_components/ClientVotacionActa'

export default function Page() {
  return (
    <PageLayout route={CONSEJEROS_ROUTE}>
      <Suspense fallback={<p className="p-4">Cargando acta...</p>}>
        <ClientVotacionActa />
      </Suspense>
    </PageLayout>
  )
}
