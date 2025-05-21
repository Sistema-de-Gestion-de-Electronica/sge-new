import { getFechaHumanoTexto } from "@/shared/get-date";

type DatosPrestamoEquipoProps = {
  fechaHoraFin: Date | undefined;
  usuarioAprobadorNombre: string | null;
  usuarioAprobadorApellido: string | null;
};

export const DatosPrestamoEquipo = ({
  fechaHoraFin,
  usuarioAprobadorNombre,
  usuarioAprobadorApellido,
}: DatosPrestamoEquipoProps) => {
  const prestamoFechaFinHumano = getFechaHumanoTexto(fechaHoraFin);

  return (
    <div className="w-full flex-1 border border-gray-800 p-3">
      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-center text-lg font-semibold">Datos del Préstamo</h3>
          <p className="mt-2 text-justify text-sm">
            Recibí el instrumental descrito, en perfecto estado de conservación, funcionamiento y en concepto de
            prestamo. Me comprometo a hacer buen uso del mismo y devolverlo antes del{" "}
            <span className="underline">{prestamoFechaFinHumano}</span>. De requerir una extensión de plazo, me
            comprometo a presentarme en el departamento de electrónica a los efectos de solicitar la renovación
            correspondiente. Asi mismo declaro que mis datos personales figuran correctamente.
          </p>
        </div>
        <div>
          <div className="flex flex-row justify-between text-sm">
            <span>
              Préstamo Realizado por{" "}
              <span className="font-bold">
                {usuarioAprobadorApellido ?? ""} {usuarioAprobadorNombre ?? ""}
              </span>
            </span>
            <p className="overline">Firma y Aclaración</p>
          </div>
        </div>
      </div>
    </div>
  );
};
