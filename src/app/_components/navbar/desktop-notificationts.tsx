import { BellIcon } from "lucide-react";

export const DesktopNotificationButton = () => (
  <button
    type="button"
    className="relative rounded-full bg-gray-500 p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
  >
    <span className="absolute -inset-1.5" />
    <span className="sr-only">Ver notificaciones</span>
    <BellIcon aria-hidden="true" className="h-6 w-6" />
  </button>
);
