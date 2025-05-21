type EquipoReservado = {
  laboratorioNombre: string;
  tutor: {
    nombre?: string | null | undefined;
    apellido?: string | null | undefined;
  };
};

export const UsoInternoFirmas = ({ laboratorioNombre, tutor }: EquipoReservado) => {
  const tutorNombre = (tutor.nombre ?? tutor.apellido) ? `${tutor.nombre} ${tutor.apellido}` : "";

  return (
    <div className="w-full border border-gray-800 p-2">
      <div className="flex h-full flex-col justify-between text-left">
        <h3 className="text-center text-lg font-bold">Uso Interno</h3>
        <div className="flex w-full items-center">
          <p className="mr-2">
            <span className="underline">Confirmado y Asignado a:</span> {tutorNombre}
          </p>
          <div className="mt-4 flex-1 border-b border-gray-800"></div>
        </div>
        <div>
          <p>
            <span className="underline">Lugar:</span> {laboratorioNombre}
          </p>
        </div>
        <div>
          <div className="flex w-full items-center">
            <p className="mr-2">
              <span className="underline">Conformidad del servicio:</span>
            </p>
            <div className="mt-8 flex-1 border-t border-gray-800">
              <p className="text-center text-xs text-gray-600">(Firma y Aclaración del Usuario)</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex w-full items-center">
            <p className="mr-2">
              <span className="underline">Prestado Por:</span>
            </p>
            <div className="mt-8 flex-1 border-t border-gray-800">
              <p className="text-center text-xs text-gray-600">(Firma y Aclaración del Responsable)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
