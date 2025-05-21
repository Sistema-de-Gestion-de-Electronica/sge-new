"use client";

import { DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { getColumns } from "./columns";
import RemoveMateriaModal from "./remove-materia";
import EditMateriaModal from "./edit-materia";
import React, { useState } from "react";
import type { GroupingState } from "@tanstack/react-table";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

type MateriaData = RouterOutputs["materia"]["getAll"];

type MateriasTableProps = {
  data: MateriaData;
};

export const MateriasTable = ({ data }: MateriasTableProps) => {
  const columns = getColumns();
  const [grouping, setGrouping] = useState<GroupingState>(["anio"]);

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.materia.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const onDeleteMateria = () => {
    refreshGetAll();
  };

  return (
    <>
      <DataTable
        data={data ?? []}
        columns={columns}
        action={{
          header: "Acciones",
          cell({ original }) {
            return (
              <>
                <TienePermiso permisos={[SgeNombre.MATERIAS_ABM]}>
                  <>
                    <RemoveMateriaModal materiaId={original.id} nombre={original.nombre} onSubmit={onDeleteMateria} />
                    <EditMateriaModal materiaId={original.id.toString()} />
                  </>
                </TienePermiso>
              </>
            );
          },
        }}
        grouping={grouping}
        setGrouping={setGrouping}
      />
    </>
  );
};

export default MateriasTable;
