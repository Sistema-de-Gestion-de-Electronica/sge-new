"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { AdminLaboratorioForm } from "@/app/admin/laboratorios/[id]/admin-laboratorio-form";
import { api } from "@/trpc/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleLaboratorio({ id }: { id: string }) {
  const [open, setOpen] = useState(true);
  const utils = api.useUtils();
  const router = useRouter();

  const refreshGetAll = () => {
    utils.admin.laboratorios.getAll.invalidate().catch((err) => {
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
      description={"Esta es la página de detalles del laboratorio."}
      open={open}
      onOpenChange={handleOpenChange}
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <AdminLaboratorioForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />
      </div>
    </ModalDrawer>
  );
}
