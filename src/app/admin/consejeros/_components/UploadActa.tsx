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
            const fileInput = e.currentTarget.elements.namedItem(
              "pdfFile"
            ) as HTMLInputElement;
          //   if (fileInput.files?.[0]) {
          //     handleSave(fileInput.files[0]);
          //   }
          }}
        >
          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/80"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="default">
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              Subir PDF
            </Button>
          </div>
        </form>
      </ModalDrawer>
    );
};
