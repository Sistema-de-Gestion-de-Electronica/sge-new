"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { useState } from "react";
import FileUpload from "../curso/[id]/bulk-insert-form";
import { api } from "@/trpc/react";

export const CargarCursos = () => {
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
      titulo={"Cargar cursos"}
      description={"Subí un archivo CSV para cargar cursos"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"} className="w-10 p-0">
          <Upload size={16} />
        </Button>
      }
    >
      <FileUpload onSubmit={handleSave} onCancel={handleCancel} />
    </ModalDrawer>
  );
};
