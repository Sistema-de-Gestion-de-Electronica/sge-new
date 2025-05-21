"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/components/utils";
import { type AppRoute } from "@/shared/server-routes";

export const NavbarItem = ({ item }: { item: AppRoute }) => {
  const pathname = usePathname();
  const isCurrent = item.href.split("/")[1] === pathname.split("/")[1] && !item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      aria-current={isCurrent ? "page" : undefined}
      target={!!item.esExterna ? "_blank" : undefined}
      prefetch
      className={cn(
        isCurrent ? "bg-slate-100 text-black" : "text-gray-300 hover:bg-slate-50 hover:text-black",
        "rounded-md px-3 py-2 text-sm font-medium",
      )}
    >
      {item.label}
    </Link>
  );
};
