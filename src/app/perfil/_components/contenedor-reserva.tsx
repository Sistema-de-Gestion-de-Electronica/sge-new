"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { BeakerIcon, BookIcon, BoxIcon } from "lucide-react";
import { api } from "@/trpc/react";
import DetalleReserva from "./detalle-reserva";
import type { RouterOutputs } from "@/trpc/react";
import { getFechaHumanoDDMMYYYY, getTimeISOString } from "@/shared/get-date";
import { cn } from "@/components/utils";
import {
  BadgeReservaPasadaEquipo,
  BadgeReservaPasadaLaboratorioAbierto,
  BadgeReservaPasadaLaboratorioCerrado,
  BadgeReservaPasadaLibro,
} from "./badge-reservas";

type UsuarioData = RouterOutputs["admin"]["usuarios"]["getUsuarioPorId"];

type ClienteContenedorUsuarioProps = {
  usuarioData: UsuarioData;
};

export default function ContenedorReserva({ usuarioData }: ClienteContenedorUsuarioProps) {
  const [activeTab, setActiveTab] = useState<"libros" | "inventario" | "laboratorio abierto" | "laboratorio cerrado">(
    "libros",
  );

  if (!usuarioData) {
    return <div>Usuario no encontrado</div>;
  }

  const { data: reservasLibros, isLoading: isLoadingLibros } =
    api.reservas.reservaBiblioteca.getReservaPorUser.useQuery(
      { id: usuarioData.id },
      {
        enabled: activeTab === "libros",
      },
    );

  const { data: reservasInventario, isLoading: isLoadingInventario } =
    api.reservas.reservaEquipo.getReservaPorUser.useQuery(
      { id: usuarioData.id },
      {
        enabled: activeTab === "inventario",
      },
    );

  const { data: reservasLaboratorioAbierto, isLoading: isLoadingLaboratorioAbierto } =
    api.reservas.reservaLaboratorioAbierto.getReservaPorUser.useQuery(
      { id: usuarioData.id },
      {
        enabled: activeTab === "laboratorio abierto",
      },
    );

  const { data: reservasLaboratorioCerrado, isLoading: isLoadingLaboratorioCerrado } =
    api.reservas.reservarLaboratorioCerrado.getReservaPorUser.useQuery(
      { id: usuarioData.id },
      {
        enabled: activeTab === "laboratorio cerrado",
      },
    );

  return (
    <div className="border-b border-slate-200">
      <div className="mx-auto flex flex-col justify-between px-4 py-6 ">
        <Tabs
          defaultValue="libros"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as typeof activeTab)}
          className="flex w-full flex-col rounded-lg bg-[#F1F5F9] text-sm"
        >
          <TabsList className="grid w-full grid-cols-2 gap-4 p-4 sm:flex sm:flex-row">
            <TabsTrigger
              value="libros"
              className={cn(
                { "bg-[#FFFFFF]": activeTab === "libros" },
                "m-auto flex w-full items-center justify-center rounded-lg px-3 py-1.5 hover:bg-slate-200",
              )}
            >
              <BookIcon className="mr-2 h-4 w-4" />
              Libros
            </TabsTrigger>
            <TabsTrigger
              value="inventario"
              className={cn(
                { "bg-[#FFFFFF]": activeTab === "inventario" },
                "m-auto flex w-full items-center justify-center rounded-lg px-3 py-1.5 hover:bg-slate-200",
              )}
            >
              <BoxIcon className="mr-2 h-4 w-4" />
              Inventario
            </TabsTrigger>
            <TabsTrigger
              value="laboratorio abierto"
              className={cn(
                { "bg-[#FFFFFF]": activeTab === "laboratorio abierto" },
                "m-auto flex w-full items-center justify-center rounded-lg px-3 py-1.5 hover:bg-slate-200",
              )}
            >
              <BeakerIcon className="mr-2 h-4 w-4" />
              Laboratorio abierto
            </TabsTrigger>
            <TabsTrigger
              value="laboratorio cerrado"
              className={cn(
                { "bg-[#FFFFFF]": activeTab === "laboratorio cerrado" },
                "m-auto flex w-full items-center justify-center rounded-lg px-3 py-1.5 hover:bg-slate-200",
              )}
            >
              <BeakerIcon className="mr-2 h-4 w-4" />
              Laboratorio cerrado
            </TabsTrigger>
          </TabsList>
          <TabsContent value="libros">
            {isLoadingLibros ? (
              <div>Cargando reservas de libros...</div>
            ) : (
              <DetalleReserva
                idUsuario={usuarioData.id}
                titulo="Reserva de Libros"
                descripcion="Historial de Libros"
                reservas={reservasLibros ?? []}
                columns={[
                  { header: "ID", key: "id", className: "w-[100px]" },
                  { header: "Fecha de préstamo", key: (item) => getFechaHumanoDDMMYYYY(item.fechaCreacion) },
                  { header: "Libro", key: (item) => item.libro?.titulo },
                  {
                    header: "Estado",
                    key: (item) => <BadgeReservaPasadaLibro estatus={item.reserva.estatus} />,
                    className: "text-right",
                  },
                ]}
              />
            )}
          </TabsContent>
          <TabsContent value="inventario">
            {isLoadingInventario ? (
              <div>Cargando reservas de inventario...</div>
            ) : (
              <DetalleReserva
                idUsuario={usuarioData.id}
                titulo="Reserva de Inventario"
                descripcion="Historial de Inventarios"
                reservas={reservasInventario ?? []}
                columns={[
                  { header: "ID", key: "id", className: "w-[100px]" },
                  { header: "Fecha de préstamo", key: (item) => getFechaHumanoDDMMYYYY(item.fechaCreacion) },
                  { header: "Nombre", key: (item) => item.equipo.modelo },
                  { header: "Marca", key: (item) => item.equipo.marca.nombre },
                  {
                    header: "Estado",
                    key: (item) => <BadgeReservaPasadaEquipo estatus={item.reserva.estatus} />,
                    className: "text-right",
                  },
                ]}
              />
            )}
          </TabsContent>
          <TabsContent value="laboratorio abierto">
            {isLoadingLaboratorioAbierto ? (
              <div>Cargando reservas de laboratorio abierto...</div>
            ) : (
              <DetalleReserva
                idUsuario={usuarioData.id}
                titulo="Reserva de Laboratorio abierto"
                descripcion="Historial de Reservas de Laboratorios abiertos"
                reservas={reservasLaboratorioAbierto ?? []}
                columns={[
                  { header: "ID", key: "id", className: "w-[100px]" },
                  {
                    header: "Fecha Solicitud Reserva",
                    key: (item) => getFechaHumanoDDMMYYYY(item.fechaCreacion),
                  },
                  {
                    header: "Hora Inicio",
                    key: (item) => getTimeISOString(item.reserva.fechaHoraInicio),
                  },
                  {
                    header: "Hora Fin",
                    key: (item) => getTimeISOString(item.reserva.fechaHoraFin),
                  },
                  { header: "Laboratorio", key: (item) => item.laboratorio?.nombre ?? "" },
                  {
                    header: "Estado",
                    key: (item) => <BadgeReservaPasadaLaboratorioAbierto estatus={item.reserva.estatus} />,
                    className: "text-right",
                  },
                ]}
              />
            )}
          </TabsContent>
          <TabsContent value="laboratorio cerrado">
            {isLoadingLaboratorioCerrado ? (
              <div>Cargando reservas de laboratorio...</div>
            ) : (
              <DetalleReserva
                idUsuario={usuarioData.id}
                titulo="Reserva de Laboratorio"
                descripcion="Historial de Reservas de Laboratorios"
                reservas={reservasLaboratorioCerrado ?? []}
                columns={[
                  { header: "ID", key: "id", className: "w-[100px]" },
                  {
                    header: "Fecha Solicitud Reserva",
                    key: (item) => getFechaHumanoDDMMYYYY(item.fechaCreacion),
                  },
                  {
                    header: "Hora Inicio",
                    key: (item) => getTimeISOString(item.reserva.fechaHoraInicio),
                  },
                  {
                    header: "Hora Fin",
                    key: (item) => getTimeISOString(item.reserva.fechaHoraFin),
                  },
                  { header: "Laboratorio", key: (item) => item.laboratorio?.nombre ?? "" },
                  {
                    header: "Estado",
                    key: (item) => <BadgeReservaPasadaLaboratorioCerrado estatus={item.reserva.estatus} />,
                    className: "text-right",
                  },
                ]}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
