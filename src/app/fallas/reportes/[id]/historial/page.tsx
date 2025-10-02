import HistorialFalla from "@/app/fallas/reportes/[id]/historial/historial";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <HistorialFalla fallaId={id} />;
}
