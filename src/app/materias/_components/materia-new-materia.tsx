"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { MateriaForm } from "../[id]/materia-form";
import { useState } from "react";
import { api } from "@/trpc/react";

export const NuevaMateria = () => {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.materia.getAll.invalidate().catch((err) => {
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
      titulo={"Nueva Materia"}
      description={"Crea una nueva materia"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"}>
          Nueva materia
          <Plus size={16} className="ml-2" />
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col gap-4">
        <MateriaForm onCancel={handleCancel} onSubmit={handleSave} />
      </div>
    </ModalDrawer>
  );
};

export default NuevaMateria;
