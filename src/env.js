import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const nodeEnv = z.enum(["development", "test", "production"]).default("development");

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),

    NODE_ENV: nodeEnv,

    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),

    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),

    KEYCLOAK_CLIENT_ID: z.string().optional(),
    KEYCLOAK_CLIENT_SECRET: z.string().optional(),
    KEYCLOAK_ISSUER: z.string().url().optional(),

    SMTP_MAIL_EMISOR: z.string(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.string(),
    SMTP_SECURE: z.enum(["false", "true"]).default("false"),

    SMTP_TESTING: z.enum(["false", "true"]).default("true"),
    SMTP_TESTING_EMAIL_RECEPTOR: z.string().optional(),
    SMTP_TESTING_EMAIL_USER: z.string().optional(),
    SMTP_TESTING_EMAIL_PASSWORD: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_NODE_ENV: nodeEnv,
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,

    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

    SMTP_MAIL_EMISOR: process.env.SMTP_MAIL_EMISOR,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,

    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
    KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,

    SMTP_TESTING: process.env.SMTP_TESTING,
    SMTP_TESTING_EMAIL_RECEPTOR: process.env.SMTP_TESTING_EMAIL_RECEPTOR,
    SMTP_TESTING_EMAIL_USER: process.env.SMTP_TESTING_EMAIL_USER,
    SMTP_TESTING_EMAIL_PASSWORD: process.env.SMTP_TESTING_EMAIL_PASSWORD,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
