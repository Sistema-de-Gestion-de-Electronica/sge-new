"use server";

import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.RES_LAB_RESERVAR_CURSO_AUTO]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return <main className="flex w-full flex-col">{children}</main>;
}
