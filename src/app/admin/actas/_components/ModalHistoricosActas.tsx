"use client";

import { useMemo, useState } from "react";
import { TrashIcon, EyeOffIcon, WandSparkles, Eye } from "lucide-react";

import { Button } from "@/components/ui";
import ModalDrawer from "@/app/_components/modal/modal-drawer";
import { toast } from "@/components/ui";
import { api } from "@/trpc/react";
import { SelectActasMulti } from "./SelectActasMulti";

type FilterTypeUI = "ALL" | "BEFORE" | "BETWEEN"; // UI
type ActionType = "HIDE" | "DELETE" | "SHOW";

export default function OcultarEliminarActasModal() {
  const [open, setOpen] = useState(false);

  // --- UI filtros (controles de edición) ---
  const [filterType, setFilterType] = useState<FilterTypeUI>("ALL");
  const [date1Str, setDate1Str] = useState<string>(""); // yyyy-mm-dd
  const [date2Str, setDate2Str] = useState<string>("");

  // --- Filtros aplicados (lo que usa la query del Select) ---
  const [appliedInput, setAppliedInput] = useState<{ fechaInicio?: Date; fechaFin?: Date }>({});

  // IDs seleccionadas en el select (siempre visible)
  const [actasIds, setActasIds] = useState<number[]>([]);

  // Acción a ejecutar
  const [action, setAction] = useState<ActionType | null>(null);

  // Mutaciones masivas (usaremos SIEMPRE masivo al confirmar)
  const eliminarMasivo = api.admin.actas.eliminarMasivo.useMutation();
  const visualizarMasivo = api.admin.actas.visualizacionMasivo.useMutation();

  const utils = api.useUtils();

  const isValidDates = useMemo(() => {
    if (filterType === "ALL") return true;
    if (filterType === "BEFORE") return !!date1Str;
    if (filterType === "BETWEEN") {
      if (!date1Str || !date2Str) return false;
      return new Date(date1Str) <= new Date(date2Str);
    }
    return false;
  }, [filterType, date1Str, date2Str]);

  const canConfirm = !!action && actasIds.length > 0;
  const isPending = eliminarMasivo.isPending || visualizarMasivo.isPending;

  const handleApplyFilters = () => {
    if (filterType === "ALL") {
      setAppliedInput({});
      return;
    }
    if (!isValidDates) {
      toast.error("Completá fechas válidas.");
      return;
    }
    if (filterType === "BEFORE") {
      setAppliedInput({ fechaFin: new Date(date1Str) });
      return;
    }
    // BETWEEN
    setAppliedInput({
      fechaInicio: new Date(date1Str),
      fechaFin: new Date(date2Str),
    });
  };

  const handleConfirm = async () => {
    if (!canConfirm || !action) {
      if (!action) toast.error("Elegí una acción.");
      if (actasIds.length === 0) toast.error("No hay actas seleccionadas.");
      return;
    }
    try {
      if (action === "DELETE") {
        const res = await eliminarMasivo.mutateAsync({ ids: actasIds });
        toast.success(`Actas eliminadas: ${res?.count ?? 0}`);
      } else {
        const visibilidad = action === "HIDE" ? "OCULTA" : "VISIBLE";
        const res = await visualizarMasivo.mutateAsync({ ids: actasIds, visibilidad });
        toast.success(
          action === "HIDE"
            ? `Actas ocultadas: ${res?.count ?? 0}`
            : `Actas visibles: ${res?.count ?? 0}`
        );
      }

      setActasIds([]);
      await utils.admin.actas.getAllActas.invalidate();
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Error realizando la acción");
    }
  };

  const resetState = () => {
    setFilterType("ALL");
    setDate1Str("");
    setDate2Str("");
    setAction(null);
    setAppliedInput({});
    setActasIds([]);
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
      submitDisabled={!canConfirm || isPending}
      className="sm:max-w-[720px] w-[min(96vw,720px)]"
    >
      <div className="flex flex-col gap-5">
 
         {/* FILTROS (DEBAJO DEL SELECT) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Filtros</label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={filterType}
              onChange={(e) => {
                const next = e.target.value as FilterTypeUI;
                setFilterType(next);
                setDate1Str("");
                setDate2Str("");
                setActasIds([]);
              }}
              className="w-40 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="ALL">Todas</option>
              <option value="BEFORE">Antes de</option>
              <option value="BETWEEN">Entre</option>
            </select>
            {/* Campos dependientes */}
            {filterType === "BEFORE" && (
              <input
                type="date"
                value={date1Str}
                onChange={(e) => setDate1Str(e.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            )}

            {filterType === "BETWEEN" && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={date1Str}
                  onChange={(e) => setDate1Str(e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
                <span className="text-sm text-slate-500">y</span>
                <input
                  type="date"
                  value={date2Str}
                  onChange={(e) => setDate2Str(e.target.value)}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            )}

            <Button
              type="button"
              onClick={handleApplyFilters}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Aplicar
            </Button>
          </div>

          {/* Hint validación simple */}
          {((filterType === "BEFORE" && !isValidDates) ||
            (filterType === "BETWEEN" && !isValidDates)) && (
            <p className="text-xs text-amber-600">
              Seleccioná fechas válidas {filterType === "BETWEEN" ? "(desde ≤ hasta)" : ""}.
            </p>
          )}
        </div>
 
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Actas</label>
          <SelectActasMulti
            value={actasIds}
            onChange={setActasIds}
            input={appliedInput}
            placeholder="Seleccioná actas..."
            onItemsLoaded={(items) => {
              if (filterType === "BEFORE" || filterType === "BETWEEN") {
                setActasIds(items.map((i) => i.id));
              }
            }}
          />
          <p className="text-xs text-slate-500">
            {actasIds.length === 0 ? "Ninguna acta seleccionada" : `${actasIds.length} actas seleccionadas`}
          </p>
        </div>

        {/* ACCIÓN */}
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
      </div>
    </ModalDrawer>
  );
}
