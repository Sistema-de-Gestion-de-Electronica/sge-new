"use client";

import { useSearchParams } from "next/navigation";
import MateriasTableContainer from "./materias-table-container";
import {MateriaDetalle} from "./materia-detalle";

export default function MateriasViewSwitch() {
  const sp = useSearchParams();
  const materiaId = sp.get("materiaId") ?? undefined;
  console.log(materiaId)

  return materiaId ? (
    <MateriaDetalle id={materiaId}/>
  ) : (
    <MateriasTableContainer />
  );
}
