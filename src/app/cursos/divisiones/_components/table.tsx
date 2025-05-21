"use client";

import { DataTable } from "@/components/ui";
import { type RouterOutputs } from "@/trpc/react";
import { getColumns } from "./columns";
import React from "react";

type DivisionData = RouterOutputs["division"]["getFiltered"];

type DivisionesTableProps = {
  data: DivisionData;
};

export const DivisionesTable = ({ data }: DivisionesTableProps) => {
  const columns = getColumns();

  return <DataTable data={data ?? []} columns={columns} />;
};

export default DivisionesTable; // Exporta el componente
