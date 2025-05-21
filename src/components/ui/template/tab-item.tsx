"use client";

import { cn } from "@/components/utils";
import { type AppRoute } from "@/shared/server-routes";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabItem = ({ subRuta }: { subRuta: AppRoute }) => {
  const pathname = usePathname();

  const hrefSinQueryParams = subRuta.redirectClick ? subRuta.redirectClick : subRuta.href;

  return (
    <Link href={hrefSinQueryParams} key={subRuta.href}>
      <TabsTrigger
        value={subRuta.href}
        className={cn({ "bg-[#FFFFFF]": subRuta.href === pathname }, "rounded-lg px-3 py-1.5 hover:bg-slate-200")}
      >
        {subRuta.label}
      </TabsTrigger>
    </Link>
  );
};
