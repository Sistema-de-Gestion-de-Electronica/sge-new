"use client";

import { useRouter } from "next/navigation";
import { LibroView } from "./libro-view";

export default function DetalleLibro({ id }: { id: string }) {
  const router = useRouter();

  const handleClickCancel = () => router.back();

  return <LibroView id={id} onCancel={handleClickCancel} />;
}
