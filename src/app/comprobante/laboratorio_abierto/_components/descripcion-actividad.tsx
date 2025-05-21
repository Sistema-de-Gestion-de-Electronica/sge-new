export const DescripcionActividad = ({ descripcion }: { descripcion: string }) => {
  return (
    <div className="w-full border border-gray-800 p-2 text-sm">
      <div className="flex h-full flex-col justify-between text-left">
        <h3 className="text-center text-lg font-semibold">Descripción de la actividad</h3>
        <div className="text-left">
          <p>{descripcion}</p>
        </div>
      </div>
    </div>
  );
};
