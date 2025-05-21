type UsuarioSolicito = {
  nombre: string | null;
  email: string;
  apellido: string | null;
  telefonoCasa: string | null;
  telefonoCelular: string | null;
  telefonoLaboral: string | null;
  legajo: string | null;
};

export const DatosSolicitante = ({ datosUsuario }: { datosUsuario: UsuarioSolicito | undefined }) => {
  return (
    <div className="h-full basis-1/2 border border-gray-800 p-2">
      <div className="flex h-full flex-col justify-between text-left">
        <h3 className="text-center text-lg font-bold">Datos del Solicitante</h3>
        <p>
          <span className="underline">Apellido y Nombre:</span> {datosUsuario?.apellido ?? ""},{" "}
          {datosUsuario?.nombre ?? ""}
        </p>
        <p>
          <span className="underline">Número de Legajo:</span> {datosUsuario?.legajo ?? ""}
        </p>
        <div className="flex w-full flex-row justify-between">
          <span>
            <span className="font-bold underline">T:</span> {datosUsuario?.telefonoCasa ?? "---"}
          </span>
          <span>
            <span className="underline">C:</span> {datosUsuario?.telefonoCelular ?? "---"}
          </span>
          <span>
            <span className="underline">L:</span> {datosUsuario?.telefonoLaboral ?? "---"}
          </span>
        </div>
      </div>
    </div>
  );
};
