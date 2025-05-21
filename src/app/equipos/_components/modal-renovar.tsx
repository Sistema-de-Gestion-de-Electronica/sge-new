"use client";

import { useState } from "react";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { Separator } from "@radix-ui/react-separator";
import { EquipoFormPrestarORenovar } from "./form-prestar";
import { EquipoInformacionBasica } from "../equipo/_components/info-basica-equipo";
import { RenovarButton } from "@/app/_components/prestar-devolver";
import { ScrollArea } from "@/components/ui";

type RenovarPrestamoEquipoModalProps = {
  equipoId: number;
};

export default function RenovarPrestamoEquipoModal({ equipoId }: RenovarPrestamoEquipoModalProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => setOpen(false);

  const handleCancel = () => setOpen(false);

  return (
    <ModalDrawer
      trigger={
        <div className="flex flex-row justify-center">
          <RenovarButton />
        </div>
      }
      titulo={`Renovar equipo`}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="mt-4 max-h-[calc(100vh_-_300px)] w-full pr-4">
          <EquipoInformacionBasica equipoId={equipoId} />

          <Separator className="my-8 border-2" />

          <EquipoFormPrestarORenovar equipoId={equipoId} onCancel={handleCancel} onSubmit={handleSubmit} renovar />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
