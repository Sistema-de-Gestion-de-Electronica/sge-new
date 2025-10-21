import DetalleReporte from "@/app/fallas/reportes/[id]/detalle";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { INICIO_ROUTE } from "@/shared/server-routes";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const puedeVer =
    (await estaLogueadoYConPermiso([SgeNombre.REP_FALLAS_BUSCAR_REP_FALLAS])) ||
    (await estaLogueadoYConPermiso([SgeNombre.REP_FALLAS_ADMIN_REP_FALLAS]));
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }
  const { id } = await params;
  return <DetalleReporte id={id} />;
}
