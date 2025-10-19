import DetalleSolicitud from "./detalle";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <DetalleSolicitud id={id} />;
}
