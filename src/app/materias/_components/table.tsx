"use client";

import { Button, DataTable } from "@/components/ui";
import { api, type RouterOutputs } from "@/trpc/react";
import { getColumns } from "./columns";
import RemoveMateriaModal from "./remove-materia";
import EditMateriaModal from "./edit-materia";
import React, { useState } from "react";
import type { GroupingState } from "@tanstack/react-table";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";
import { useRouter, useSearchParams } from "next/navigation";
import { MATERIA_ROUTE } from "@/shared/server-routes";
import ButtonMateriaDetalle from "./button-materia-detalle"; 


type MateriaData = RouterOutputs["materia"]["getAll"];

type MateriasTableProps = {
  data: MateriaData;
};

export const MateriasTable = ({ data }: MateriasTableProps) => {
  const columns = getColumns();
  const [grouping, setGrouping] = useState<GroupingState>(["anio"]);
  const router = useRouter();
  const sp = useSearchParams();

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.materia.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const onDeleteMateria = () => {
    refreshGetAll();
  };

  function goToDetail(id: number) {
    const next = new URLSearchParams(sp.toString());
    next.set("materiaId", String(id));
    router.push(`${MATERIA_ROUTE.href}?${next.toString()}`);
  }

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
                <ButtonMateriaDetalle id={original.id} />
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
