"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { ConsultasViewAdmin } from "@/app/ventanilla/consultas/[id]/form-gestion-consultas";
import { ScrollArea } from "@/components/ui";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleConsulta({ id }: { id: string }) {
  const [open, setOpen] = useState(true);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.ventanilla.getAllConsultas.invalidate().catch((err) => {
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
    router.back();
    refreshGetAll();
  };

  const handleClickEstados = () => {
    refreshGetAll();
    router.back();
  };

  return (
    <ModalDrawer
      titulo="Detalle de Consulta"
      open={open}
      onOpenChange={handleOpenChange}
      className="min-w-fit"
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full">
          <ConsultasViewAdmin
            consultaId={Number(id)}
            onEstados={handleClickEstados}
            onCancel={handleClickCancel}
          />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
