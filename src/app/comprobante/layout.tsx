import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const puedeVer = await estaLogueadoYConPermiso([SgeNombre.BIBLIOTECA_VER_LISTADO, SgeNombre.EQUIPOS_VER_LISTADO]);
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }
  return (
    <main className="flex flex-col">
      <div className="flex flex-col items-center justify-center gap-12 px-4 ">{children}</div>
    </main>
  );
}
