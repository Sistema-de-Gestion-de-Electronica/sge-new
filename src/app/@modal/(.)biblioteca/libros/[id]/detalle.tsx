"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { LibroForm } from "@/app/biblioteca/libros/[id]/libro-form";
import { ScrollArea } from "@/components/ui";
import { api } from "@/trpc/react";
// import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleLibro({ id }: { id: string }) {
  const [open, setOpen] = useState(true);

  // const utils = api.useUtils();

  const router = useRouter();
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.biblioteca.getAll.invalidate().catch((err) => {
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
      description={"Esta es la página de detalles del libro."}
      open={open}
      onOpenChange={handleOpenChange}
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full pr-4">
          <LibroForm id={id} onCancel={handleClickCancel} onSubmit={handleClickSave} />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
