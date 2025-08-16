"use client";

import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UploadActa() {
  const [open, setOpen] = useState(false);

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
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;

          const fileInput = form.elements.namedItem(
            "pdfFile"
          ) as HTMLInputElement;
          const dateInput = form.elements.namedItem(
            "actaDate"
          ) as HTMLInputElement;
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
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/80"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="default" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" variant="default">
            Subir Acta
          </Button>
        </div>
      </form>
    </ModalDrawer>
  );
}
