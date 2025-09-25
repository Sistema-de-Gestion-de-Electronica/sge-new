"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { useController, type Control, type FieldValues } from "react-hook-form";

type Estado = "ABIERTA" | "CERRADA";
type Visibilidad = "VISIBLE" | "OCULTA";

type Acta = {
  id: string | number;
  nombreActa: string;
  estado: Estado;
  visibilidad: Visibilidad;
};

export type Item = {
  id: number;
  label: string;
  estado: Estado;
  visibilidad: Visibilidad;
};

type SelectActasMultiProps = {
  value: number[];
  onChange: (ids: number[]) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  input?: { fechaInicio?: Date; fechaFin?: Date };
  onItemsLoaded?: (items: Item[]) => void;
};

export function SelectActasMulti({
  value,
  onChange,
  className,
  placeholder = "Seleccioná actas...",
  disabled,
  input,
  onItemsLoaded,
}: SelectActasMultiProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Query con filtros aplicados
  const { data, isLoading, isError } = api.admin.actas.getAllActasWithFilters.useQuery(
    input ?? {}, // <- clave: solo cambia cuando el padre cambia "input" (al presionar Aplicar)
    { keepPreviousData: true }
  );

  const items: Item[] = useMemo(() => {
    const raw = (data ?? []) as Acta[];
    return raw.map((a) => ({
      id: Number(a.id),
      label: a.nombreActa,
      estado: a.estado,
      visibilidad: a.visibilidad,
    }));
  }, [data]);

  useEffect(() => {
    onItemsLoaded?.(items);
  }, [items]);

  const selected = useMemo(() => items.filter((i) => value.includes(i.id)), [items, value]);

  function toggleOne(id: number) {
    if (value.includes(id)) onChange(value.filter((x) => x !== id));
    else onChange([...value, id]);
  }

  function clearAll() {
    onChange([]);
  }

  function selectAll() {
  if (items.length === 0) return;
  onChange(items.map(i => i.id));
  }


  function renderEstadoBadge(estado: Estado) {
    const cls =
      estado === "ABIERTA"
        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
        : "bg-rose-100 text-rose-700 border-rose-200";
    return (
      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>
        {estado}
      </span>
    );
  }

  function renderVisibilidadBadge(vis: Visibilidad) {
    const isVisible = vis === "VISIBLE";
    const cls = isVisible
      ? "bg-sky-100 text-sky-700 border-sky-200"
      : "bg-slate-100 text-slate-600 border-slate-200";
    return (
      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>
        {isVisible ? "Visible" : "Oculta"}
      </span>
    );
  }

  return (
    <div className={`relative ${className ?? ""}`} ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50 disabled:opacity-50"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="truncate">
            {selected.length === 0 && (isLoading ? "Cargando..." : placeholder)}
            {selected.length === 1 && selected[0]?.label}
            {selected.length > 1 && `${selected.length} actas seleccionadas`}
          </span>
          <svg
            className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

    {open && (
      <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
        {/* Header sticky con acciones */}
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-slate-100 bg-white px-2 py-1.5">
          {/* IZQUIERDA: Seleccionar todas */}
          <button
            type="button"
            onClick={selectAll}
            disabled={isLoading || isError || items.length === 0}
            className="rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
          >
            Seleccionar todas
          </button>

          {/* CONTADOR (centro) */}
          <div className="ml-1 text-[11px] text-slate-500">
            {value.length}/{items.length} seleccionadas
          </div>

          {/* DERECHA: Limpiar */}
          <button
            type="button"
            onClick={clearAll}
            disabled={value.length === 0}
            className="ml-auto rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
          >
            Limpiar
          </button>
        </div>

        {/* Lista */}
        <div className="max-h-64 overflow-auto py-1">
          {isLoading && <div className="px-3 py-2 text-sm text-slate-500">Cargando actas…</div>}
          {isError && <div className="px-3 py-2 text-sm text-rose-600">No se pudieron cargar las actas.</div>}
          {!isLoading && !isError && items.length === 0 && (
            <div className="px-3 py-2 text-sm text-slate-500">Sin resultados.</div>
          )}

          {items.map((i) => {
            const checked = value.includes(i.id);
            return (
              <label key={i.id} className="flex cursor-pointer items-start gap-2 px-3 py-2 hover:bg-slate-50">
                <input type="checkbox" className="mt-0.5" checked={checked} onChange={() => toggleOne(i.id)} />
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-slate-800">{i.label}</span>
                    <div className="flex items-center gap-1">
                      {renderEstadoBadge(i.estado)}
                      {renderVisibilidadBadge(i.visibilidad)}
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    )}
    </div>
  );
}

/* ========= RHF Wrapper (opcional) ========= */

type SelectActasMultiFieldProps<T extends FieldValues> = {
  name: string;
  control: Control<T>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  input?: { fechaInicio?: Date; fechaFin?: Date };
};

export function SelectActasMultiField<T extends FieldValues>({
  name,
  control,
  className,
  placeholder,
  disabled,
  input,
}: SelectActasMultiFieldProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: [] as number[],
  });

  return (
    <SelectActasMulti
      value={(value ?? []) as number[]}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      input={input}
    />
  );
}
