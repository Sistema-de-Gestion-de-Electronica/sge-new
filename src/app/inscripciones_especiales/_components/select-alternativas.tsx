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
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative overflow-x-auto shadow-md rounded-md">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
          <thead className="text-xs uppercase text-gray-700 text-center">
            <tr>
              <th className="bg-gray-50 px-6 py-3">Horario</th>
              {dias.map(dia => (
                <th key={dia} className="px-6 py-3">{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {horarios.map(horario => (
              <tr key={horario} className="border-t border-gray-200">
                <th className="bg-gray-50 px-6 py-4 font-medium text-gray-900">{horario}</th>
                {dias.map(dia => (
                  <td key={dia} className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={seleccion[dia]?.[horario] ?? false}
                      onChange={() => handleChange(dia, horario)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}