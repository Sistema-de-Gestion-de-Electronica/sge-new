"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { type BuiltInProviderType } from "next-auth/providers/index";
import { signIn, signOut, getProviders, type LiteralUnion, type ClientSafeProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const esModoPrueba = env.NEXT_PUBLIC_NODE_ENV !== "production" || process.env.VERCEL;

const style = "rounded-full bg-slate-100 px-10 py-3 font-semibold no-underline transition hover:bg-slate-200";

export function SignIn() {
  if (esModoPrueba) {
    return <SignInTesting />;
  }

  // Login productivo
  return (
    <button type="button" className={style} onClick={() => signIn("keycloak", {}, {})}>
      Iniciar sesión
    </button>
  );
}

const SignInTesting = () => {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null>(
    null,
  );

  useEffect(() => {
    const fetchProviders = async () => {
      const fetchedProviders = await getProviders();
      setProviders(fetchedProviders);
    };

    void fetchProviders();
  }, []);

  if (!providers) {
    return <Skeleton className="h-10 w-96" />;
  }

  return (
    <>
      {Object.values(providers).map((provider) => (
        <form
          className="flex flex-col gap-y-2 [&>div]:last-of-type:hidden"
          key={provider.id}
          action={async (formData) => {
            if (provider.id === "credentials") {
              await signIn(provider.id, {
                redirectTo: "/",
                email: formData.get("email"),
              });
            } else {
              await signIn(provider.id, { redirectTo: "/" });
            }
          }}
        >
          {provider.id === "credentials" && (
            <>
              <label className="text-base font-light text-neutral-800">
                Usuario
                <input
                  className="block w-full flex-1 rounded-md border border-gray-200 p-3 font-normal transition placeholder:font-light placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                  required
                  data-1p-ignore
                  placeholder="usuario@frba.utn.edu.ar"
                  name="email"
                  type="text"
                />
              </label>
            </>
          )}
          <button type="submit" className={style}>
            <span>Inciar sesión con {provider.name}</span>
          </button>
          <div className="my-4 flex items-center gap-2">
            <div className="h-[1px] flex-1 bg-neutral-300" />
            <span className="text-xs uppercase leading-4 text-neutral-500">o</span>
            <div className="h-[1px] flex-1 bg-neutral-300" />
          </div>
        </form>
      ))}
    </>
  );
};

export function SignOut() {
  return (
    <button className={style} onClick={() => signOut()}>
      Cerrar sesión
    </button>
  );
}
