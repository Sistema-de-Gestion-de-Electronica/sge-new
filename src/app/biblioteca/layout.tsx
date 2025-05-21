"use server";

import { redirect } from "next/navigation";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { SgeNombre } from "@/generated/prisma";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([
    SgeNombre.BIBLIOTECA_VER_LISTADO,
    SgeNombre.BIBLIOTECA_VER_DETALLES_LIBRO,
    SgeNombre.BIBLIOTECA_BUSCAR_LIBRO,
    SgeNombre.BIBLIOTECA_ABM_LIBRO,
    SgeNombre.BIBLIOTECA_PRESTAMO_PRESTAR,
    SgeNombre.BIBLIOTECA_PRESTAMO_VER_PRESTAMOS,
    SgeNombre.BIBLIOTECA_EDITORIALES_ABM,
    SgeNombre.BIBLIOTECA_PRESTAMO_VER_MIS_PRESTAMOS,
  ]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return <main className="flex flex-col">{children}</main>;
}
