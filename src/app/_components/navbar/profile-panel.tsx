import { USER_ROUTES } from "@/shared/server-routes";
import { DisclosureButton } from "@headlessui/react";
import { BellIcon } from "lucide-react";

export const ProfilePanel = ({ id }: { id: string }) =>
  USER_ROUTES(id).map((item) => (
    <DisclosureButton
      key={item.label}
      as="a"
      href={item.href}
      className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-900 hover:bg-gray-50"
    >
      {item.label}
    </DisclosureButton>
  ));

export const MobileNotificationButton = () => (
  <button
    type="button"
    className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
  >
    <span className="absolute -inset-1.5" />
    <span className="sr-only">View notifications</span>
    <BellIcon aria-hidden="true" className="h-6 w-6" />
  </button>
);
