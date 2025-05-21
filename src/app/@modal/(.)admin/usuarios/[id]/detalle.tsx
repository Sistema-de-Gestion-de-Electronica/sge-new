"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { AdminUsuarioForm } from "@/app/admin/usuarios/[id]/admin-usuario-form";
import { ScrollArea } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/trpc/react";

export default function DetalleUsuario({ id }: { id: string }) {
  const [open, setOpen] = useState(true);

  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.admin.usuarios.getAll.invalidate().catch((err) => {
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
      titulo={"Detalle"}
      description={"Esta es la página de detalles del usuario."}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="mt-4 max-h-[calc(100vh_-_300px)] w-full pr-4">
          <AdminUsuarioForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
