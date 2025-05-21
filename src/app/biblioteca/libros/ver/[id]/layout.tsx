import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
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
    <>
      <h3 className="text-5xl font-extrabold tracking-tight sm:text-[3rem]">Ficha - Libro</h3>
      <div className="flex flex-col items-center justify-center gap-6 px-4">{children}</div>
    </>
  );
}
