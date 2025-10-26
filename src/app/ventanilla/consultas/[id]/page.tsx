import DetalleConsulta from "@/app/ventanilla/consultas/[id]/detalle";
import { SgeNombre } from "@/generated/prisma";
import { estaLogueadoYConPermiso } from "@/server/permisos";
import { INICIO_ROUTE } from "@/shared/server-routes";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const puedeVer =
    (await estaLogueadoYConPermiso([SgeNombre.VENTANILLA_VER_CONSULTAS])) ||
    (await estaLogueadoYConPermiso([SgeNombre.VENTANILLA_RESPONDER_CONSULTAS]));
  if (!puedeVer) {
    redirect(INICIO_ROUTE.href);
  }

  return <DetalleConsulta id={id} />;
}
