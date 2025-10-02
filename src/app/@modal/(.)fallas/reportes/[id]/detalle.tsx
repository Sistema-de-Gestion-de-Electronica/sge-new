"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { FallasViewAdmin } from "@/app/fallas/reportes/[id]/form-gestion-fallas";
import { ScrollArea } from "@/components/ui";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleReporte({ id }: { id: string }) {
  const [open, setOpen] = useState(true);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.fallas.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
      router.back();
    }
  };

  const handleClickCancel = () => {
    handleOpenChange(false);
  };

  const handleClickEstados = () => {
    refreshGetAll();
    router.back();
  };

  return (
    <ModalDrawer
      titulo="Detalle de Falla"
      description="Detalles del reporte de fallas."
      open={open}
      onOpenChange={handleOpenChange}
      className="min-w-fit"
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full">
          <FallasViewAdmin
            fallaId={Number(id)}
            onCancel={handleClickCancel}
            onEstados={handleClickEstados}
          />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
