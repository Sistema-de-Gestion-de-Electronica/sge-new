"use server";

import type { AppRoute } from "@/shared/server-routes";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { TabItem } from "./tab-item";
import { TabTitle } from "./tab-title";
import { api } from "@/trpc/server";

type PageLayoutProps = {
  route: AppRoute;
  buttons?: React.ReactNode;
  children: React.ReactNode;
};

export default async function PageLayout({ route, buttons, children }: PageLayoutProps) {
  const subRutasVisibles = await api.application.getNavbarChildren({
    subRutas: route.subRutas ?? [],
  });

  return (
    <>
      <header className="top-[calc(4rem_+_1px)] z-40 overflow-x-auto border-b border-slate-200 bg-white">
        <div className="mx-auto flex flex-col justify-between px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
          <div className="flex flex-col items-start lg:flex-row lg:items-center">
            <TabTitle route={route} />

            <Tabs defaultValue="" className="hidden space-x-8 rounded-lg bg-[#F1F5F9] p-2 text-sm lg:flex">
              <TabsList className="flex w-full flex-row gap-x-4">
                {subRutasVisibles.map((subRuta) => (
                  <TabItem key={subRuta.href} subRuta={subRuta} />
                ))}
              </TabsList>
            </Tabs>
          </div>
          {buttons && <div className="mt-4 flex gap-x-2 p-2 lg:mt-0">{buttons}</div>}
        </div>
      </header>
      <div className="mx-auto w-full space-y-6 px-4 py-6 pb-10 sm:px-6 lg:px-8">{children}</div>
    </>
  );
}
