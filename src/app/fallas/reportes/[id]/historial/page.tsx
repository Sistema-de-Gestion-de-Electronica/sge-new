import HistorialFalla from "@/app/fallas/reportes/[id]/historial/historial";

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const { id } = params;
  return <HistorialFalla fallaId={Number(id)} />;
}
