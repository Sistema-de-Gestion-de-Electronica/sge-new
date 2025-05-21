import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.LAB_ABIERTO_CONFIRMAR_RESERVAS]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return <div className="flex w-full flex-col">{children}</div>;
}
