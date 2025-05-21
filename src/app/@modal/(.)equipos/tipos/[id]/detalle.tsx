"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { TipoForm } from "@/app/equipos/tipos/[id]/tipo-form";
import { ScrollArea } from "@/components/ui";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleTipo({ id }: { id: string }) {
  const [open, setOpen] = useState(true);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.equipos.getAllTipos.invalidate().catch((err) => {
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

  const handleClickSave = () => {
    refreshGetAll();
    router.back();
  };

  const handleClickCancel = () => handleOpenChange(false);

  return (
    <ModalDrawer
      titulo={"Detalle"}
      description={"Esta es la página de detalles del tipo."}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full pr-4">
          <TipoForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
