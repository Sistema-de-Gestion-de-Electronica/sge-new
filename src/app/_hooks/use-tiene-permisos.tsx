"use client";

import { type SgeNombre } from "@/generated/prisma";
import { usePermisos } from "./use-context-tiene-permisos";
import { useEffect, useState, useRef } from "react";

export const useTienePermisos = (permisos: SgeNombre[] = []) => {
  const { permisos: tienePermisosResponse, isLoading, isError } = usePermisos();

  const permisosRef = useRef<SgeNombre[]>([]);

  const [puedeVer, setPuedeVer] = useState({
    tienePermisos: false,
    isLoading: false,
    isError: true,
  });

  useEffect(() => {
    if (isError) {
      setPuedeVer((prev) => (prev.isError ? prev : { tienePermisos: false, isLoading: false, isError: true }));
      return;
    }

    if (isLoading) {
      setPuedeVer((prev) => (prev.isLoading && !prev.isError ? prev : { ...prev, isLoading: true, isError: false }));
      return;
    }

    if (tienePermisosResponse) {
      const tieneAlguno = permisos.length === 0 || permisos.some((permiso) => !!tienePermisosResponse[permiso]);

      setPuedeVer((prev) =>
        prev.tienePermisos === tieneAlguno && !prev.isLoading && !prev.isError
          ? prev
          : { tienePermisos: tieneAlguno, isLoading: false, isError: false },
      );
    }
  }, [isLoading, isError, permisos, tienePermisosResponse]);

  return puedeVer;
};
