"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui";
import { ValorVoto, VotoActa } from "./TypeVotoActa";
import { getColumns } from "./Columnas";
import { SortingState } from "@tanstack/react-table";

export function ActaVotosTable({ data }: { data: VotoActa[] }) {
  const columns = useMemo(() => getColumns(), []);
  const [sorting, setSorting] = useState<SortingState>([{ id: "fecha", desc: true }]);

  return (
    <DataTable
      data={data}
      columns={columns}
      manualSorting
      config={{
        sorting,
        onSortingChange: (updaterOrValue) =>
          setSorting((prev) => (typeof updaterOrValue === "function" ? updaterOrValue(prev) : updaterOrValue)),
      }}
    />
  );
}
