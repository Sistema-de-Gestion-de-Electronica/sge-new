"use server";

import { api } from "@/trpc/server";
import { NavbarItem } from "./navbar-item";
import { APP_ROUTES } from "@/shared/server-routes";

export const DesktopNavigation = async ({ isLogged }: { isLogged: boolean }) => {
  const navbarRutas = isLogged ? await api.application.getNavbarElements() : APP_ROUTES;

  return (
    <div className="flex flex-wrap items-baseline gap-x-4 py-3 md:ms-5">
      {navbarRutas
        .filter((item) => isLogged || item.isPublic)
        .map((item) => (
          <NavbarItem key={item.href} item={item} />
        ))}
    </div>
  );
};
