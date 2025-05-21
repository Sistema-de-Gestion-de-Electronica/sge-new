"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type AppRoute } from "@/shared/server-routes";
import { usePathname } from "next/navigation";

export const Tab2Level = ({ routes }: { routes: AppRoute[] }) => {
  const pathname = usePathname();

  return (
    <>
      <Tabs value={pathname}>
        <TabsList className="border-b border-slate-200 bg-gray-50 ">
          {routes.map((subRuta) => (
            <Link key={subRuta.href} href={subRuta.href}>
              <TabsTrigger value={subRuta.href} className="font-medium text-slate-500 hover:text-blue-100">
                {subRuta.label}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
};
