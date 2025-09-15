"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { type SgeNombre } from "@/generated/prisma";
import { type Session } from "next-auth";

interface PermisosContextProps {
  permisos: Record<SgeNombre, boolean>;
  isLoading: boolean;
  isError: boolean;
  session: Session | null;
}

const PermisosContext = createContext<PermisosContextProps>({
  permisos: {} as Record<SgeNombre, boolean>,
  isLoading: true,
  isError: false,
  session: null,
});

export const PermisosProvider: React.FC<{ children: React.ReactNode; session?: Session | null }> = ({
  children,
  session,
}) => {
  const existenPermisosLocal = existenPermisosDeSessionStorage();
  const [permisos, setPermisos] = useState<Record<string, boolean>>(obtenerPermisosDeSessionStorage);

  const { data, isLoading, isError } = api.permisos.getPermisosUsuario.useQuery(undefined, {
    enabled: session !== null && !existenPermisosLocal,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!session) {
      borrarPermisosDeSessionStorage();
    }
  }, [session]);

  useEffect(() => {
    if (!data) return;

    const nuevosPermisos = data.reduce(
      (acc, sgeNombre) => {
        acc[sgeNombre] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    guardarPermisosEnSessionStorage(nuevosPermisos);
    setPermisos(nuevosPermisos);
  }, [data]);

  return <PermisosContext.Provider value={{ permisos, isLoading, isError, session: session ?? null }}>{children}</PermisosContext.Provider>;
};

export const usePermisos = () => useContext(PermisosContext);

const KEY_PERMISOS = "SGE_PERMISOS";
const guardarPermisosEnSessionStorage = (permisos: Record<SgeNombre, boolean>) => {
  const permisosStorage = JSON.stringify(permisos);

  sessionStorage.setItem(KEY_PERMISOS, permisosStorage);
};

const obtenerPermisosDeSessionStorage = (): Record<SgeNombre, boolean> => {
  let permisosStorage;
  if (typeof window !== "undefined") {
    permisosStorage = window.sessionStorage.getItem(KEY_PERMISOS);
  }

  if (!permisosStorage) return {} as Record<SgeNombre, boolean>;

  return JSON.parse(permisosStorage);
};

const existenPermisosDeSessionStorage = (): boolean => {
  let permisosStorage;
  if (typeof window !== "undefined") {
    permisosStorage = window.sessionStorage.getItem(KEY_PERMISOS);
  }

  return !!permisosStorage;
};

const borrarPermisosDeSessionStorage = () => {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(KEY_PERMISOS);
  }
};
