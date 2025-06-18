# SGE 3.0

Proyecto creado con [T3 Stack](https://create.t3.gg/).

# Prod link

- Vercel - [https://sge-2.vercel.app](https://sge-2.vercel.app)
- UTN (requiere VPN) - [https://sge-tst.frba.utn.edu.ar/](https://sge-tst.frba.utn.edu.ar/)

# Como ejecutar local

Se requiere tener instalado Just y Docker

1. Clonar el repositorio

   ```bash
   git clone git@github.com:MartinLingeri/sge-new.git
   ```

2. Levantar el entorno de desarrollo

   ```bash
   just deploy
   ```
   Este comando buildea las imagenes de los contenedores y realiza un `docker-compose up` para levantar todos en el orden correcto.

3. Modificar el /etc/hosts para que apunte a la IP del contenedor de Keycloak

   ```bash
   just hosts
   ```

4. Ingresar a la aplicacion

   - Frontend: [http://sge-dev.frba.utn.edu.ar](http://sge-dev.frba.utn.edu.ar)
   - Keycloak: [http://auth-dev.frba.utn.edu.ar](http://auth-dev.frba.utn.edu.ar)

5. Ingresar con el usuario `admin` y la contraseña `admin` (se puede cambiar en el Keycloak)

## Tecnologías usadas

- Next.js
- Prisma ORM
- Tailwind CSS
- TypeScript
- Auth.js
- TRPC
- React
- Docker

## Links útiles

- Prisma Docs Errors: [Errors | Prisma Documentation](https://www.prisma.io/docs/orm/reference/error-reference)
- Prisma Type: [Table inheritance | Prisma Documentation](https://www.prisma.io/docs/orm/prisma-schema/data-model/table-inheritance)
- Query Nested: [Relation queries \(Concepts\) | Prisma Documentation](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)
- Keycloack login issue: [Signout does not logout user when session is being requested simultaneously · Issue \#4612 · nextauthjs/next-auth](https://github.com/nextauthjs/next-auth/issues/4612)
- NextJs Keycloak tutorial: [NextJS, NextAuth with App Router and Keycloak \(Demo part 3/3\)](https://www.youtube.com/watch?v=-HsldaBdIPQ)
- NextJs official guide: [Learn Next.js: Mutating Data](https://nextjs.org/learn/dashboard-app/mutating-data)
- DER generator: [Prisma ERD](https://prisma-erd.simonknott.de/)
- Sonner Toaster: [Toast\(\) – Sonner](https://sonner.emilkowal.ski/toast)
- Tailwind CSS: [Background Position](https://tailwindcss.com/docs/background-position)
- ShadCDN: [Accordion](https://ui.shadcn.com/docs/components/accordion)
- TRPC: [Getting Started](https://trpc.io/docs/getting-started)
- Matine Components: [Slider](https://mantine.dev/core/slider/)
- Guide: [From 0 to Production - The Modern React Tutorial \(RSCs, Next.js, Shadui, Drizzle, TS and more\)](https://youtu.be/d5x0JCZbAJs?si=4qYCzN_18mZngyAA&t=5527)
- Typescript definition: [Configuring: TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript#typescript-plugin)
- Hooks variedad: [usehooks-ts](https://usehooks-ts.com/introduction)
- Códigos de Error: [Error Handling](https://trpc.io/docs/server/error-handling)
- Presentacion comercial: [SGE 2.0](https://www.canva.com/design/DAGPKrgbpq0/Xg6BmtoG3p1hQdboYGZd9g/edit)
