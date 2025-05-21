"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { LibroView } from "@/app/biblioteca/libros/ver/[id]/libro-view";
import { ScrollArea } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleLibro({ id }: { id: string }) {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
      router.back();
    }
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
      <div className="flex max-h-max w-full flex-col gap-4">
        <ScrollArea className="flex max-h-[calc(100vh_-_300px)] w-full flex-col pr-4">
          <LibroView id={id} onCancel={handleClickCancel} />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
