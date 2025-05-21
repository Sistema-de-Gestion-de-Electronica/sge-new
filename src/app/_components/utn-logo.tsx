"use client";

import { cn } from "@/components/utils";
import Image from "next/image";

export const UTNLogo = ({ className }: { className?: string }) => (
  <Image
    src={"/utn-logo.svg"}
    alt={"Logo UTN"}
    className={cn("h-9 w-auto", className)}
    width={32}
    height={32}
    color="white"
    priority
  />
);

export const LinuxLogo = ({ className }: { className?: string }) => (
  <Image
    src={"/linux-logo.svg"}
    alt={"Logo Linux"}
    className={cn("h-9 w-auto", className)}
    width={32}
    height={32}
    color="white"
  />
);

export const WindowsLogo = ({ className }: { className?: string }) => (
  <Image
    src={"/windows-logo.svg"}
    alt={"Logo Windows"}
    className={cn("h-9 w-auto", className)}
    width={32}
    height={32}
    color="white"
  />
);
