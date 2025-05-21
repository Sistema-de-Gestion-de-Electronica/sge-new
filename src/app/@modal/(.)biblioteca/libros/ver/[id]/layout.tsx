import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([
    SgeNombre.BIBLIOTECA_VER_DETALLES_LIBRO,
    SgeNombre.BIBLIOTECA_VER_LISTADO,
    SgeNombre.BIBLIOTECA_BUSCAR_LIBRO,
  ]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }
  return <div className="flex w-full flex-col">{children}</div>;
}
