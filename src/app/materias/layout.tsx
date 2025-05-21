"use server";

import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.MATERIAS_VER_LISTADO]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return <main className="flex flex-col">{children}</main>;
}
