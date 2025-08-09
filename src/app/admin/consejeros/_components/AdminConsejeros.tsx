"use client";

import ClientDateModalPicker from "./ClientDateSection";
import CargarActa from "./UploadActa"

export function AdminConsejeros(){
    return (
        <form className="space-y-6">
            <div className="flex flex-col gap-3 flex-wrap mb-6 items-center justify-center">
                <h1 className="text-gray-90 text-center mr-8 truncate border-r border-slate-200 pr-8 text-2xl font-bold tracking-tight">
                    Seleccionar fecha para la proxima reunión
                </h1>
                <ClientDateModalPicker />
            </div>
            <div className="flex flex-col gap-3 flex-wrap mb-6 items-center justify-center">
                <h1 className="text-gray-90 text-center mr-8 truncate border-r border-slate-200 pr-8 text-2xl font-bold tracking-tight">
                    Cargar Acta
                </h1>
                <CargarActa />
            </div>
        </form>
    )
}