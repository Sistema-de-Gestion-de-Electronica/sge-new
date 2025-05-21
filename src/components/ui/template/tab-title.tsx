"use client";

import { type AppRoute } from "@/shared/server-routes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const TabTitle = ({ route }: { route: AppRoute }) => {
  const pathname = usePathname();

  const subpathTitle = route.subRutas?.find((route) => route.href === pathname)?.label;
  const pathTitle = route.label;
  const [currentTitle, setCurrentTitle] = useState(pathTitle);

  useEffect(() => {
    if (!window) return;
    const updateTitle = () => setCurrentTitle(window.innerWidth < 1024 ? (subpathTitle ?? pathTitle) : pathTitle);
    updateTitle();
    window.addEventListener("resize", updateTitle);
    return () => window.removeEventListener("resize", updateTitle);
  }, [subpathTitle, pathTitle]);

  return (
    <h1 className="text-gray-90 truncate text-3xl font-bold tracking-tight lg:mr-8 lg:border-r lg:border-slate-200 lg:pr-8">
      {currentTitle}
    </h1>
  );
};
