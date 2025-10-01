import PageLayout from "@/components/ui/template/page-template";
import MateriasViewSwitch from "./_components/materia-view-switch";
import { MATERIA_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { TienePermiso } from "../_components/permisos/tienePermiso";
import NuevaMateria from "./_components/materia-new-materia";

export default function Page() {
  return (
    <PageLayout
      route={MATERIA_ROUTE}
      buttons={
        <TienePermiso permisos={[SgeNombre.MATERIAS_ABM]}>
          <NuevaMateria />
        </TienePermiso>
      }
    >
      <MateriasViewSwitch />
    </PageLayout>
  );
}

// import { type ReadonlyURLSearchParams } from "next/navigation";
// import { Suspense } from "react";
// import MateriasTableContainer from "./_components/materias-table-container";
// import LoadingMateriasTable from "./_components/loading-materia-table";
// import { inputGetMaterias } from "@/shared/filters/materia-filter.schema";
// import React from "react";
// import PageLayout from "@/components/ui/template/page-template";
// import { MATERIA_ROUTE } from "@/shared/server-routes";
// import NuevaMateria from "./_components/materia-new-materia";
// import { TienePermiso } from "../_components/permisos/tienePermiso";
// import { SgeNombre } from "@/generated/prisma";
// import { MateriaDetalle } from "./_components/materia-detalle";
// import { useSearchParams } from 'next/navigation';


// type PageProps = {
//   searchParams: Promise<ReadonlyURLSearchParams>;
// };

// export default async function Page({ searchParams }: PageProps) {
//   const [searchParams] = useSearchParams();
//   const filters = inputGetMaterias.parse(await searchParams);
//   const filter_as_key = JSON.stringify(filters);
//   const miValorParametro = searchParams.get('materiaId') ?? undefined;



//   return (
//     <PageLayout
//       route={MATERIA_ROUTE}
//       buttons={
//         <TienePermiso permisos={[SgeNombre.MATERIAS_ABM]}>
//           <NuevaMateria />
//         </TienePermiso>
//       }
//     >
//       {materiaId ? (
//         <Suspense key={filter_as_key} fallback={<LoadingMateriasTable />}>
//           <MateriaDetalle materiaId={materiaId} />
//         </Suspense>
//       ) : (
//         <Suspense key={filter_as_key} fallback={<LoadingMateriasTable />}>
//           <MateriasTableContainer />
//         </Suspense>
//       )}
//     </PageLayout>
//   );
// }