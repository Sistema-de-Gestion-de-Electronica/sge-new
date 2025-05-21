import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { redirect } from "next/navigation";
import { INICIO_ROUTE } from "@/shared/server-routes";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const api = createCaller(createContext, {
  onError: (error) => {
    if (error?.error?.code === "UNAUTHORIZED") {
      // TODO: Si alguien entra desde el mail y no está logueado, se lo va a redirigir a la página de inicio.
      // Lo ideal seria que acá se tome la URL actual, y se redirija a la página HOME conservando la URL actual.
      // De ese modo el usuario al loguearse podrá ser redirigido a la página que queria visitar originalmente
      // En caso de querer pasar parametros aca van a tener que hacer lo siguiente:
      // 1. Leer el current Path
      // 2. Enviarlo como `query param`
      // 3. Pasarselo a authJs como redirectTo
      // https://stackoverflow.com/questions/78697614/callbackurl-not-working-in-auth-js-signin
      redirect(INICIO_ROUTE.href);
    }
  },
});
