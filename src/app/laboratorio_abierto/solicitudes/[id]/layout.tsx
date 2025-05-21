import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.LAB_ABIERTO_CONFIRMAR_RESERVAS]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return <div className="flex flex-col items-center justify-center gap-6 px-4">{children}</div>;
}
