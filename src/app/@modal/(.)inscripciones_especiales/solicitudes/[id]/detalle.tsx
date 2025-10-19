"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { InscripcionEspecialViewAdmin } from "@/app/inscripciones_especiales/solicitudes/[id]/form-gestion-inscripcion-especial";
import { ScrollArea } from "@/components/ui";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetalleSolicitud({ id }: { id: string }) {
  const [open, setOpen] = useState(true);
  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.inscripcionesEspeciales.getAllInscripcionesEspeciales.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
      router.back();
    }
  };

  const handleClickCancel = () => {
    handleOpenChange(false);
  };

  const handleClickAprobar = () => {
    refreshGetAll();
    router.back();
  };

  const handleClickRechazar = () => {
    refreshGetAll();
    router.back();
  };

  return (
    <ModalDrawer
      titulo="Detalle de la Solicitud"
      description="Detalles de la solicitud de inscripción."
      open={open}
      onOpenChange={handleOpenChange}
      className="min-w-fit"
    >
      <div className="flex max-h-max w-full flex-col  gap-4">
        <ScrollArea className="max-h-[calc(100vh_-_300px)] w-full">
          <InscripcionEspecialViewAdmin
            inscripcionEspecialId={Number(id)}
            onCancel={handleClickCancel}
            onAprobar={handleClickAprobar}
            onRechazar={handleClickRechazar}
          />
        </ScrollArea>
      </div>
    </ModalDrawer>
  );
}
