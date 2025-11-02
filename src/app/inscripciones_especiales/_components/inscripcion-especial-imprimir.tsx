import { api } from "@/trpc/react";
import { useMemo } from "react";

interface Props {
  inscripcionEspecial: any;
}

export default function PrintInscripcionEspecial({ inscripcionEspecial }: Props) {
  // Obtener la URL base para la imagen
  const imageUrl = typeof window !== "undefined" ? `${window.location.origin}/utn-dpto-elec.png` : "/utn-dpto-elec.svg";

  // Obtener los IDs de cursos únicos
  const cursoIds = useMemo(() => {
    const ids = (inscripcionEspecial?.cursos ?? []).filter((id: number) => id && id > 0) as number[];
    return [...new Set(ids)];
  }, [inscripcionEspecial?.cursos]);

  const { data: todosLosCursosData } = api.cursos.getAll.useQuery({
    filtrByActivo: "true",
  });

  // Crear un mapa de cursoId -> nombre de división
  const divisionesMap = useMemo(() => {
    const map = new Map<number, string>();
    if (todosLosCursosData?.cursos) {
      todosLosCursosData.cursos.forEach((curso: any) => {
        if (cursoIds.includes(curso.id) && curso.division?.nombre) {
          map.set(curso.id, curso.division.nombre);
        }
      });
    }
    return map;
  }, [todosLosCursosData, cursoIds]);

  return (
    <div className="hidden print:block">
      <div
        id="print-inscripcion-especial"
        className="mx-auto my-8 flex min-h-[90vh] max-w-[800px] flex-col justify-between bg-white p-12 text-black shadow-sm"
      >
        {/* Encabezado */}
        <header className="flex items-center justify-between border-b-2 border-gray-300 pb-3">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-[#002b5c]">ORDEN de INSCRIPCIÓN a ASIGNATURAS</h1>
            <p className="mt-1 text-sm">
              <span className="font-semibold">Caso de pedido:</span> {inscripcionEspecial?.caso ?? "—"}
            </p>
          </div>

          <img src={imageUrl} alt="UTN.BA Ingeniería Electrónica" width={200} height={110} className="object-contain" />
        </header>

        {/* Datos principales */}
        <section className="mt-4 text-sm">
          <div className="flex flex-wrap justify-between">
            <p>
              <span className="font-semibold">N° LEGAJO:</span>{" "}
              <span className="text-blue-700 underline">{inscripcionEspecial?.solicitante?.legajo ?? "—"}</span>
            </p>
            <p>
              <span className="font-semibold">FECHA: </span>
              {(() => {
                const d = new Date();
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
              })()}
            </p>
          </div>
          <p className="mt-1">
            <span className="font-semibold">Apellido/s y Nombre/s:</span>{" "}
            <span className="text-blue-700">
              {inscripcionEspecial?.solicitante?.apellido} {inscripcionEspecial?.solicitante?.nombre}
            </span>
          </p>
        </section>

        {/* Turnos */}
        {(inscripcionEspecial?.turnoAlternativa1 || inscripcionEspecial?.turnoAlternativa2) && (
          <section className="mt-5 space-y-1 text-sm">
            {inscripcionEspecial?.turnoAlternativa1 && (
              <p>
                <span className="font-semibold">Turnos primera alternativa:</span>{" "}
                {inscripcionEspecial.turnoAlternativa1}
              </p>
            )}
            {inscripcionEspecial?.turnoAlternativa2 && (
              <p>
                <span className="font-semibold">Turnos segunda alternativa:</span>{" "}
                {inscripcionEspecial.turnoAlternativa2}
              </p>
            )}
          </section>
        )}

        {/* Tabla */}
        <section className="mt-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-[13px]">
                <th className="w-[28%] border px-2 py-1">Materia</th>
                <th className="w-[26%] border px-2 py-1">Justificación</th>
                <th className="w-[26%] border px-2 py-1">Materias Adeudadas</th>
                <th className="w-[10%] border px-2 py-1">Curso</th>
              </tr>
            </thead>
            <tbody>
              {(inscripcionEspecial?.materias ?? []).map((materia: string, index: number) => {
                const cursoId = inscripcionEspecial?.cursos?.[index];
                const nombreDivision = cursoId ? (divisionesMap.get(cursoId) ?? "—") : "—";
                return (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1">{materia}</td>
                    <td className="border px-2 py-1">{inscripcionEspecial?.justificacion ?? "—"}</td>
                    <td className="border px-2 py-1">
                      {(inscripcionEspecial?.materiasAdeudadas ?? []).join(", ") || "—"}
                    </td>
                    <td className="border px-2 py-1">{nombreDivision}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Pasos */}
        <section className="mt-6 space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <div className="rounded bg-black px-2 py-[2px] text-xs font-semibold text-white">Paso 1</div>
            <p>Resolver y acordar la inscripción en el Departamento de Ing. Electrónica.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="rounded bg-black px-2 py-[2px] text-xs font-semibold text-white">Paso 2</div>
            <p>Oficina 309 (Dirección de Gestión Académica)</p>
          </div>
        </section>

        {/* Firmas */}
        <footer className="mt-12">
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="flex flex-col items-center">
              <div className="mt-12 w-full border-b-2 border-black" />
              <p className="mt-2 text-center text-sm">Firma y sello Departamento</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mt-12 w-full border-b-2 border-black" />
              <p className="mt-2 text-center text-sm">Firma conformidad alumna/o</p>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-gray-600">
            La simple confección del presente formulario NO CONSTITUYE condición de inscripción.
          </p>
        </footer>
      </div>
    </div>
  );
}
