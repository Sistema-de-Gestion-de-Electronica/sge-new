"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { CursoForm } from "../curso/[id]/curso-form";
import { useState } from "react";
import { api } from "@/trpc/react";
import { ScrollArea } from "@/components/ui";

export const CursosNuevoCurso = () => {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.cursos.getAll.invalidate().catch((err) => {
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
      titulo={"Nuevo curso"}
      description={"Creá un nuevo curso"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"}>
          Nuevo curso
          <Plus size={16} className="ml-2" />
        </Button>
      }
    >
      <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full pr-4">
        <CursoForm onCancel={handleCancel} onSubmit={handleSave} />
      </ScrollArea>
    </ModalDrawer>
  );
};
