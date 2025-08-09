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

export default function ClientDateModalPicker() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const label = useMemo(
    () => (date ? date.toLocaleDateString("es-AR") : "Elegí una fecha"),
    [date]
  );

  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="gap-2" aria-label="Abrir calendario">
            <CalendarIcon className="h-4 w-4" />
            {label}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-fit">
          <DialogHeader>
            <DialogTitle>Seleccioná una fecha</DialogTitle>
          </DialogHeader>

          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d);
              if (d) setOpen(false); // cerrar al elegir
            }}
            weekStartsOn={1}      // lunes
            // ejemplos útiles:
            // disabled={{ before: new Date() }} // solo futuro
            // disabled={[{ dayOfWeek: [0, 6] }]} // sin fines de semana
          />

          <DialogFooter>
            <Button variant="default" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
