"use client";

import { useMemo, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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

export default function ClientDateModalPicker() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [link, setLink] = useState("");

  const handleSave = () => {
    console.log("Fecha:", date);
    console.log("Link:", link);
    setOpen(false);
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
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              weekStartsOn={1}
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
            <Button variant="default" onClick={handleSave}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
