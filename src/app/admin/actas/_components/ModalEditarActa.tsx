import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button, toast } from "@/components/ui";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { api } from "@/trpc/react";
import { Acta } from "@/generated/prisma";

type Props = {
  acta?: Acta | null;
};

export default function EditActaModal({ acta }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const actaEditada = api.admin.actas.editarActa.useMutation({
    onSuccess: async () => {
      toast.success("Acta editada con éxito.");
      setOpen(false);
      setSelectedFile(null);
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Error al editar el acta");
    },
  });

  const handleEditActa = async () => {
    if (!acta?.fechaReunion) {
      toast.error("No hay acta en curso para editar.");
      return;
    }
    if (!selectedFile) {
      toast.error("Por favor selecciona un archivo PDF.");
      return;
    }
    if (selectedFile.type !== "application/pdf") {
      toast.error("El archivo debe ser un PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const fileDataUrl = reader.result as string; 
      try {
        await actaEditada.mutateAsync({
          fechaReunion: acta.fechaReunion,
          fileBase64: fileDataUrl, 
        });
      } catch (error: any) {
        toast.error(error?.message ?? "Error inesperado al editar el acta");
      }
    };
    reader.readAsDataURL(selectedFile); 
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  return (
    <ModalDrawer
      trigger={
        <Button
          title="Editar acta"
          variant="icon"
          color="outline"
          className="h-8 w-8 px-1 py-1"
          icon={PencilIcon}
          disabled={!acta}
        />
      }
      titulo={`Editar acta ${acta?.nombreActa ?? ""}`}
      cancelText="Cancelar"
      submitText="Enviar"
      open={open}
      onOpenChange={setOpen}
      onCancel={handleCancel}
      onSubmit={handleEditActa}
      isAlertDialog
    >
      <div>Reemplace el archivo para editar</div>
      <br />
      <input
        type="file"
        name="pdfFile"
        accept="application/pdf"
        required
        onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/80"
      />
    </ModalDrawer>
  );
}