"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type GroupingState,
  useReactTable,
  type Column,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  getGroupedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

import { cn } from "@/components/utils";
import { DataTablePagination, type PaginationConfig } from "./table-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Button } from "../button";

interface DataTableProps<TData> {
  manualSorting?: boolean;
  manualPagination?: boolean;
  pageSize?: number;
  pageIndex?: number;
  rowCount?: number;
  columns: ColumnDef<TData>[];
  data: TData[];
  onRowClick?: (row: Row<TData>) => void;
  paginationConfig?: PaginationConfig;
  config?: Config;
  action?: {
    header?: string;
    classNames?: string;
    cell?: (row: Row<TData>) => ReactNode;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: (row: TData) => any;
  grouping?: GroupingState;
  setGrouping?: OnChangeFn<GroupingState>;
}

const getAlignment = (align?: string) => {
  switch (align) {
    case "center":
      return cn("text-center");
    case "right":
      return cn("text-right");
  }
  return cn("text-left");
};

type Meta = {
  header?: {
    align?: "left" | "center" | "right";
    hideSort?: boolean;
    className?: string;
  };
  cell?: {
    align?: "left" | "center" | "right";
    className?: string;
  };
};

type Config = {
  containerClass?: string;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  rowSelection?: Record<number, boolean>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  emptyComponent?: React.ReactNode;
  isLoading?: boolean;
};

const getMeta = <T,>(column: Column<T, unknown>): Meta | null => {
  const meta = column.columnDef.meta;
  if (!meta) null;
  return meta as Meta;
};

export function DataTable<T>({
  data,
  paginationConfig,
  onRowClick,
  config,
  action,
  manualSorting,
  manualPagination,
  pageSize,
  pageIndex,
  rowCount,
  getRowId,
  grouping,
  setGrouping,
  ...props
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: pageSize ?? 10,
    pageIndex: pageIndex ?? 0,
  });

  const columns = useMemo(() => {
    return action
      ? [
          ...props.columns,
          {
            id: "action",
            header: () => action?.header ?? null,
            cell: ({ row }) => {
              return <div className="flex items-center justify-end space-x-2">{action?.cell?.(row)}</div>;
            },
          },
        ]
      : props.columns;
  }, [props.columns, action]);

  const table = useReactTable({
    getRowId: getRowId ?? undefined,
    data,
    columns,
    enableRowSelection: true,
    manualSorting,
    manualPagination,
    rowCount,
    onRowSelectionChange: config?.onRowSelectionChange ?? setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginationConfig ? getPaginationRowModel() : undefined,
    getGroupedRowModel: grouping ? getGroupedRowModel() : undefined,
    getExpandedRowModel: grouping ? getExpandedRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: config?.onSortingChange ?? setSorting,
    onPaginationChange: config?.onPaginationChange ?? setPagination,
    onGroupingChange: setGrouping,
    state: {
      rowSelection: config?.rowSelection ?? rowSelection,
      sorting: config?.sorting ?? sorting,
      pagination,
      grouping,
    },
    initialState: {
      expanded: true,
    },
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full flex-row justify-center">
      <div className="flex max-h-[64vh] min-w-[60vw] flex-col">
        <Table containerClass={config?.containerClass}>
          <TableHeader className="sticky top-0 z-30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="sticky -top-6 ">
                {headerGroup.headers.map((header, index) => {
                  const { column } = header;
                  const sortDir = column.getIsSorted();
                  const meta = getMeta(column);
                  const alignment = getAlignment(meta?.header?.align);
                  const headerValue = flexRender(column.columnDef.header, header.getContext());
                  return (
                    <TableHead key={header.id} className={cn("px-1", alignment)}>
                      {index === 0 && table.getCanSomeRowsExpand() && (
                        <Button
                          variant={"default"}
                          color={"white"}
                          type="button"
                          size={"sm"}
                          className="w-8 px-1 py-0"
                          onClick={table.getToggleAllRowsExpandedHandler()}
                          title={table.getIsAllRowsExpanded() ? "Agrupar todas" : "Mostrar todas"}
                        >
                          <ChevronDown
                            className={cn("flex-shrink-0 transition duration-200", {
                              "-rotate-90": !table.getIsAllRowsExpanded(),
                            })}
                            size={15}
                            strokeWidth={2}
                          />
                        </Button>
                      )}
                      {header.isPlaceholder || !column.columnDef.header || header.id === "action" ? null : (
                        <div
                          className={cn(
                            "inline-flex h-8 cursor-pointer items-center rounded px-0",
                            meta?.header?.className,
                            {
                              "-translate-x-2": meta?.header?.align === "left",
                              "translate-x-2": meta?.header?.align === "right",
                            },
                          )}
                          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                          {headerValue}
                          <div className={cn("flex h-6 flex-col", meta?.header?.hideSort && "hidden")}>
                            <ChevronUp
                              className={cn("w-3 translate-y-[2px] opacity-50", sortDir === "asc" && "opacity-100")}
                            />
                            <ChevronDown
                              className={cn("w-3 -translate-y-[2px] opacity-50", sortDir === "desc" && "opacity-100")}
                            />
                          </div>
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowCount() > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={
                    (onRowClick ?? row.getIsGrouped())
                      ? () => {
                          if (onRowClick) {
                            onRowClick(row);
                          }

                          if (row.getIsGrouped()) {
                            row.getToggleExpandedHandler()();
                          }
                        }
                      : undefined
                  }
                  className={cn({
                    "bg-slate-100": index % 2 === 0 && !row.getIsGrouped(), // Color default para todas las rows que solo son hijos
                    "bg-slate-200 hover:bg-slate-400": row.getIsGrouped() && row.parentId === undefined, // Color para las rows de primer nivel que son grupos
                    "bg-slate-300 hover:bg-slate-400": row.getIsGrouped() && row.parentId !== undefined, // Color para las rows de segundo nivel que son grupos
                  })}
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = getMeta(cell.column);
                    const alignment = getAlignment(meta?.cell?.align);

                    const isGrouped = cell.getIsGrouped();
                    const isAggregated = cell.getIsAggregated();
                    const isPlaceholder = cell.getIsPlaceholder();

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(`px-0 py-1 first:pl-1 last:pr-1`, alignment, meta?.cell?.className)}
                      >
                        {isGrouped ? (
                          <div className="flex h-8 flex-row items-center gap-1 text-center">
                            <span className="absolute flex flex-row items-center gap-1 text-center font-bold">
                              <ChevronDown
                                className={cn("flex-shrink-0 transition duration-200", {
                                  "-rotate-90": !row.getIsExpanded(),
                                })}
                                size={15}
                                strokeWidth={2}
                              />
                              {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
                            </span>
                          </div>
                        ) : isAggregated ? null : isPlaceholder ? null : ( // ) //   cell.getContext(), //   cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, // flexRender(
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {config?.isLoading ? (
                    <div className="mx-auto flex w-min items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Cargando...</span>
                    </div>
                  ) : config?.emptyComponent ? (
                    config.emptyComponent
                  ) : (
                    "Sin resultados."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {paginationConfig && <DataTablePagination table={table} config={paginationConfig} />}
      </div>
    </div>
  );
}
