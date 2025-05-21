"use server";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { api } from "@/trpc/server";
import { APP_ROUTES } from "@/shared/server-routes";

export const MobileNavigation = async ({ isLogged }: { isLogged: boolean }) => {
  const navbarRutas = isLogged ? await api.application.getNavbarElements() : APP_ROUTES;

  return navbarRutas
    .filter((item) => isLogged || item.isPublic)
    .map((item) => {
      return (
        <Disclosure key={item.label} as="div" className="-mx-1">
          {item.subRutas ? (
            <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-900 hover:bg-gray-50">
              {item.label}
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
            </DisclosureButton>
          ) : (
            <DisclosureButton
              as="a"
              href={item.href}
              target={!!item?.esExterna ? "_blank" : undefined}
              className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-900 hover:bg-gray-50"
            >
              {item.label}
            </DisclosureButton>
          )}
          {item.subRutas && (
            <DisclosurePanel className="mt-2 space-y-2">
              {item.subRutas.map((item) => (
                <DisclosureButton
                  key={item.label}
                  as="a"
                  href={item.href}
                  target={!!item?.esExterna ? "_blank" : undefined}
                  className="block rounded-lg py-2 pl-6 pr-3 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.label}
                </DisclosureButton>
              ))}
            </DisclosurePanel>
          )}
        </Disclosure>
      );
    });
};
