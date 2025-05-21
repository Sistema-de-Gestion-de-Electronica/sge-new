"use client";

import { Input } from "@/components/ui";
import { SearchIcon } from "lucide-react";
import { type z } from "zod";
import { useState } from "react";
import { type inputGetAllPrestamosLibros } from "@/shared/filters/reservas-filter.schema";
import { useBibliotecaPrestamosQueryParam } from "../../_hooks/use-biblioteca-prestamo-query-param";

type BibliotecaPrestamoFilters = z.infer<typeof inputGetAllPrestamosLibros>;

type Props = {
  filters: BibliotecaPrestamoFilters;
};

export const BibliotecaPrestamoFilterText = ({ filters }: Props) => {
  const { searchText, onSearchTextChange } = useBibliotecaPrestamosQueryParam(filters);

  const [currentSearchText, setCurrentSearchText] = useState(searchText);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setCurrentSearchText(e.target.value);

    if (!e.target.value) onSearchTextChange("");
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onSearchTextChange("");
    }

    if (e.key === "Enter") {
      onSearchTextChange(currentSearchText);
    }
  };

  const onClickIcon = () => {
    onSearchTextChange(currentSearchText);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full">
      <Input
        placeholder={"Buscar por título o inventario"}
        name="searchText"
        unit={<SearchIcon className="text-sub relative top-0.5 h-4 w-4" onClick={onClickIcon} />}
        type={"search"}
        value={currentSearchText}
        onChange={handleTextChange}
        onKeyUp={handleKeyUp}
        autoFocus
      />
    </form>
  );
};
