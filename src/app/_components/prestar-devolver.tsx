"use client";

import { Button } from "@/components/ui";
import { HandHelping, Handshake, RotateCw } from "lucide-react";

export const PrestarButton = () => {
  return (
    <Button
      title="Prestar"
      variant="default"
      color="primary"
      size="xs"
      className="min-w-28 border-none bg-[#E6F6F1] hover:bg-[#00A873]/40"
    >
      <div className="flex flex-row gap-x-2 text-[#00A873]">
        <HandHelping size={16} className="ml-2" />
        Prestar
      </div>
    </Button>
  );
};

export const DevolverButton = () => {
  return (
    <Button
      title="Prestar"
      variant="default"
      color="primary"
      size="xs"
      className="min-w-28 border-none bg-[#F3F4FE] hover:bg-[#0E22F1]/40"
    >
      <div className="flex flex-row gap-x-2 text-[#0E22F1]">
        <Handshake size={16} className="ml-2" />
        Devolver
      </div>
    </Button>
  );
};

export const RenovarButton = () => {
  return (
    <Button
      title="Renovar"
      variant="default"
      color="primary"
      size="xs"
      className="min-w-28 border-none bg-[#E6F6F1] hover:bg-[#00A873]/40"
    >
      <div className="flex flex-row gap-x-2 text-[#00A873]">
        <RotateCw size={16} className="ml-2" />
        Renovar
      </div>
    </Button>
  );
};
