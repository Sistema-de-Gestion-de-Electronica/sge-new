"use client";

import { useMemo, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui";


export default function ClientDateModalPicker() {
  const [open, setOpen] = useState(false);
  const [dateStr, setDateStr] = useState("");
  const [link, setLink] = useState("");

  const { mutateAsync: agregarReunion, isPending, error } =
    api.reunion.agregarReunion.useMutation({});

  const canSave = useMemo(() => {
    return dateStr.length === 10 && link.trim().length > 0 && !isPending;
  }, [dateStr, link, isPending]);

  const handleSave = async () => {
    if (!canSave) return;
    try {
      await agregarReunion({
        fecha: new Date(dateStr),
        link: link.trim(),
      });
      toast.success("Fecha de reunión agregada con éxito.");
      setOpen(false);
      setDateStr("");
      setLink("");
    } catch (e) {
      toast.error(error?.message ?? "Error al agregar la reunión");
      console.error(e);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="gap-2" aria-label="Abrir calendario">
            <CalendarIcon className="h-4 w-4" />
            Próxima reunión
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Agendar próxima reunión</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 items-center">
            <Input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />

            <Input
              type="url"
              placeholder="Link de la reunión"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="default" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="default" onClick={handleSave} disabled={!canSave}>
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
