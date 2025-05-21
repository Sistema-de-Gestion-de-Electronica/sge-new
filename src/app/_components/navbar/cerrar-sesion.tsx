"use client";

import { MenuItem } from "@headlessui/react";
import { signOut } from "next-auth/react";

export const ProfileMenuCerrarSesion = () => (
  <MenuItem>
    <button
      type="button"
      className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-slate-100"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Cerrar sesión
    </button>
  </MenuItem>
);
