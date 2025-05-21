"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { LibroForm } from "../libros/[id]/libro-form";
import { useState } from "react";
import { SgeNombre } from "@/generated/prisma";
import { useTienePermisos } from "@/app/_hooks/use-tiene-permisos";
import { api } from "@/trpc/react";
import { ScrollArea } from "@/components/ui";

export const BibliotecaNewLibro = () => {
  const tienePermiso = useTienePermisos([SgeNombre.BIBLIOTECA_ABM_LIBRO]);

  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.biblioteca.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  if (!tienePermiso) return null;

  const handleSave = () => {
    refreshGetAll();
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      titulo={"Nuevo libro"}
      description={"Creá un nuevo libro"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"}>
          Nuevo libro
          <Plus size={16} className="ml-2" />
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="flex max-h-[calc(100vh_-_300px)] w-full flex-col pr-4">
          <LibroForm onCancel={handleCancel} onSubmit={handleSave} />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
};
