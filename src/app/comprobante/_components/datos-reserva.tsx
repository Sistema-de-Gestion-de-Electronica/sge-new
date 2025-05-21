import { getFechaddddDDMMYYYY, getTimeISOString } from "@/shared/get-date";

type Reserva = {
  fechaHoraInicio: Date | undefined;
  fechaHoraFin: Date | undefined;
  cantidadPersonas: number;
};

export const DatosReserva = (reserva: Reserva) => {
  const fecha = getFechaddddDDMMYYYY(reserva.fechaHoraInicio);

  const horaInicio = getTimeISOString(reserva.fechaHoraInicio);
  const horaFin = getTimeISOString(reserva.fechaHoraFin);

  return (
    <div className="basis-1/2 border border-gray-800 p-2">
      <div className="flex h-full flex-col justify-between text-left">
        <h3 className="text-center text-lg font-semibold">Datos de reserva</h3>
        <div className="text-left">
          <p>
            <span className="underline">Fecha:</span> {fecha}
          </p>
          <p>
            <span className="underline">Hora Inicio:</span> {horaInicio}
          </p>
          <p>
            <span className="underline">Hora Fin:</span> {horaFin}
          </p>
          <p>
            <span className="underline">Cantidad de Personas:</span> {reserva.cantidadPersonas}
          </p>
        </div>
      </div>
    </div>
  );
};
