import React from "react";
import { NuevaMateria } from "./materia-new-materia";
import { TienePermiso } from "@/app/_components/permisos/tienePermiso";
import { SgeNombre } from "@/generated/prisma";

export const ActionButtons = () => {
  return (
    <div className="relative flex w-full items-center justify-between space-y-3 md:flex-row md:justify-end md:space-x-3 md:space-y-0">
      <div className="flex space-x-2">
        <TienePermiso permisos={[SgeNombre.MATERIAS_ABM]}>
          <NuevaMateria />
        </TienePermiso>
      </div>
    </div>
  );
};
