"use client";

import { type SgeNombre } from "@/generated/prisma";
import { usePermisos } from "./use-context-tiene-permisos";
import { useEffect, useState, useRef } from "react";

export const useTienePermisos = (permisos: SgeNombre[] = []) => {
  const { permisos: tienePermisosResponse, isLoading, isError } = usePermisos();

  // Usar una referencia para almacenar permisos previamente calculados
  const permisosRef = useRef<SgeNombre[]>([]);

  const [puedeVer, setPuedeVer] = useState({
    tienePermisos: false,
    isLoading: false,
    isError: true,
  });

  useEffect(() => {
    if (isError) {
      setPuedeVer({
        tienePermisos: false,
        isLoading: false,
        isError: true,
      });
      return;
    }

    if (isLoading) {
      setPuedeVer((prevState) => ({
        ...prevState,
        isLoading: true,
        isError: false,
      }));
      return;
    }

    // Evita cálculos repetidos si los permisos no han cambiado
    if (
      permisosRef.current === permisos ||
      permisos.every((permiso, index) => permisosRef.current[index] === permiso)
    ) {
      return;
    }

    permisosRef.current = permisos; // Actualiza los permisos si cambian

    const tieneAlguno = permisos.length === 0 || permisos.some((permiso) => !!tienePermisosResponse?.[permiso]);

    setPuedeVer({
      tienePermisos: tieneAlguno,
      isLoading: false,
      isError: false,
    });
  }, [isLoading, isError, permisos, tienePermisosResponse]);

  return puedeVer;
};
