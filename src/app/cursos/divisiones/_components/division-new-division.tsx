"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { DivisionForm } from "../[id]/division-form";
import { useState } from "react";
import { api } from "@/trpc/react";

export const NuevaDivision = () => {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.division.getFiltered.invalidate().catch((err) => {
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
      titulo={"Nueva división"}
      description={"Crea una nueva división"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"}>
          Nueva división
          <Plus size={16} className="ml-2" />
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col gap-4">
        <DivisionForm onCancel={handleCancel} onSubmit={handleSave} />
      </div>
    </ModalDrawer>
  );
};
