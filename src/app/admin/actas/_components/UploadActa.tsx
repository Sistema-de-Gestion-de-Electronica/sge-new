"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/trpc/react";

export default function UploadActa() {
  const [open, setOpen] = useState(false);

  const nuevaActa = api.admin.actas.nuevaActa.useMutation({
    onSuccess: async () => {
      setOpen(false);
    },
  });

  function loadDataOnSubmit(e: any) {
    const form = e.currentTarget;

    //Manejo de la fecha
    const dateInput = form.elements.namedItem("actaDate") as HTMLInputElement;

    if (!dateInput?.value) return;
    const fecha = new Date(`${dateInput.value}T00:00:00`);

    //Manejo del pdf
    const fileInput = form.elements.namedItem("pdfFile") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      alert("Por favor selecciona un archivo PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const fileBase64 = reader.result as string;
      nuevaActa.mutateAsync({ fechaReunion: fecha, fileBase64: fileBase64 });
    };
    reader.readAsDataURL(file);
  }

  return (
    <ModalDrawer
      titulo={"Cargar nueva acta"}
      description={"Subí un archivo PDF con el acta de la reunión"}
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="gap-2">
          <Upload size={16} />
          Nueva acta
        </Button>
      }
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          loadDataOnSubmit(e);
        }}
      >
        {/* Fecha del acta */}
        <div className="flex flex-col gap-2">
          <label htmlFor="actaDate" className="text-sm font-medium text-gray-700">
            Fecha del acta
          </label>
          <input
            type="date"
            name="actaDate"
            id="actaDate"
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        {/* PDF */}
        <div className="flex flex-col gap-2">
          <label htmlFor="pdfFile" className="text-sm font-medium text-gray-700">
            Archivo PDF
          </label>
          <input
            type="file"
            name="pdfFile"
            id="pdfFile"
            accept="application/pdf"
            // required
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/80"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="default" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" variant="default" disabled={nuevaActa.isLoading}>
            {nuevaActa.isLoading ? "Creando..." : "Crear acta"}
          </Button>
        </div>
                {/* Error simple */}
        {nuevaActa.isError && (
          <p className="text-sm text-red-600">
            {nuevaActa.error?.message ?? "Error al crear el acta"}
          </p>
        )}
      </form>
    </ModalDrawer>
  );
}
