"use client";

import { type RouterOutputs } from "@/trpc/react";

import { ContenedorPrint } from "../../_components/contenedor-print";
import { DatosSolicitante } from "../../_components/datos-alumno";
import { DatosReserva } from "../../_components/datos-reserva";
import { DescripcionActividad } from "./descripcion-actividad";
import { InstrumentalRequerido } from "./instrumental-requerido";
import { UsoInternoFirmas } from "./uso-interno-firmas";
import { InstrumentalUtilizado } from "./instrumental-utilizado";

type DataReservaLaboAbierto = RouterOutputs["reservas"]["reservaLaboratorioAbierto"]["getReservaPorID"];

export default function ComprobanteLaboratorioAbierto({ datos }: { datos: DataReservaLaboAbierto }) {
  if (!datos) return null;

  return (
    <ContenedorPrint
      titulo={`Reserva de Laboratorio Abierto - ${datos.laboratorioAbiertoTipo} N°: ${datos.reserva.id}`}
      className="border-2 border-gray-800 text-sm"
    >
      {/* Datos del Alumno / Datos del Libro - Inventario */}
      <div className="flex w-full flex-initial flex-row space-x-4">
        <DatosSolicitante datosUsuario={datos.reserva.usuarioSolicito} />
        <DatosReserva
          fechaHoraInicio={datos.reserva.fechaHoraInicio}
          fechaHoraFin={datos.reserva.fechaHoraFin}
          cantidadPersonas={datos.concurrentes}
        />
      </div>

      {/* Descripción */}
      <div className="flex w-full flex-initial flex-col space-y-4">
        <DescripcionActividad descripcion={datos.descripcion} />
      </div>

      {/* Instrumental Requerido */}
      <div className="flex w-full flex-initial flex-col space-y-4">
        <InstrumentalRequerido equipos={datos.equipoReservado} />
      </div>

      {/* Firmas */}
      <div className="flex w-full flex-initial flex-row space-x-4">
        <UsoInternoFirmas
          laboratorioNombre={datos.laboratorio?.nombre ?? ""}
          tutor={datos.reserva.usuarioTutor ?? {}}
        />
      </div>

      {/* Instrumental Utilizado en la Practica */}
      <div className="flex w-full flex-initial flex-row space-x-4">
        <InstrumentalUtilizado />
      </div>
    </ContenedorPrint>
  );
}
