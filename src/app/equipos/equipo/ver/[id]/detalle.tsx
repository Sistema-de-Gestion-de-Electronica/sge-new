"use client";

import { useRouter } from "next/navigation";
import { EquipoView } from "./equipo-view";

export default function DetalleEquipo({ id }: { id: string }) {
  const router = useRouter();

  const handleClickCancel = () => router.back();

  return <EquipoView id={id} onCancel={handleClickCancel} />;
}
