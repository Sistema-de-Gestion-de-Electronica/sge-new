"use client";

import { useMemo, useState } from "react";
import { TrashIcon, EyeOffIcon, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { toast } from "@/components/ui";
// import { api } from "@/trpc/react"; // ← Descomenta cuando tengas el endpoint

type FilterType = "BEFORE" | "BETWEEN" | "EQUAL";
type ActionType = "HIDE" | "DELETE";

export default function OcultarEliminarActasModal() {
  const [open, setOpen] = useState(false);

  const [filterType, setFilterType] = useState<FilterType>("BEFORE");
  const [date1, setDate1] = useState<string>(""); // yyyy-mm-dd
  const [date2, setDate2] = useState<string>("");

  const [action, setAction] = useState<ActionType | null>(null);

  // —————————————————————————————————————————
  // API (stub) — reemplazá por tu TRPC:
  // const bulkMaintain = api.admin.acta.bulkMaintenance.useMutation({
  //   onSuccess: (res) => {
  //     toast.success(`Acción realizada. Afectadas: ${res?.modified ?? 0} actas`);
  //     setOpen(false);
  //   },
  //   onError: (err) => toast.error(err?.message ?? "Error realizando la acción"),
  // });
  // —————————————————————————————————————————

  const isValidDates = useMemo(() => {
    if (filterType === "BEFORE" || filterType === "EQUAL") {
      return !!date1;
    }
    if (filterType === "BETWEEN") {
      if (!date1 || !date2) return false;
      return new Date(date1) <= new Date(date2);
    }
    return false;
  }, [filterType, date1, date2]);

  const canConfirm = !!action && isValidDates;

  const buildPayload = () => {
    if (filterType === "BEFORE") {
      return {
        action: action === "HIDE" ? "hide" : "hardDelete",
        range: { beforeDate: date1 }, // yyyy-mm-dd
      };
    }
    if (filterType === "EQUAL") {
      return {
        action: action === "HIDE" ? "hide" : "hardDelete",
        range: { fromDate: date1, toDate: date1 },
      };
    }
    // BETWEEN
    return {
      action: action === "HIDE" ? "hide" : "hardDelete",
      range: { fromDate: date1, toDate: date2 },
    };
  };

  const handleConfirm = async () => {
    if (!canConfirm) return;

    const payload = buildPayload();

    // bulkMaintain.mutate(payload); // ← tu llamada real
    console.log("Bulk payload", payload);
    toast.success("Acción simulada (consola). Reemplazá por tu mutate().");
    setOpen(false);
  };

  const resetState = () => {
    setFilterType("BEFORE");
    setDate1("");
    setDate2("");
    setAction(null);
  };

  return (
    <ModalDrawer
      trigger={
        <Button className="gap-2">
            <WandSparkles size={16} />
            Gestionar actas
        </Button>
      }
      titulo="Ocultar o Eliminar Actas"
      cancelText="Cancelar"
      submitText="Confirmar"
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetState();
      }}
      onCancel={() => setOpen(false)}
      onSubmit={handleConfirm}
      // si tu ModalDrawer usa confirmación “alert” cambiá estas props a gusto:
      isAlertDialog
    >
      <div className="flex flex-col gap-5">
        {/* FILTROS */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">
            Filtros por antigüedad
          </label>

          {/* Dropdown: Antes de / Entre / Igual a */}
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="w-30 rounded-md border border-slate-300 bg-white px-7 py-2 text-sm text-left"
            >
              <option value="BEFORE">Antes de</option>
              <option value="BETWEEN">Entre</option>
              <option value="EQUAL">Igual a</option>
            </select>

            {/* Date pickers dinámicos */}
            {filterType === "BETWEEN" ? (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
                <span className="text-sm text-slate-500">y</span>
                <input
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            ) : (
              <input
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            )}
          </div>

          {/* Hint de validación simple */}
          {!isValidDates && (
            <p className="text-xs text-amber-600">
              Seleccioná fecha{filterType === "BETWEEN" ? "s válidas (desde ≤ hasta)" : ""}.
            </p>
          )}
        </div>

        {/* ACCIÓN: Ocultar / Eliminar definitivamente */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Acción</label>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => setAction("HIDE")}
              className={`rounded-full px-4 py-2 text-sm ${
                action === "HIDE"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <EyeOffIcon className="mr-2 h-4 w-4" />
              Ocultar
            </Button>

            <Button
              type="button"
              onClick={() => setAction("DELETE")}
              className={`rounded-full px-4 py-2 text-sm ${
                action === "DELETE"
                  ? "bg-red-600 text-white"
                  : "bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </div>
        </div>

        {/* FOOTER: Cancelar / Confirmar (usa los del ModalDrawer) */}
        <div className="mt-2 text-xs text-slate-500">
          * Esta acción afectará todas las actas que cumplan el criterio
          seleccionado.
        </div>
      </div>
    </ModalDrawer>
  );
}
