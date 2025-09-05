"use client";

import { useEffect, useState } from "react";

type Props = {
  file: string;               // URL del PDF
  height?: number | string;   // alto opcional
  className?: string;
  onLoadingChange?: (loading: boolean) => void; // opcional para avisar al padre
};

export default function PdfIframeViewer({
  file,
  height = "80vh",
  className = "",
  onLoadingChange,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // cuando cambia la URL del PDF, vuelve a "cargando"
    setLoaded(false);
    onLoadingChange?.(true);
  }, [file, onLoadingChange]);

  const handleLoad = () => {
    setLoaded(true);
    onLoadingChange?.(false);
  };

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      {/* IFRAME — lo ocultamos hasta que cargue */}
      <iframe
        key={file} // fuerza el remount al cambiar la URL
        src={file}
        title="Acta PDF"
        onLoad={handleLoad}
        className={`h-full w-full rounded border transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay de carga */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/70">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          <span className="text-sm text-gray-700">Cargando acta…</span>
        </div>
      )}
    </div>
  );
}
