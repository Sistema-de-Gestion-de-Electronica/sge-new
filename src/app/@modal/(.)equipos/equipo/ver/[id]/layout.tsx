"use server";

import { redirect } from "next/navigation";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { SgeNombre } from "@/generated/prisma";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.EQUIPOS_VER_LISTADO]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return <main className="flex flex-col">{children}</main>;
}
