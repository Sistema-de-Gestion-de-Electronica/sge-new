import LoadingTable from "@/components/ui/table/loading-table";
import LoadingPagination from "@/components/ui/table/loading-pagination";
import { getColumnasConsultasNames } from "@/app/ventanilla/(listado)/columns-consultas"; 

export default function LoadingConsultasTable() {
  const columns = getColumnasConsultasNames();

  return (
    <>
      <LoadingTable columns={columns} rowsLength={10} />

      <LoadingPagination />
    </>
  );
}
