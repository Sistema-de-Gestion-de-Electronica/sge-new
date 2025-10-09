import DetalleReporte from "@/app/fallas/reportes/[id]/detalle";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <DetalleReporte id={id} />;
}
