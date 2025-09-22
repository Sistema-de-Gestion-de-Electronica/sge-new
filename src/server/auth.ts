import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import type { Adapter, AdapterAccount } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import KeycloakProvider, { type KeycloakProfile } from "next-auth/providers/keycloak";

import { env } from "@/env";
import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@/generated/prisma";
import type { PrismaClient } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

const prismaAdapter = PrismaAdapter(db as PrismaClient);

const CustomAdapter = {
  ...prismaAdapter,
  createUser: async (data: User) => {
    return await db.$transaction(async (tx) => {
      const rolPromise = tx.rol.findUnique({ where: { nombre: "Alumno" } }); // TODO: Debería existir una columna como "esDefault" para seleccionar el rol
      const userPromise = tx.user.create({ data });
      const [user, rolAlumno] = await Promise.all([userPromise, rolPromise]);

      if (rolAlumno?.id) {
        await tx.usuarioRol.create({ data: { rolId: rolAlumno.id, userId: user.id, usuarioCreadorId: user.id } });
      }

      return user;
    });
  },
  linkAccount: (account: AdapterAccount) => {
    delete account["not-before-policy"];
    // @ts-expect-error string not assignable to Lowecase<string>
    return prismaAdapter.linkAccount?.(account);
  },
} as Adapter;

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // Si es provider de credenciales, permitir siempre
      if (account?.provider === "credentials") return true;
      
      // Para otros providers (Discord, Keycloak), verificar/crear usuario
      if (account && user.email) {
          // Buscar usuario existente por email
          let existingUser = await db.user.findUnique({ 
            where: { email: user.email } 
          });
          
          // Si no existe, crearlo
          if (!existingUser) {
            existingUser = await db.$transaction(async (tx) => {
              // Crear el usuario
              const newUser = await tx.user.create({
                data: {
                  email: user.email!,
                  name: user.name ?? user.email!.split('@')[0] ?? '',
                  nombre: (user as any).nombre || user.name?.split(' ')[0] || user.email!.split('@')[0],
                  apellido: (user as any).apellido || user.name?.split(' ')[1] || '',
                  image: user.image || '/default-avatar.svg',
                  fechaRegistro: new Date(),
                  fechaUltimoAcceso: new Date(),
                  fechaUltimaActualizacion: new Date(),
                }
              });
              
              // Asignar rol por defecto "Alumno"
              const rolAlumno = await tx.rol.findUnique({ 
                where: { nombre: "Alumno" } 
              });
              
              if (rolAlumno?.id) {
                await tx.usuarioRol.create({
                  data: {
                    rolId: rolAlumno.id,
                    userId: newUser.id,
                    usuarioCreadorId: newUser.id
                  }
                });
              }
              
              return newUser;
            });
        
        // Verificar si ya existe la cuenta vinculada
        const existingAccount = await db.account.findFirst({
          where: { 
            userId: existingUser.id, 
            provider: account.provider 
          }
        });
        
        // Si no existe la cuenta vinculada, crearla
        if (!existingAccount) {
          const accountData = { ...account, userId: existingUser.id };
          delete accountData["not-before-policy"];
          await db.account.create({ data: accountData });
        }
      }
      
      return true;
    }
  },
    session: ({ session, token }) => {
      return { ...session, user: { ...session.user, id: token.sub } };
    },
  },
  adapter: CustomAdapter,
  providers: [
    Credentials({
      name: "domain email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "juanperez@frba.utn.edu.ar" },
      },
      async authorize(credentials) {
        const { email } = credentials ?? {};
        return await db.user.findFirst({ where: { OR: [{ email }, { email: { startsWith: email } }] } });
      },
    }),
    ...(env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET
      ? [
          DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.KEYCLOAK_CLIENT_ID && process.env.KEYCLOAK_CLIENT_SECRET
      ? [
          KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
            issuer: process.env.KEYCLOAK_ISSUER,
            async profile(profile: KeycloakProfile) {
              return {
                id: profile.sub,
                name: profile.preferred_username,
                email: profile.email,
                // image: profile.picture,
                nombre: profile.given_name,
                apellido: profile.family_name,
                // apellido: profile.family_name,
                // fechaNacimiento: new Date(profile.birthdate.split("/").reverse().join("-")),
                // legajo: profile.legajo?.replace("-", ""),
                // direccion: profile.address.street_address,
                // ciudad: profile.address.locality,
                // codigoPostal: profile.address.postal_code,
                // telefonoCelular: profile.phone_number,
                // documentoNumero: profile.documento,
                // esDocente: profile.es_docente === "Docente",
                // documentoTipo: documentoTipo ? { connect: { id: documentoTipo.id } } : undefined,
                // pais: pais ? { connect: { iso: pais.iso } } : undefined,
                // provincia:
                //   provincia && pais
                //     ? {
                //         connect: {
                //           iso_paisIso: {
                //             iso: provincia.iso,
                //             paisIso: pais.iso,
                //           },
                //         },
                //       }
                //     : undefined,
              };
            },
          }),
        ]
      : []),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
