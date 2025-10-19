import LoadingTable from "@/components/ui/table/loading-table";
import LoadingPagination from "@/components/ui/table/loading-pagination";
import { getColumnasFallasNames } from "@/app/fallas/(listado)/columns-fallas"; 

export default function LoadingFallasTable() {
  const columns = getColumnasFallasNames();

  return (
    <>
      <LoadingTable columns={columns} rowsLength={10} />

      <LoadingPagination />
    </>
  );
}
