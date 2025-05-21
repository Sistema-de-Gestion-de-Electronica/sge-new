type LibroReserva = {
  tituloLibro: string;
  editorial: string;
  inventarioId: string;
};

export const DatosLibro = (reservaLibro: LibroReserva) => {
  return (
    <div className="basis-1/2 border border-gray-800 p-2">
      <div className="flex h-full flex-col justify-between text-left">
        <h3 className="text-center text-lg font-semibold">Datos del Libro</h3>
        <div className="text-left">
          <p>
            <span className="underline">Título:</span> {reservaLibro.tituloLibro}
          </p>
          <p>
            <span className="underline">Editorial:</span> {reservaLibro.editorial}
          </p>
          <p>
            <span className="underline">Número de inventario:</span> {reservaLibro.inventarioId}
          </p>
        </div>
      </div>
    </div>
  );
};
