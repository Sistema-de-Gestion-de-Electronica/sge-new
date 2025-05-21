import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const puedeVer = await estaLogueadoYConPermiso([
    SgeNombre.ADMIN_MODIFICAR_ATRIBUTOS_ADMIN,
    SgeNombre.ADMIN_MODIFICAR_ATRIBUTOS,
    SgeNombre.ADMIN_AGREGAR_USUARIOS_A_GRUPOS,
    SgeNombre.ADMIN_VER_FICHA_USUARIO,
    SgeNombre.ADMIN_VER_PANEL_ADMIN,
  ]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return <div className="flex w-full flex-col">{children}</div>;
}
