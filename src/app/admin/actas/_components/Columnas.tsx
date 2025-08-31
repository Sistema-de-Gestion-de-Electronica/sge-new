import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";

// =====================
// Tipos (alineados al back)
// =====================
export type ValorVoto = "ACUERDO" | "DESACUERDO" | "PARCIAL";

export type VotoActa = {
  id: number;
  actaId: number;
  consejeroId: string;
  persona: string;
  posicion: ValorVoto;            // <- viene como "posicion" del back
  comentario?: string | null;
  fechaEmision: string;           // <- timestamp del back (ideal ISO)
};

// =====================
// UI helpers
// =====================
const VALOR_LABEL: Record<ValorVoto, string> = {
  ACUERDO: "De acuerdo",
  DESACUERDO: "En desacuerdo",
  PARCIAL: "Acuerdo parcial",
};

const ValorBadge: React.FC<{ valor: ValorVoto }> = ({ valor }) => {
  const label = VALOR_LABEL[valor];
  const tone =
    valor === "ACUERDO"
      ? "bg-green-100 text-green-800 border-green-300"
      : valor === "DESACUERDO"
      ? "bg-red-100 text-red-800 border-red-300"
      : "bg-amber-100 text-amber-800 border-amber-300";

  return <Badge className={`border ${tone} font-medium`}>{label}</Badge>;
};

// =====================
// Date utils
// =====================
type MaybeDateInput = string | number | Date | null | undefined;

const parseSafeDate = (v: MaybeDateInput): Date | null => {
  if (v == null) return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

// =====================
// Columnas
// =====================
export function getColumns(): ColumnDef<VotoActa, any>[] {
  return [
    {
      accessorKey: "persona",
      header: "Persona",
      cell: ({ row }) => (
        <div className="truncate max-w-[260px]" title={row.original.persona}>
          {row.original.persona}
        </div>
      ),
    },
    {
      accessorKey: "posicion",
      header: "Posición",
      sortingFn: (a, b) => a.original.posicion.localeCompare(b.original.posicion),
      cell: ({ row }) => <ValorBadge valor={row.original.posicion} />,
    },
    {
      accessorKey: "comentario",
      header: "Comentario",
      cell: ({ row }) => {
        const c = row.original.comentario?.trim();
        return c ? (
          <div className="truncate max-w-[420px]" title={c}>
            {c}
          </div>
        ) : (
          <span className="text-slate-400 italic">Sin comentario</span>
        );
      },
    },
    {
      accessorKey: "fechaEmision",
      header: "Fecha",
      // Los inválidos van al final
      sortingFn: (a, b) => {
        const ta = parseSafeDate(a.original.fechaEmision)?.getTime() ?? Number.POSITIVE_INFINITY;
        const tb = parseSafeDate(b.original.fechaEmision)?.getTime() ?? Number.POSITIVE_INFINITY;
        return ta - tb;
      },
      cell: ({ row }) => {
        const d = parseSafeDate(row.original.fechaEmision);
        if (!d) return <span className="text-slate-400 italic">Fecha inválida</span>;

        const formatted = new Intl.DateTimeFormat("es-AR", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(d);

        return <time dateTime={d.toISOString()}>{formatted}</time>;
      },
    },
  ];
}
