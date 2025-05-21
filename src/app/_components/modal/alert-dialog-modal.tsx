"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { type ModalDrawerProps } from "./modal-drawer";
import { X } from "lucide-react";

export const AlertDialogModalDrawer = ({
  open,
  titulo,
  description,
  cancelText,
  submitText,
  trigger,
  onSubmit,
  onCancel,
  children,
  onOpenChange,
  className,
  esEliminar,
}: ModalDrawerProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogTitle>{titulo}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <div className="text-[#64748B]">{children}</div>
        <AlertDialogFooter>
          {onCancel && (
            <AlertDialogCancel
              className={"border border-[#E4E3E3] bg-transparent hover:bg-[#E4E3E3]"}
              onClick={onCancel}
            >
              {cancelText ?? "Cancelar"}
            </AlertDialogCancel>
          )}
          {onSubmit && (
            <AlertDialogAction
              onClick={onSubmit}
              className={esEliminar ? "border-none bg-danger text-white hover:bg-danger/80" : "bg-primary"}
            >
              {submitText ?? "Aceptar"}
            </AlertDialogAction>
          )}
          <div
            onClick={onCancel}
            className="data-[state=open]:bg-accent absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
