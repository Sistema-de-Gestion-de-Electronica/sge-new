"use client";

import { useState, useRef, useEffect } from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MateriaInscripcion {
  materiaId: number;
  materiasAdeudadas: number[];
  cursoId?: number;
}

interface FormMateriasDinamicoProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  caso?: string;
}

export function FormMateriasDinamico<T extends FieldValues = FieldValues>({
  control,
  name,
  caso,
}: FormMateriasDinamicoProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      validate: (val: MateriaInscripcion[]) => {
        if (!val || val.length === 0) return "Debe seleccionar al menos una materia";
        if (val.length > 4) return "No puede seleccionar más de 4 materias";
        // Validar que todas tengan materiaId válido
        if (val.some((m) => !m.materiaId || m.materiaId === 0)) return "Todas las materias deben estar seleccionadas";
        return true;
      },
    },
  });

  const materias: MateriaInscripcion[] = value || [{ materiaId: 0, materiasAdeudadas: [] }];

  const agregarMateria = () => {
    if (materias.length < 4) {
      onChange([...materias, { materiaId: 0, materiasAdeudadas: [] }]);
    }
  };

  const eliminarMateria = (index: number) => {
    if (materias.length > 1) {
      const nuevasMaterias = materias.filter((_, i) => i !== index);
      onChange(nuevasMaterias);
    }
  };

  const actualizarMateria = (index: number, updates: Partial<MateriaInscripcion>) => {
    if (index < 0 || index >= materias.length) return;

    const nuevasMaterias = [...materias];
    const materiaActual = nuevasMaterias[index];
    if (!materiaActual) return;

    nuevasMaterias[index] = {
      materiaId: updates.materiaId ?? materiaActual.materiaId,
      materiasAdeudadas: updates.materiasAdeudadas ?? materiaActual.materiasAdeudadas,
      cursoId: updates.cursoId ?? materiaActual.cursoId,
    };
    onChange(nuevasMaterias);
  };

  const mostrarMateriasAdeudadas = caso === "Excepcion de correlativas";

  return (
    <div className="space-y-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">Materias ({materias.length}/4)</label>

      {materias.map((materia, index) => {
        // Obtener las materias ya seleccionadas en otras filas
        const materiasSeleccionadas = materias
          .map((m, i) => (i !== index && m.materiaId ? m.materiaId : null))
          .filter((id): id is number => id !== null && id > 0);

        return (
          <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Materia {index + 1}</span>
              {materias.length > 1 && (
                <Button
                  type="button"
                  color="ghost"
                  size="sm"
                  onClick={() => eliminarMateria(index)}
                  className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {/* Selector de Materia */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Materia</label>
                <SelectMateriaUnica
                  value={materia.materiaId}
                  onChange={(materiaId) => actualizarMateria(index, { materiaId })}
                  materiasExcluidas={materiasSeleccionadas}
                />
              </div>

              {/* Selector de Materias Adeudadas - Solo si el caso es "Excepcion de correlativas" */}
              {mostrarMateriasAdeudadas && materia.materiaId > 0 && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Materias Adeudadas (para esta materia)
                  </label>
                  <SelectMateriasAdeudadas
                    value={materia.materiasAdeudadas}
                    onChange={(materiasAdeudadas) => actualizarMateria(index, { materiasAdeudadas })}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {materias.length < 4 && (
        <Button type="button" color="outline" onClick={agregarMateria} className="w-full">
          Agregar otra materia
        </Button>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

// Componente auxiliar para seleccionar una sola materia
interface SelectMateriaUnicaProps {
  value: number;
  onChange: (materiaId: number) => void;
  materiasExcluidas: number[];
}

function SelectMateriaUnica({ value, onChange, materiasExcluidas }: SelectMateriaUnicaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: materias, isLoading } = api.materia.getAll.useQuery();

  const materiasDisponibles = materias?.filter((m) => !materiasExcluidas.includes(m.id)) ?? [];

  const materiaSeleccionada = materias?.find((m) => m.id === value);

  const materiasFiltradas = materiasDisponibles.filter((materia) =>
    materia.nombre.toLowerCase().includes(searchText.toLowerCase()),
  );

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchText("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative min-h-10 w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50"
      >
        <div className="flex items-center justify-between">
          <span className={materiaSeleccionada ? "text-gray-800" : "text-gray-400"}>
            {materiaSeleccionada ? materiaSeleccionada.nombre : "Seleccionar materia..."}
          </span>
          <svg
            className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-200 p-2">
            <input
              type="text"
              placeholder="Buscar materia..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {materiasFiltradas.length === 0 ? (
              <div className="p-3 text-center text-sm text-gray-500">No se encontraron materias</div>
            ) : (
              materiasFiltradas.map((materia) => (
                <button
                  key={materia.id}
                  type="button"
                  onClick={() => {
                    onChange(materia.id);
                    setIsOpen(false);
                    setSearchText("");
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-50 focus:bg-gray-100"
                >
                  {materia.nombre}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para seleccionar materias adeudadas
interface SelectMateriasAdeudadasProps {
  value: number[];
  onChange: (materiasAdeudadas: number[]) => void;
}

function SelectMateriasAdeudadas({ value, onChange }: SelectMateriasAdeudadasProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: materias, isLoading } = api.materia.getAll.useQuery();

  const selectedIds: number[] = value || [];
  const selectedMaterias = materias?.filter((materia) => selectedIds.includes(materia.id)) ?? [];

  const materiasFiltradas =
    materias?.filter(
      (materia) => materia.nombre.toLowerCase().includes(searchText.toLowerCase()) && !selectedIds.includes(materia.id),
    ) ?? [];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchText("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMateria = (materiaId: number) => {
    if (selectedIds.includes(materiaId)) {
      onChange(selectedIds.filter((id) => id !== materiaId));
    } else if (selectedIds.length < 6) {
      onChange([...selectedIds, materiaId]);
      setSearchText("");
    }
  };

  const removeMateria = (materiaId: number) => {
    onChange(selectedIds.filter((id) => id !== materiaId));
  };

  if (isLoading) {
    return <Skeleton className="h-14 w-full" />;
  }

  return (
    <div ref={dropdownRef}>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="relative min-h-11 w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50"
        >
          <input
            type="text"
            placeholder="Seleccionar materias adeudadas..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="min-w-20 flex-1 border-transparent bg-white px-2 py-2 text-sm outline-none focus:border-transparent focus:ring-0"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex min-h-[28px] flex-wrap items-center gap-1">
            {selectedMaterias.map((materia) => (
              <div
                key={materia.id}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 px-2"
              >
                <span className="max-w-32 truncate px-2 py-1 text-sm text-gray-800">{materia.nombre}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMateria(materia.id);
                  }}
                  className="focus:outline-hidden inline-flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-input text-sm text-gray-800 hover:bg-gray-100 focus:border-none"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-72 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="max-h-48 space-y-0.5 overflow-y-auto">
              {materiasFiltradas.length === 0 ? (
                <div className="p-3 text-center text-sm text-gray-500">
                  {searchText ? "No se encontraron materias" : "Todas las materias están seleccionadas"}
                </div>
              ) : (
                materiasFiltradas.map((materia) => {
                  const isDisabled = selectedIds.length >= 6;
                  return (
                    <button
                      key={materia.id}
                      type="button"
                      onClick={() => !isDisabled && toggleMateria(materia.id)}
                      disabled={isDisabled}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 focus:bg-gray-100 ${
                        isDisabled ? "cursor-not-allowed text-gray-400 opacity-50" : "text-gray-800"
                      }`}
                    >
                      {materia.nombre}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
