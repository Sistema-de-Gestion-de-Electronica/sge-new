import { api } from "@/trpc/react";
import { useState, useRef, useEffect } from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

interface SelectMateriasMultipleProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  max?: number;
}

export function SelectMateriasMultiple<T extends FieldValues = FieldValues>({ 
  control, 
  name,
  label,
  max
}: SelectMateriasMultipleProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: materias, isLoading } = api.materia.getAll.useQuery();

  const cantidadMaterias = max ?? 4;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      validate: (val) => {
        if (!val || val.length === 0) return "Debe seleccionar al menos una materia";
        if (val.length > cantidadMaterias) return `No puede seleccionar más de ${cantidadMaterias} materias`;
        return true;
      },
    },
  });

  const selectedIds: string[] = value || [];
  const selectedMaterias = materias?.filter((materia) => selectedIds.includes(materia.id.toString())) ?? [];

  const materiasFiltradas =
    materias?.filter(
      (materia) =>
        materia.nombre.toLowerCase().includes(searchText.toLowerCase()) && !selectedIds.includes(materia.id.toString()),
    ) ?? [];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchText("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMateria = (materiaId: string) => {
    if (selectedIds.includes(materiaId)) {
      onChange(selectedIds.filter((id: string) => id !== materiaId));
    } else if (selectedIds.length < cantidadMaterias) {
      onChange([...selectedIds, materiaId]);
      setSearchText("");
    }
  };

  const removeMateria = (materiaId: string) => {
    onChange(selectedIds.filter((id: string) => id !== materiaId));
  };

  if (isLoading) {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">{label ? label : "Materias"}</label>
        <Skeleton className="h-14 w-full" />
      </div>
    );
  }

  return (
    <div ref={dropdownRef}>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label ? label : "Materias"} ({selectedIds.length}/{cantidadMaterias})</label>

      <div className="relative">
        {/* Chips */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative min-h-11 w-full cursor-pointer rounded-lg border border-input bg-input px-3 py-2
            focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50
            ${error ? "border-red-300" : "border-gray-200"}
          `}
        >
          
          {/* Buscador */}
          <input
            type="text"
            placeholder={"Seleccionar materias..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="min-w-20 flex-1 border-transparent bg-input px-2 py-2 text-sm outline-none focus:border-transparent focus:ring-0"
          />
          {/* Tags/Chips de materias seleccionadas */}
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
                    removeMateria(materia.id.toString());
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

          {/* Icono flecha */}
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

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-72 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="max-h-48 space-y-0.5 overflow-y-auto">
              {materiasFiltradas.length === 0 ? (
                <div className="p-3 text-center text-sm text-gray-500">
                  {searchText ? "No se encontraron materias" : "Todas las materias están seleccionadas"}
                </div>
              ) : (
                materiasFiltradas.map((materia) => {
                  const isDisabled = selectedIds.length >= cantidadMaterias;

                  return (
                    <button
                      key={materia.id}
                      type="button"
                      onClick={() => !isDisabled && toggleMateria(materia.id.toString())}
                      disabled={isDisabled}
                      className={`
                        focus:outline-hidden w-full cursor-pointer px-4 py-2 text-left
                        text-sm hover:bg-gray-50 focus:bg-gray-100
                        ${isDisabled ? "cursor-not-allowed text-gray-400 opacity-50" : "text-gray-800"}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{materia.nombre}</span>
                        {isDisabled && <span className="ml-2 text-xs text-gray-400">Límite alcanzado</span>}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50 p-2">
              <p className="text-center text-xs text-gray-600">
                {selectedIds.length >= cantidadMaterias
                  ? `Máximo ${cantidadMaterias} materias alcanzado`
                  : `Puedes seleccionar ${cantidadMaterias - selectedIds.length} materias más`}
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
