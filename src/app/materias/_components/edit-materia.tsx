"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { MateriaForm } from "../[id]/materia-form";
import { useState } from "react";
import { api } from "@/trpc/react";

interface EditMateriaProps {
  materiaId: string;
}

export const EditMateriaModal = ({ materiaId }: EditMateriaProps) => {
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
      titulo={"Editar Materia"}
      description={"Modifica los detalles de la materia"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"outline"} className="h-8 w-8 px-1 py-1" title="Editar materia">
          <PencilIcon size={16} />
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col gap-4">
        <MateriaForm id={materiaId} onCancel={handleCancel} onSubmit={handleSave} /> {/* Formulario de materia */}
      </div>
    </ModalDrawer>
  );
};

export default EditMateriaModal;
