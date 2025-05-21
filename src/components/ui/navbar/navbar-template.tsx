import React from "react";
import type { AppRoute } from "@/shared/server-routes";
import { Tab2Level } from "./tabs";

type PageLayoutProps = {
  title: string;
  routes: AppRoute[];
  buttons?: React.ReactNode;
  children: React.ReactNode;
};

export default function PageLayout({ title, routes, buttons, children }: PageLayoutProps) {
  return (
    <>
      <header className="border-b border-slate-200">
        <div className="mx-auto flex flex-col justify-between px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <div className="flex flex-col items-center lg:flex-row">
            <h1 className="text-gray-90 mr-8 truncate border-r border-slate-200 pr-8 text-3xl font-bold tracking-tight">
              {title}
            </h1>
            <nav className="flex space-x-8">
              <Tab2Level routes={routes} />
            </nav>
          </div>
          <div className="flex flex-col gap-y-2">{buttons ?? null}</div>
        </div>
      </header>
      <div className="mx-auto w-full space-y-6 px-4 py-6 pb-10 sm:px-6 lg:px-8">{children}</div>
    </>
  );
}
