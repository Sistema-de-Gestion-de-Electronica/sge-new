"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, Plus } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import React, { useState } from "react";
import { SoftwareForm } from "../software-form";
import { api } from "@/trpc/react";

type SoftwareFormProps = {
  softwareId?: number;
};

export const SoftwareNuevoEditar = ({ softwareId }: SoftwareFormProps) => {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.software.getAll.invalidate().catch((err) => {
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
      titulo={softwareId ? "Editar aplicación" : "Nueva aplicación"}
      description={softwareId ? "Editar aplicación" : "Agregá una nueva aplicación"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          type="button"
          className={softwareId ? "h-8 w-8 px-1 py-1 text-black" : ""}
          color={softwareId ? "outline" : "primary"}
        >
          <ButtonSoftware softwareId={softwareId} />
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <SoftwareForm onCancel={handleCancel} onSubmit={handleSave} softwareId={softwareId} />
      </div>
    </ModalDrawer>
  );
};

const ButtonSoftware = ({ softwareId }: SoftwareFormProps) => {
  if (softwareId) {
    return <PencilIcon size={16} />;
  }

  return (
    <>
      Nueva aplicación
      <Plus size={16} className="ml-2" />
    </>
  );
};
