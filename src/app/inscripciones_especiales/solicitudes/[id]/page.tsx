import DetalleSolicitud from "@/app/inscripciones_especiales/solicitudes/[id]/detalle";
import { estaLogueadoYConPermiso, tienePermisoBack } from "@/server/permisos";
import { SgeNombre } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { INICIO_ROUTE } from "@/shared/server-routes";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const puedeVer = await estaLogueadoYConPermiso([
    SgeNombre.INSCRIPCIONES_ESPECIALES_VER_LISTADO,
    SgeNombre.INSCRIPCIONES_ESPECIALES_ADMIN,
  ]);
  if (!puedeVer) {
    if (await estaLogueadoYConPermiso([SgeNombre.INSCRIPCIONES_ESPECIALES_SOLICITAR])) {
      redirect("/inscripciones_especiales/solicitar");
    }
    redirect(INICIO_ROUTE.href);
  }

  const { id } = await params;
  return <DetalleSolicitud id={id} />;
}
