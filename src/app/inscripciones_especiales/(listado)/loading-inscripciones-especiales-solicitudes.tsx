import LoadingTable from "@/components/ui/table/loading-table";
import LoadingPagination from "@/components/ui/table/loading-pagination";
import { getColumnasInscripcionesEspecialesNames } from "@/app/inscripciones_especiales/(listado)/columns-inscripciones-especiales"; 

export default function LoadingInscripcionesEspecialesTable() {
  const columns = getColumnasInscripcionesEspecialesNames();

  return (
    <>
      <LoadingTable columns={columns} rowsLength={10} />

      <LoadingPagination />
    </>
  );
}
