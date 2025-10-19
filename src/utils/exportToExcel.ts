import { type InscripcionEspecialData } from "@/app/inscripciones_especiales/_components/inscripcionEspecialData";

export const exportInscripcionesEspecialesToExcel = (
  data: InscripcionEspecialData[],
  filename = "inscripciones_especiales",
) => {
  const headers = [
    "ID",
    "Fecha Solicitud",
    "Caso",
    "Materias",
    "Solicitante",
    "Legajo",
    "Email",
    "Justificación",
    "Turno Alternativa 1",
    "Turno Alternativa 2",
    "Estado",
    "Contactado",
    "Asistio",
    "Respuesta",
    "Fecha Respuesta",
  ];

  const csvData = data.map((inscripcion) => [
    inscripcion.id,
    inscripcion.fechaSolicitud,
    inscripcion.caso,
    inscripcion.materias.join(", "),
    `${inscripcion.solicitante.apellido} ${inscripcion.solicitante.nombre}`,
    inscripcion.solicitante.legajo,
    inscripcion.solicitante.email,
    inscripcion.justificacion,
    inscripcion.turnoAlternativa1,
    inscripcion.turnoAlternativa2,
    inscripcion.estado,
    inscripcion.fueContactado,
    inscripcion.vinoPresencialmente,
    inscripcion.respuesta || "Sin respuesta",
    inscripcion.fechaRespuesta || "Sin fecha",
  ]);

  const escapeCsvValue = (value: string | number | boolean | undefined | null) => {
    if (value === null || value === undefined) return "";
    const stringValue = String(value);
    if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const csvContent = [
    headers.map(escapeCsvValue).join(","),
    ...csvData.map((row) => row.map(escapeCsvValue).join(",")),
  ].join("\n");

  const BOM = "\uFEFF";
  const csvWithBOM = BOM + csvContent;

  const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
