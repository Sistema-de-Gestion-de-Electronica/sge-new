"use client";

import { Button } from "@/components/ui/button";
import { ScreenShareIcon } from "lucide-react";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import React, { useState } from "react";
import { AgregarCursoPantallaForm } from "../curso-pantalla-nuevo";
import { api } from "@/trpc/react";
import { useTienePermisos } from "@/app/_hooks/use-tiene-permisos";
import { SgeNombre } from "@/generated/prisma";

export const AgregarAPantallaModal = () => {
  const { tienePermisos, isLoading, isError } = useTienePermisos([SgeNombre.RES_LAB_ABM_PANTALLA]);

  const [open, setOpen] = useState(false);
  const utils = api.useUtils();

  if (isLoading || isError || !tienePermisos) {
    return null;
  }

  const refreshGetAll = () => {
    utils.reservas.pantalla.getAllActivas.invalidate().catch((err) => {
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
      titulo={"Agregar a pantalla"}
      description={"Agregar curso a pantalla"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button type="button" color={"primary"} variant={"default"} className="flex flex-row gap-x-2 text-sm">
          <ScreenShareIcon className="h-4 w-4" />
          Agregar a pantalla
        </Button>
      }
      className={"max-h-[calc(100vh_-_10%)]"}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <AgregarCursoPantallaForm onCancel={handleCancel} onSubmit={handleSave} />
      </div>
    </ModalDrawer>
  );
};
