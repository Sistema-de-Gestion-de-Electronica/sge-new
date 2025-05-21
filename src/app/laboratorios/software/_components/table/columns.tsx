import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { LinuxLogo, WindowsLogo } from "@/app/_components/utn-logo";
import { CheckIcon, MinusIcon } from "lucide-react";

type SoftwareData = RouterOutputs["software"]["getAll"]["software"][number];
type LaboratorioData = RouterOutputs["software"]["getAll"]["laboratorios"];

export const getColumns = (laboratorios: LaboratorioData) => {
  const colHelper = createColumnHelper<SoftwareData>();

  return [
    colHelper.accessor("nombre", {
      header: "Programa",
    }),
    colHelper.accessor("version", {
      header: "Versión",
    }),
    colHelper.display({
      header: "Sistema Operativo",
      cell: (info) => {
        const linux = info.row.original.linux;
        const windows = info.row.original.windows;

        return (
          <>
            {windows && (
              <Badge color="success">
                <WindowsLogo className="m-auto mr-2 h-4 w-4" />
                Windows
              </Badge>
            )}
            {linux && (
              <Badge color="success">
                <LinuxLogo className="m-auto mr-2 h-4 w-4" />
                Linux
              </Badge>
            )}
          </>
        );
      },
    }),
    colHelper.accessor("estado", {
      header: "Estado",
    }),
    ...laboratorios.map((lab) =>
      colHelper.display({
        header: lab.nombre,
        cell: (info) => {
          const laboratorio = info.row.original.laboratorios[lab.id];

          if (laboratorio) {
            return <Badge key={lab.id} color={"success"} label={<CheckIcon className="text-success" />} />;
          }

          return <MinusIcon className="text-gray-950" />;
        },
        meta: {
          header: {
            hideSort: true,
          },
        },
      }),
    ),
  ] as ColumnDef<SoftwareData>[];
};

export const getColumnsNames = () => {
  return ["Programa", "Versión", "Estado", "Laboratorios"];
};
