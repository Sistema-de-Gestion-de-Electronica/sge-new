export const CancelacionPrestamo = () => {
  return (
    <div className="w-full flex-1 border border-gray-800 p-3">
      <div className="flex h-full flex-col justify-between">
        <div className="w-full">
          <div>
            <h3 className="text-center text-lg font-semibold">Cancelación del Préstamo</h3>
          </div>
          <div className="flex  justify-between">
            <p className="underline">Observaciones:</p>
            <p>
              <span className="underline">Fecha:</span> ___/___/______
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="me-1 mt-1 text-sm font-semibold">
            Yo _______________________, declaro recibir el libro anteriormente descrito
          </p>
          <p className="overline">Firma y Aclaración</p>
        </div>
      </div>
    </div>
  );
};
