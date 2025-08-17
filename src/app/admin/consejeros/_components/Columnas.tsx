import { Badge } from "@/components/ui/badge";
import { type ColumnDef, type SortingState } from "@tanstack/react-table";
import { ValorVoto, VotoActa } from "./TypeVotoActa";


const VALOR_LABEL: Record<ValorVoto, string> = {
  ACUERDO: "De acuerdo",
  DESACUERDO: "En desacuerdo",
  PARCIAL: "Acuerdo parcial",
};

const ValorBadge: React.FC<{ valor: ValorVoto }> = ({ valor }) => {
  const label = VALOR_LABEL[valor];
  const tone =
    valor === "ACUERDO" ? "bg-green-100 text-green-800 border-green-300" :
    valor === "DESACUERDO" ? "bg-red-100 text-red-800 border-red-300" :
    "bg-amber-100 text-amber-800 border-amber-300";

  return <Badge className={`border ${tone} font-medium`}>{label}</Badge>;
};

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
      sortingFn: (a, b) => a.original.valor.localeCompare(b.original.valor),
      cell: ({ row }) => <ValorBadge valor={row.original.valor} />,
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
      accessorKey: "fecha",
      header: "Fecha",
      sortingFn: (a, b) => new Date(a.original.fecha).getTime() - new Date(b.original.fecha).getTime(),
      cell: ({ row }) => {
        const d = new Date(row.original.fecha);
        const formatted = new Intl.DateTimeFormat("es-AR", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(d);
        return <time dateTime={row.original.fecha}>{formatted}</time>;
      },
    },
  ];
}