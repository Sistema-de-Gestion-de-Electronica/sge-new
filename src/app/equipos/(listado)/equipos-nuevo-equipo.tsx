"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { api } from "@/trpc/react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { EquipoForm } from "../equipo/[id]/equipo-form";
import { useState } from "react";
import { ScrollArea } from "@/components/ui";

export const EquiposNuevoEquipoModal = () => {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.equipos.getAll.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const handleSave = () => {
    refreshGetAll();
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      titulo={"Nuevo equipo"}
      description={"Creá un nuevo equipo"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"}>
          Nuevo equipo
          <Plus size={16} className="ml-2" />
        </Button>
      }
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="mt-4 max-h-[calc(100vh_-_300px)] w-full pr-4">
          <EquipoForm onCancel={handleCancel} onSubmit={handleSave} />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
};
