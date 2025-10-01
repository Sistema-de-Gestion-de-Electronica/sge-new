// components/GraciasPorVotar.tsx
"use client";

import { CheckCircle2 } from "lucide-react";

export default function GraciasPorVotar() {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
      <div className="flex flex-col items-center gap-2">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
        <h1 className="text-gray-900 text-center text-2xl font-bold tracking-tight">
          ¡Gracias por votar!
        </h1>
        <p className="text-center antialiased sm:text-md lg:px-28 text-gray-700">
          Tu voto se ha registrado correctamente.
        </p>
      </div>
    </div>
  );
}
