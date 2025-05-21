"use server";

import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([
    SgeNombre.BIBLIOTECA_ABM_LIBRO,
    SgeNombre.BIBLIOTECA_VER_DETALLES_LIBRO,
    SgeNombre.BIBLIOTECA_VER_LISTADO,
    SgeNombre.BIBLIOTECA_BUSCAR_LIBRO,
  ]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }
  return (
    <main className="flex flex-col">
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">{children}</div>
    </main>
  );
}
