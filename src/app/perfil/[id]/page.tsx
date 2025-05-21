import ContenedorUsuario from "@/app/perfil/_components/contenedor-usuario";
import { api } from "@/trpc/server";

type PageProps = {
  params: Promise<{ id?: string }>;
};

export default async function PerfilHome({ params }: PageProps) {
  const { id } = await params;

  if (id === undefined) {
    return <div>Usuario no encontrado</div>;
  }

  const usuario = await api.admin.usuarios.getUsuarioPorId({ id });

  if (!usuario) {
    return <div>Usuario no encontrado</div>;
  }

  return <ContenedorUsuario usuarioData={usuario} />;
}
