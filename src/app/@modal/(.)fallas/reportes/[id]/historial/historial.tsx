"use client";

import { api } from "@/trpc/react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import HistorialFalla from "@/app/fallas/reportes/[id]/historial/historial";
import { ScrollArea } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HistorialFallas({ id }: { id: string }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const { data: fallaData } = api.fallas.getFallaPorId.useQuery({
    id: Number(id),
  });
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
      router.back();
    }
  };

  return (
    <ModalDrawer
      titulo="Historial de Falla"
      description={`Historial de fallas - ${fallaData?.nroEquipo} ${fallaData?.marca} ${fallaData?.modelo} - ${fallaData?.estado}`}
      open={open}
      onOpenChange={handleOpenChange}
      className="min-w-fit"
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full">
          <HistorialFalla
            fallaId={Number(id)}
          />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
