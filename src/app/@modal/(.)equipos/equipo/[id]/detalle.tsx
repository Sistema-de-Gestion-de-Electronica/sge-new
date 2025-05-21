"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { EquipoForm } from "@/app/equipos/equipo/[id]/equipo-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ScrollArea } from "@/components/ui";
import { api } from "@/trpc/react";

export default function DetalleEquipo({ id }: { id: string }) {
  const [open, setOpen] = useState(true);

  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.equipos.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

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
      titulo={"Editar equipo"}
      description={"Esta es la página de edición del equipo."}
      open={open}
      onOpenChange={handleOpenChange}
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="mt-4 max-h-[calc(100vh_-_300px)] w-full pr-4">
          <EquipoForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
