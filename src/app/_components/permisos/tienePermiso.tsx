"use client";

import React, { useEffect, useState } from "react";
import { useTienePermisos } from "@/app/_hooks/use-tiene-permisos";
import { type SgeNombre } from "@/generated/prisma";

type TienePermisoProps = {
  permisos: SgeNombre[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export const TienePermiso = ({ permisos, fallback = null, children }: TienePermisoProps) => {
  const { tienePermisos, isLoading, isError } = useTienePermisos(permisos);

  const [puedeVer, setPuedeVer] = useState(false);

  useEffect(() => {
    if (permisos.length === 0) {
      setPuedeVer(true);
      return;
    }

    if (isLoading || isError) {
      setPuedeVer(false);
      return;
    }

    setPuedeVer(tienePermisos);
  }, [isLoading, isError, tienePermisos, permisos.length]);

  return puedeVer ? <>{children}</> : <>{fallback}</>;
};
