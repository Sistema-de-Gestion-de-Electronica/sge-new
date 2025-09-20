"use client";

import { useMemo, useState } from "react";
import { TrashIcon, EyeOffIcon, WandSparkles, Eye } from "lucide-react";

import { Button } from "@/components/ui";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { toast } from "@/components/ui";
import { api } from "@/trpc/react";
import { SelectActasMulti } from "./SelectActasMulti";

type FilterType = "BEFORE" | "BETWEEN" | "SELECT";
type ActionType = "HIDE" | "DELETE" | "SHOW";

export default function OcultarEliminarActasModal() {
  const [open, setOpen] = useState(false);

  const [filterType, setFilterType] = useState<FilterType>("BEFORE");
  const [date1, setDate1] = useState<string>(""); // yyyy-mm-dd
  const [date2, setDate2] = useState<string>("");
  const [actasIds, setActasIds] = useState<string[]>([]);


  const [action, setAction] = useState<ActionType | null>(null);

  const eliminarHasta = api.admin.actas.eliminarHasta.useMutation();
  const eliminarEntre = api.admin.actas.eliminarEntre.useMutation();
  const eliminarIgual = api.admin.actas.eliminarIgual.useMutation();
  const visualizarHasta = api.admin.actas.visualizacionHasta.useMutation();
  const visualizarEntre = api.admin.actas.visualizacionEntre.useMutation();
  const visualizarIgual = api.admin.actas.visualizacionIgual.useMutation();


  const isValidDates = useMemo(() => {
    if (filterType === "BEFORE" || filterType === "SELECT") {
      return !!date1;
    }
    if (filterType === "BETWEEN") {
      if (!date1 || !date2) return false;
      return new Date(date1) <= new Date(date2);
    }
    return false;
  }, [filterType, date1, date2]);

  const canConfirm = !!action && isValidDates;

const isPending =
  eliminarHasta.isPending ||
  eliminarEntre.isPending ||
  eliminarIgual.isPending ||            
  visualizarHasta.isPending ||
  visualizarEntre.isPending ||
  visualizarIgual.isPending;            

const handleConfirm = async () => {
  if (!canConfirm || !action) return;

  try {
    const fromDate = date1;
    const toDate = filterType === "BETWEEN" ? date2 : date1;

    if (action === "HIDE") {
        if (filterType === "BEFORE") {
          const res = await visualizarHasta.mutateAsync({
            visibilidad: "OCULTA",
            fechaReunion: new Date(toDate),
          });
          toast.success(`Actas ocultadas: ${res?.count ?? 0}`);
        } else if (filterType === "SELECT") {
          const res = await visualizarIgual.mutateAsync({
            visibilidad: "OCULTA",
            fechaReunion: new Date(fromDate),
          });
          toast.success(`Actas ocultadas: ${res?.count ?? 0}`);
        } else {
          // BETWEEN
          const res = await visualizarEntre.mutateAsync({
            visibilidad: "OCULTA",
            fechaInicio: new Date(fromDate),
            fechaFin: new Date(toDate),
          });
          toast.success(`Actas ocultadas: ${res?.count ?? 0}`);
        }
    } else if (action === "SHOW") {
        if (filterType === "BEFORE") {
          const res = await visualizarHasta.mutateAsync({
            visibilidad: "VISIBLE",
            fechaReunion: new Date(toDate),
          });
          toast.success(`Actas visibles: ${res?.count ?? 0}`);
        } else if (filterType === "SELECT") {
          const res = await visualizarIgual.mutateAsync({
            visibilidad: "VISIBLE",
            fechaReunion: new Date(fromDate),
          });
          toast.success(`Actas visibles: ${res?.count ?? 0}`);
        } else {
          // BETWEEN
          const res = await visualizarEntre.mutateAsync({
            visibilidad: "VISIBLE",
            fechaInicio: new Date(fromDate),
            fechaFin: new Date(toDate),
          });
          toast.success(`Actas visibles: ${res?.count ?? 0}`);
        }
    } else {
        // DELETE
        if (filterType === "BEFORE") {
          const res = await eliminarHasta.mutateAsync({
            fechaReunion: new Date(toDate),
          });
          toast.success(`Actas eliminadas: ${res?.count ?? 0}`);
        } else if (filterType === "SELECT") {
          const res = await eliminarIgual.mutateAsync({
            fechaReunion: new Date(fromDate),
          });
          toast.success(`Actas eliminadas: ${res?.count ?? 0}`);
        } else {
          // BETWEEN
          const res = await eliminarEntre.mutateAsync({
            fechaInicio: new Date(fromDate),
            fechaFin: new Date(toDate),
          });
          toast.success(`Actas eliminadas: ${res?.count ?? 0}`);
        }
    }

    setOpen(false);
  } catch (err: any) {
    toast.error(err?.message ?? "Error realizando la acción");
  }
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
              <option value="SELECT">Seleccion multiple</option>
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
            ) : filterType === "SELECT" ? (
              <div className="w-full">
                <SelectActasMulti
                  value={actasIds}
                  onChange={setActasIds}
                  className="w-full"
                  placeholder="Seleccioná actas..."
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

            <Button
              type="button"
              onClick={() => setAction("SHOW")}
              className={`rounded-full px-4 py-2 text-sm ${
                action === "SHOW"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Eye className="mr-2 h-4 w-4" />
              Desocultar
            </Button>
          </div>
        </div>

        {/* FOOTER: Cancelar / Confirmar (usa los del ModalDrawer) */}
        <div className="mt-2 text-xs text-slate-500">
        </div>
      </div>
    </ModalDrawer>
  );
}
