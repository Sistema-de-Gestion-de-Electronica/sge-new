import HistorialFallas from "./historial";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <HistorialFallas id={id} />;
}
