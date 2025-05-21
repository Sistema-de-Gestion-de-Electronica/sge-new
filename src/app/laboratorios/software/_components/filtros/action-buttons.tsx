import { type inputGetSoftwareFilter } from "@/shared/filters/laboratorio-filter.schema";
import { type z } from "zod";
import { SoftwareFilterText } from "./software-filter-text";
import { SoftwareFilterSede } from "./software-filter-sede";

type SoftwareFilters = z.infer<typeof inputGetSoftwareFilter>;

type ActionButtonsProps = {
  filters: SoftwareFilters;
};

export const ActionButtons = ({ filters }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-3 md:flex-row md:space-x-1.5 md:space-y-0">
      <div className="w-full space-y-3 sm:flex sm:flex-row sm:space-x-3 sm:space-y-0 md:basis-1/2">
        <div className="md:basis-1/2">
          <SoftwareFilterText filters={filters} />
        </div>
        <div className="md:basis-1/2">
          <SoftwareFilterSede filters={filters} />
        </div>
      </div>
    </div>
  );
};
