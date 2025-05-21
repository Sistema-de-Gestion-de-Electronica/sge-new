"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { useState } from "react";
import { AdminRolForm } from "../../[id]/admin-rol-form";
import { ScrollArea } from "@/components/ui";
import { api } from "@/trpc/react";

export const AdminRolesNuevoRol = () => {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.admin.roles.getAllRoles.invalidate().catch((err) => {
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
      titulo={"Nuevo rol"}
      description={"Creá un nuevo rol"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button color={"primary"}>
          Nuevo rol
          <Plus size={16} className="ml-2" />
        </Button>
      }
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="mt-4 max-h-[calc(100vh_-_300px)] w-full pr-4">
          <AdminRolForm onCancel={handleCancel} onSubmit={handleSave} />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
};
