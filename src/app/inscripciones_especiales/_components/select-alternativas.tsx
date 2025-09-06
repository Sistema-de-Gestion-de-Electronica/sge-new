import { Fragment } from "react";
import { useController, type Control, type FieldValues, type Path, type PathValue } from "react-hook-form";

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const horarios = ["Mañana", "Tarde", "Noche"];

interface SelectAlternativasProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function SelectAlternativas<T extends FieldValues = FieldValues>({
  name, 
  control, 
  label = "Alternativa"
}: SelectAlternativasProps<T>) {
  const {  
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "" as PathValue<T, Path<T>>,
  });

  const selectionToString = (seleccion: Record<string, Record<string, boolean>>) => {
    const diasConSeleccion: string[] = [];
    
    Object.entries(seleccion).forEach(([dia, horarios]) => {
      const horariosSeleccionados = Object.entries(horarios)
        .filter(([, selected]) => selected)
        .map(([horario]) => horario);
      
      if (horariosSeleccionados.length > 0) {
        diasConSeleccion.push(`${dia}: ${horariosSeleccionados.join(', ')}`);
      }
    });

    return diasConSeleccion.join(' | ');
  };

  const stringToSelection = (str: string) => {
    const seleccion: Record<string, Record<string, boolean>> = {};
    
    // Inicializar
    dias.forEach(dia => {
      horarios.forEach(horario => {
        if (!seleccion[dia]) {
          seleccion[dia] = {};
        }
        seleccion[dia][horario] = false;
      });
    });

    if (str) {
      const diasParts = str.split(' | ');
      diasParts.forEach(diaPart => {
        const [dia, horariosStr] = diaPart.split(': ');
        if (dia && horariosStr && seleccion[dia]) {
          const horariosArray = horariosStr.split(', ');
          horariosArray.forEach(horario => {
            if (!seleccion[dia]) {
              seleccion[dia] = {};
            }
            if (seleccion[dia][horario] !== undefined) {
              seleccion[dia][horario] = true;
            }
          });
        }
      });
    }

    return seleccion;
  };

  const seleccion = stringToSelection(value || "");

  const handleChange = (dia: string, horario: string) => {
    const newSeleccion = { ...seleccion };
    if (!newSeleccion[dia]) {
      newSeleccion[dia] = {};
    }
    newSeleccion[dia] = {
      ...newSeleccion[dia],
      [horario]: !newSeleccion[dia][horario]
    };

    const stringValue = selectionToString(newSeleccion);
    onChange(stringValue);
  };

  return (
    <div className="w-full overflow-x-auto">
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <div className="grid min-w-[700px] grid-cols-[100px_repeat(6,1fr)] border rounded-lg overflow-hidden text-sm shadow-md">
        {/* Encabezado */}
        <div className="bg-gray-700 text-white font-semibold p-2 text-center">Horario</div>
        {dias.map((dia) => (
          <div
            key={dia}
            className="bg-gray-700 text-white font-semibold p-2 text-center"
          >
            {dia}
          </div>
        ))}

        {/* Filas */}
        {horarios.map((horario) => (
          <Fragment key={horario}>
            <div className="bg-gray-100 font-medium p-2 text-center border-t">
              {horario}
            </div>
            {dias.map((dia) => {
              const selected = seleccion[dia]?.[horario];
              return (
                <div
                  key={`${dia}-${horario}`}
                  onClick={() => handleChange(dia, horario)}
                  className={`overflow-x-auto cursor-pointer select-none border-t p-2 text-center transition ${
                    selected
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {selected ? "✔" : "-"}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{String(error.message)}</p>
      )}
    </div>
  );
}