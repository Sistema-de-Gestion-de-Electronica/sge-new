// app/materias/_components/button-materia-detalle.tsx
"use client";

import { Button } from "@/components/ui";           // o "@/components/ui/button" si lo usás así
import { Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { MATERIA_ROUTE } from "@/shared/server-routes";

type Props = {
  id: number;
  className?: string;
};

export default function ButtonMateriaDetalle({ id, className }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  function goToDetail() {
    const next = new URLSearchParams(sp.toString());
    next.set("materiaId", String(id));
    router.push(`${MATERIA_ROUTE.href}?${next.toString()}`);
  }

  return (
    <Button
      type="button"
      title="Detalles de materia"
      aria-label="Detalles de materia"
      onClick={() => { goToDetail(); }}
      variant="ghost"
      className={
        className ??
        "inline-flex items-center justify-center rounded-md text-sm leading-6 transition-colors font-medium outline-none ring-transparent disabled:pointer-events-none disabled:opacity-30 bg-transparent hover:bg-[#E4E3E3] focus-visible:text-secondary-foreground active:bg-slate-200 shadow-none active:shadow-[inset_0px_4px_4px_0px_#0000004D] border border-[#E4E3E3] p-2 h-8 w-8"
      }
    >
      <Eye className="size-4" />
    </Button>
  );
}
