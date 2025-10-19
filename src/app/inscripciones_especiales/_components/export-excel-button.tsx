"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportInscripcionesEspecialesToExcel } from "@/utils/exportToExcel";
import { type InscripcionEspecialData } from "./inscripcionEspecialData";

interface ExportExcelButtonProps {
  data: InscripcionEspecialData[];
  filename?: string;
  disabled?: boolean;
}

export const ExportExcelButton = ({
  data,
  filename = "inscripciones_especiales",
  disabled = false,
}: ExportExcelButtonProps) => {
  const handleExport = () => {
    if (data.length === 0) {
      return;
    }
    exportInscripcionesEspecialesToExcel(data, filename);
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || data.length === 0}
      variant="default"
      size="sm"
      className="flex items-center gap-2 border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100"
    >
      <Download className="h-4 w-4" />
      Exportar CSV
    </Button>
  );
};
