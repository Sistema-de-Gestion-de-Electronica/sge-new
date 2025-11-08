import { type InscripcionEspecialData } from "@/app/inscripciones_especiales/_components/inscripcionEspecialData";
import { getStatusText, InscripcionEspecialEstatus } from "@/app/_components/badge-estatus-inscripcion-especial";

export const exportInscripcionesEspecialesToExcel = (
  data: InscripcionEspecialData[],
  filename = "inscripciones_especiales",
) => {
  const headers = [
    "Nº Solicitud",
    "Fecha Solicitud",
    "Caso",
    "Materias",
    "Materias Adeudadas",
    "Solicitante",
    "Legajo",
    "Email",
    "Justificación",
    "Detalles de alternativas",
    "Turno Alternativa 1",
    "Turno Alternativa 2",
    "Estado",
    "Contactado",
    "Asistio",
    "Comentarios",
    "Fecha Respuesta",
  ];

  const rows: (string | number | boolean)[][] = data.map((inscripcion) => [
    inscripcion.id,
    inscripcion.fechaSolicitud,
    inscripcion.caso,
    inscripcion.materias.join(", "),
    inscripcion.materiasAdeudadas.join(", "),
    `${inscripcion.solicitante.apellido ?? ""} ${inscripcion.solicitante.nombre ?? ""}`,
    inscripcion.solicitante.legajo ?? "",
    inscripcion.solicitante.email ?? "",
    inscripcion.justificacion ?? "",
    inscripcion.detallesPreferenciasHorario ?? "",
    inscripcion.turnoAlternativa1 ?? "",
    inscripcion.turnoAlternativa2 ?? "",
    getStatusText(inscripcion.estado as InscripcionEspecialEstatus),
    inscripcion.fueContactado ?? false,
    inscripcion.vinoPresencialmente ?? false,
    inscripcion.respuesta ?? "Sin respuesta",
    inscripcion.fechaRespuesta ?? "Sin fecha",
  ]);

  const xmlEscape = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const workbookXml = `<?xml version="1.0"?>
    <?mso-application progid="Excel.Sheet"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
              xmlns:o="urn:schemas-microsoft-com:office:office"
              xmlns:x="urn:schemas-microsoft-com:office:excel"
              xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
              xmlns:html="http://www.w3.org/TR/REC-html40">
      <Worksheet ss:Name="Inscripciones">
        <Table>
          ${
            // Header row
            `<Row>${headers.map((h) => `<Cell><Data ss:Type="String">${xmlEscape(h)}</Data></Cell>`).join("")}</Row>`
          }
          ${
            // Data rows
            rows
              .map(
                (row) =>
                  `<Row>${row
                    .map((cell) => {
                      const isNumber = typeof cell === "number" && isFinite(cell);
                      const isBoolean = typeof cell === "boolean";
                      const type = isNumber ? "Number" : isBoolean ? "String" : "String";
                      const displayValue = isBoolean ? (cell ? "Sí" : "No") : cell;
                      const value = xmlEscape(displayValue);
                      return `<Cell><Data ss:Type="${type}">${value}</Data></Cell>`;
                    })
                    .join("")}</Row>`,
              )
              .join("")
          }
        </Table>
      </Worksheet>
    </Workbook>`;

  const blob = new Blob([workbookXml], { type: "application/vnd.ms-excel" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split("T")[0]}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
