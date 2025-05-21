"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { useState } from "react";
import { TipoForm } from "../../[id]/tipo-form";
import { api } from "@/trpc/react";

export const EquiposTiposNuevoTipo = () => {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.equipos.getAllTipos.invalidate().catch((err) => {
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
      titulo={"Nuevo tipo"}
      description={"Creá un nuevo tipo"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"}>
          Nuevo tipo
          <Plus size={16} className="ml-2" />
        </Button>
      }
      className={"max-h-[calc(100vh_-_300px)]"}
    >
      <div className="flex max-h-max w-full flex-col gap-4">
        <TipoForm onCancel={handleCancel} onSubmit={handleSave} />
      </div>
    </ModalDrawer>
  );
};
