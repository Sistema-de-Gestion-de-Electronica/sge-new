type EquipoReserva = {
  tipoInstrumental: string;
  marca: string;
  inventarioId: string;
};

export const DatosEquipo = (reservaEquipo: EquipoReserva) => {
  return (
    <div className="basis-1/2 border border-gray-800 p-2">
      <div className="flex h-full flex-col justify-between text-left">
        <h3 className="text-center text-lg font-semibold">Datos del Instrumental</h3>
        <div className="text-left">
          <p>
            <span className="underline">Tipo de Instrumental:</span> {reservaEquipo.tipoInstrumental}
          </p>
          <p>
            <span className="underline">Marca:</span> {reservaEquipo.marca}
          </p>
          <p>
            <span className="underline">Número de inventario:</span> {reservaEquipo.inventarioId}
          </p>
        </div>
      </div>
    </div>
  );
};
