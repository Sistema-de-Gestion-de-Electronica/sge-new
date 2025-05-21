import { DatosUniversidad } from "./datos-universidad";

type EquipoReservado = {
  equipoId: number;
  cantidad: number;
  equipoTipo: {
    nombre: string;
  };
};

export const InstrumentalRequerido = ({ equipos }: { equipos: EquipoReservado[] }) => {
  return (
    <div className="w-full border border-gray-800 p-2">
      <div className="flex h-full flex-col justify-between text-left">
        <h3 className="text-center text-lg font-semibold">Instrumental Requerido</h3>
        <div className="pl-2 text-left">
          <ul>
            {equipos.map((equipo) => (
              <li key={equipo.equipoId} className="text-sm">
                <strong>{equipo.equipoTipo.nombre}</strong> x {equipo.cantidad}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <DatosUniversidad />
      </div>
    </div>
  );
};
