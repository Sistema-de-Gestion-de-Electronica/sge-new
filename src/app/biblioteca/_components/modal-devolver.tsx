"use client";

import { useState } from "react";

import { toast } from "@/components/ui";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { api } from "@/trpc/react";
import { DevolverButton } from "@/app/_components/prestar-devolver";

type DevolverLibroModalProps = {
  libroId: number;
};

export default function DevolverLibroModal({ libroId }: DevolverLibroModalProps) {
  const devolverLibro = api.reservas.reservaBiblioteca.devolverLibro.useMutation();

  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const refreshGetAll = () => {
    utils.biblioteca.getAll.invalidate().catch((err) => {
      console.error(err);
    });
    utils.reservas.reservaBiblioteca.invalidate().catch((err) => {
      console.error(err);
    });
  };

  const handleCancel = () => setOpen(false);

  const handleDevolverLibro = async () => {
    devolverLibro.mutate(
      { libroId },
      {
        onSuccess: () => {
          toast.success("Libro devuelto con éxito.");
          refreshGetAll();
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error?.message ?? "Error al devolver el libro");
        },
      },
    );
  };

  return (
    <div className="flex flex-row justify-center">
      <ModalDrawer
        trigger={
          <div className="flex flex-row justify-center">
            <DevolverButton />
          </div>
        }
        titulo={`Devolver libro`}
        open={open}
        onOpenChange={setOpen}
        onCancel={handleCancel}
        onSubmit={handleDevolverLibro}
        isAlertDialog
        cancelText="Cancelar"
        submitText="Sí, devolver"
      >
        <div>¿Está seguro que desea devolver el libro?</div>
      </ModalDrawer>
    </div>
  );
}
