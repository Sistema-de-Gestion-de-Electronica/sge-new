export const RenovacionPrestamo = () => {
  return (
    <div className="w-full flex-1 border border-gray-800 p-3">
      <div className="flex h-full flex-col justify-between">
        <div className="w-full">
          <div>
            <h3 className="text-center text-lg font-semibold">Renovación del Préstamo</h3>
          </div>
          <div className="mt-4 flex  justify-between">
            <p className="underline">Observaciones:</p>
            <p>
              <span className="underline">Fecha:</span> ___/___/______
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="mt-1 text-sm font-semibold">Libro renovado hasta la fecha ____/___/______</p>
          <p className="overline"> Firma y Aclaración </p>
        </div>
      </div>
    </div>
  );
};
