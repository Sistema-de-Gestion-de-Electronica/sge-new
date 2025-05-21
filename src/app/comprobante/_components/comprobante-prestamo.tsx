"use client";

import { type RouterOutputs } from "@/trpc/react";
import { RenovacionPrestamo } from "./renovacion-prestamo";
import { CancelacionPrestamo } from "./cancelacion-prestamo";
import { DatosSolicitante } from "./datos-alumno";
import { DatosLibro } from "./datos-libro";
import { DatosPrestamoLibro } from "./datos-prestamo-libro";
import { DatosEquipo } from "./datos-equipo";
import { DatosPrestamoEquipo } from "./datos-prestamo-equipo";
import { ContenedorPrint } from "./contenedor-print";

type DataReservaLibro = RouterOutputs["reservas"]["reservaBiblioteca"]["getReservaPorId"];
type DataReservaEquipo = RouterOutputs["reservas"]["reservaEquipo"]["getReservaPorId"];

type ComprobanteContentProps =
  | { datosLibro: DataReservaLibro; datosEquipo: undefined }
  | { datosLibro: undefined; datosEquipo: DataReservaEquipo };

export default function ComprobanteContent({ datosLibro, datosEquipo }: ComprobanteContentProps) {
  if (!datosLibro && !datosEquipo) return null;

  const datosGenericos = datosEquipo ?? datosLibro;

  const titulo = !!datosLibro
    ? `Préstamo de Libro #${datosGenericos?.id ?? 0} - ${datosLibro.reservaLibro?.libro.inventarioId ?? ""}`
    : `Préstamo de Equipo #${datosGenericos?.id ?? 0} - ${datosEquipo?.reservaEquipo?.equipo.inventarioId ?? ""}`;

  return (
    <ContenedorPrint titulo={titulo}>
      <>
        {/* Datos del Alumno / Datos del Libro - Inventario */}
        <div className="flex w-full flex-initial flex-row space-x-4">
          <DatosSolicitante datosUsuario={datosGenericos?.usuarioSolicito} />
          {datosLibro && (
            <DatosLibro
              editorial={datosLibro.reservaLibro?.libro.editorial.editorial ?? ""}
              inventarioId={datosLibro.reservaLibro?.libro.inventarioId ?? ""}
              tituloLibro={datosLibro.reservaLibro?.libro.titulo ?? ""}
            />
          )}
          {datosEquipo && (
            <DatosEquipo
              inventarioId={datosEquipo.reservaEquipo?.equipo.inventarioId ?? ""}
              marca={datosEquipo.reservaEquipo?.equipo.marca.nombre ?? ""}
              tipoInstrumental={datosEquipo.reservaEquipo?.equipo.tipo.nombre ?? ""}
            />
          )}
        </div>

        {/* Datos del Préstamo */}
        {datosLibro && (
          <DatosPrestamoLibro
            fechaHoraFin={datosGenericos?.fechaHoraFin ?? undefined}
            usuarioAprobadorApellido={datosGenericos?.usuarioAprobador?.apellido ?? null}
            usuarioAprobadorNombre={datosGenericos?.usuarioAprobador?.nombre ?? null}
          />
        )}

        {datosEquipo && (
          <DatosPrestamoEquipo
            fechaHoraFin={datosGenericos?.fechaHoraFin ?? undefined}
            usuarioAprobadorApellido={datosGenericos?.usuarioAprobador?.apellido ?? null}
            usuarioAprobadorNombre={datosGenericos?.usuarioAprobador?.nombre ?? null}
          />
        )}

        {/* Cancelación del Préstamo */}
        <CancelacionPrestamo />

        {/* Renovación del Préstamo */}
        <RenovacionPrestamo />

        {/* Renovación del Préstamo */}
        <RenovacionPrestamo />
      </>
    </ContenedorPrint>
  );
}
