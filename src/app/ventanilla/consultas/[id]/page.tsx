import DetalleConsulta from "@/app/ventanilla/consultas/[id]/detalle";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <DetalleConsulta id={id} />;
}
