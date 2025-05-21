import { SgeNombre } from "@/generated/prisma";
import { z } from "zod";

export const ZodRuta = z.object({
  href: z.string(),
  redirectClick: z.string().optional(),
  label: z.string(),
  isPublic: z.boolean(),
  inConstruction: z.boolean().optional(),
  esExterna: z.boolean().optional(),
  permisos: z.array(z.nativeEnum(SgeNombre)),
});

export type AppBase = z.infer<typeof ZodRuta>;
export type AppRoute = AppBase & {
  subRutas?: AppRoute[];
  [x: string]: unknown;
};

export const INICIO_ROUTE: AppRoute = {
  href: "/",
  label: "Inicio",
  isPublic: true,
  permisos: [],
};

const PERMISOS_VER_BIBLIOTECA = [SgeNombre.BIBLIOTECA_VER_LISTADO];
export const BIBLIOTECA_ROUTE: AppRoute = {
  href: "/biblioteca",
  label: "Biblioteca",
  isPublic: false,
  misPrestamosRuta: "/biblioteca/mis_prestamos",
  permisos: PERMISOS_VER_BIBLIOTECA,
  subRutas: [
    {
      href: "/biblioteca",
      label: "Todos los libros",
      isPublic: false,
      permisos: PERMISOS_VER_BIBLIOTECA,
    },
    {
      href: "/biblioteca/prestamos",
      label: "Préstamos",
      isPublic: false,
      permisos: [SgeNombre.BIBLIOTECA_PRESTAMO_PRESTAR, SgeNombre.BIBLIOTECA_PRESTAMO_PRESTAR],
    },
    {
      href: "/biblioteca/mis_prestamos",
      label: "Mis préstamos",
      isPublic: false,
      permisos: [SgeNombre.BIBLIOTECA_PRESTAMO_VER_MIS_PRESTAMOS],
    },
  ],
};

// Nota @Alex: Es importante que `Mis Curso` y `Laboratorio` tengan siempre los mismos permisos para ver. Debido a que en `next.config.js` existe un redirect automatico.
// Y el `layout` de estas páginas valida que el usuario tenga permisos para entrar en la misma.
// Si por ejemplo para entrar en `/laboratorio/layout` se valida por el permiso [1,2,3]
// Pero en `/laboratorio/mis_cursos/layout` se valida por el permiso [4]
// Entonces el usuario cuando haga click en el navbar en `Laboratorio` el archivo `next.config.js` redirige a `/laboratorio/mis_cursos/layout` y este a `/` porque no tiene permisos.

// Nota @Alex 2: En caso de que esta lógica no guste o se desee cambiarla porque el redirect automático no es lo ideal, se puede eliminar el redirect de `next.config.js` y
// agregar validaciones de permisos en el `layout` de cada página. Por ejemplo
// `laboratorio/layout` si tienePermisoVer => redirect mis reservas, caso contrario si tiene para aprobar => redirect a aprobar caso contrario redirecciona a inicio.
// Tener cuidado con esto de no generar un loop infinito de redirects.

// Nota @Alex 3: Si no pueden resolver el redirect de loop infinitos, solamente validen en el `layout` principal que el usuario esta logueado, dejen el redirect fijo en `next.config.js`
// PERO! en cada redirect dentro de laboratorio pongan validacion y redirect al siguiente (es un poco mas lento pero funciona)
// Ej: `laboratorio/layout` estaLogueado? => si es true, redirecciona a mis reservas, si es false, redirecciona a inicio
// Ej: `laboratorio/mis_reservas/layout` tienePermisoVerMisReservas? => Si es true, no pasa nada. Si es false, redirecciona a aprobar
// Ej: `laboratorio/aprobar/layout` tienePermisoAprobar? => Si es true, no pasa nada. Si es false, redirecciona a inicio
// No es el mejor ejemplo dado que no tiene sentido que pueda aprobar y no vea sus reservas, pero se entiende. Aconsejo hacerlo programaticamente modificando el objeto de Rutas

// NOTA @Alex 4: Si todo falla, pueden llamarme sin problema, no me dió el tiempo para hacer esto :) (alexanderarmua1@gmail.com)
const PERMISOS_VER_LABORATORIO = [SgeNombre.RES_LAB_RESERVAR_CURSO_AUTO, SgeNombre.RES_LAB_VER_RESERVAS_CATEDRA];
export const LABORATORIO_ROUTE: AppRoute = {
  href: "/laboratorios",
  label: "Laboratorios",
  isPublic: false,
  misReservasRuta: "/laboratorios/mis_reservas",
  permisos: PERMISOS_VER_LABORATORIO,
  subRutas: [
    {
      href: "/laboratorios/mis_cursos",
      label: "Mis cursos",
      isPublic: false,
      permisos: PERMISOS_VER_LABORATORIO,
    },
    {
      href: "/laboratorios/catedra",
      label: "Cátedra",
      isPublic: false,
      permisos: [SgeNombre.RES_LAB_VER_RESERVAS_CATEDRA],
    },
    {
      href: "/laboratorios/software",
      label: "Aplicaciones PC",
      isPublic: false,
      permisos: [SgeNombre.APLICACIONES_ABM],
    },
    {
      href: "/laboratorios/pantalla",
      label: "Pantalla",
      isPublic: false,
      permisos: [SgeNombre.RES_LAB_ABM_PANTALLA],
    },
    {
      href: "/laboratorios/mis_reservas",
      label: "Mis reservas",
      isPublic: false,
      permisos: [SgeNombre.RES_LAB_RESERVAR_CURSO_AUTO, SgeNombre.RES_LAB_VER_RESERVAS_CATEDRA],
    },
    {
      redirectClick: "/laboratorios/solicitudes?estatus=PENDIENTE",
      href: "/laboratorios/solicitudes",
      label: "Administrar reservas",
      isPublic: false,
      permisos: [SgeNombre.RES_LAB_CONFIRMAR_RESERVAS],
    },
  ],
};

const PERMISOS_VER_LABORATORIOS = [SgeNombre.LAB_ABIERTO_RESERVAR];
export const LABORATORIO_ABIERTO_ROUTE: AppRoute = {
  href: "/laboratorio_abierto",
  label: "Laboratorio abierto",
  isPublic: false,
  misReservaRuta: "/laboratorio_abierto/mis_reservas",
  permisos: PERMISOS_VER_LABORATORIOS,
  subRutas: [
    {
      href: "/laboratorio_abierto/reservar",
      label: "Reservar",
      isPublic: false,
      permisos: PERMISOS_VER_LABORATORIOS,
    },
    {
      redirectClick: "/laboratorio_abierto/solicitudes?estatus=PENDIENTE",
      href: "/laboratorio_abierto/solicitudes",
      label: "Administrar reservas",
      isPublic: false,
      permisos: [SgeNombre.LAB_ABIERTO_CONFIRMAR_RESERVAS],
    },
    {
      href: "/laboratorio_abierto/mis_reservas",
      label: "Mis reservas",
      isPublic: false,
      permisos: [SgeNombre.LAB_ABIERTO_VER_MIS_RESERVAS],
    },
    {
      href: "/laboratorio_abierto/tutores",
      label: "Tutores",
      isPublic: false,
      permisos: [SgeNombre.LAB_ABIERTO_VER_PLANILLA_TUTORES],
    },
  ],
};

const PERMISOS_VER_EQUIPOS = [SgeNombre.EQUIPOS_VER_LISTADO];
export const EQUIPOS_ROUTE: AppRoute = {
  href: "/equipos",
  label: "Equipos",
  isPublic: false,
  misPrestamosRuta: "/equipos/mis_prestamos",
  permisos: PERMISOS_VER_EQUIPOS,
  subRutas: [
    {
      href: "/equipos",
      label: "Todos los equipos",
      isPublic: false,
      permisos: PERMISOS_VER_EQUIPOS,
    },
    {
      href: "/equipos/tipos",
      label: "Tipos",
      isPublic: false,
      permisos: [SgeNombre.EQUIPOS_ABM],
    },
    {
      href: "/equipos/prestamos",
      label: "Préstamos",
      isPublic: false,
      permisos: [SgeNombre.EQUIPOS_PRESTAMO_PRESTAR],
    },
    {
      href: "/equipos/mis_prestamos",
      label: "Mis préstamos",
      isPublic: false,
      permisos: [SgeNombre.EQUIPOS_PRESTAMO_VER_MIS_PRESTAMOS],
    },
  ],
};

const PERMISOS_VER_MATERIAS = [SgeNombre.MATERIAS_VER_LISTADO];
export const MATERIA_ROUTE: AppRoute = {
  href: "/materias",
  label: "Materias",
  isPublic: false,
  permisos: PERMISOS_VER_MATERIAS,
  subRutas: [
    {
      href: "/materias",
      label: "Todas las materias",
      isPublic: false,
      permisos: PERMISOS_VER_MATERIAS,
    },
  ],
};

const PERMISOS_VER_CURSOS = [SgeNombre.CURSOS_MOSTRAR_TODOS];
export const CURSOS_ROUTE: AppRoute = {
  href: "/cursos",
  label: "Cursos",
  isPublic: false,
  permisos: PERMISOS_VER_CURSOS,
  subRutas: [
    {
      href: "/cursos",
      label: "Todos los cursos",
      isPublic: false,
      permisos: PERMISOS_VER_CURSOS,
    },
    {
      href: "/cursos/mis_cursos",
      label: "Mis cursos",
      isPublic: false,
      permisos: [SgeNombre.CURSOS_VER_MIS_CURSOS_AUTO],
    },
    {
      href: "/cursos/divisiones",
      label: "Divisiones",
      isPublic: false,
      permisos: [SgeNombre.DIVISIONES_VER_LISTADO],
    },
  ],
};

const PERMISOS_VER_ADMIN = [SgeNombre.ADMIN_VER_PANEL_ADMIN];
export const ADMIN_ROUTE: AppRoute = {
  href: "/admin",
  label: "Administración",
  isPublic: false,
  permisos: PERMISOS_VER_ADMIN,
  subRutas: [
    {
      href: "/admin/roles",
      label: "Roles",
      isPublic: false,
      permisos: PERMISOS_VER_ADMIN,
    },
    {
      href: "/admin/usuarios",
      label: "Usuarios",
      isPublic: false,
      permisos: [SgeNombre.ADMIN_VER_PANEL_ADMIN, SgeNombre.ADMIN_ABM_USUARIOS],
    },
    {
      href: "/admin/laboratorios",
      label: "Laboratorios",
      isPublic: false,
      permisos: [SgeNombre.ADMIN_VER_PANEL_ADMIN],
    },
  ],
};

export const COMPROBANTE_ROUTE = {
  href: "/comprobante",
  label: "Comprobante",
  isPublic: false,
  bibliotecaRuta: {
    href: "/comprobante/biblioteca",
  },
  inventarioRuta: {
    href: "/comprobante/equipo",
  },
  laboratorioAbiertoRuta: {
    href: "/comprobante/laboratorio_abierto",
  },
};

const PERMISOS_VER_REPORTES = [SgeNombre.ADMIN_VER_PANEL_ADMIN];
export const REPORTES_ROUTE: AppRoute = {
  href: "/reportes",
  label: "Reportes",
  isPublic: false,
  permisos: PERMISOS_VER_REPORTES,
  subRutas: [
    {
      href: "/reportes/hoy",
      label: "Hoy",
      isPublic: false,
      permisos: PERMISOS_VER_REPORTES,
    },
    {
      href: "/reportes/mes",
      label: "Mes",
      isPublic: false,
      permisos: [SgeNombre.ADMIN_VER_PANEL_ADMIN],
    },
  ],
};

export const SGE_1_ROUTE: AppRoute[] = [
  {
    href: "https://sge.frba.utn.edu.ar/sge2/fallasreporte/falla_pc.php",
    label: "Fallas",
    esExterna: true,
    isPublic: false,
    permisos: [SgeNombre.REP_FALLAS_REPORTAR_FALLAS],
  },
  {
    href: "https://sge.frba.utn.edu.ar/sge2/ventanilla/ventanilla.php",
    label: "Ventanilla",
    esExterna: true,
    isPublic: false,
    permisos: [],
  },
  {
    href: "https://sge.frba.utn.edu.ar/sge2/consejeros/index.php",
    label: "Consejeros",
    esExterna: true,
    isPublic: false,
    permisos: [SgeNombre.ADMIN_ACTUALIZAR_ACTA_CONSEJEROS],
  },
  {
    href: "https://sge.frba.utn.edu.ar/sge2/inscripciones_especiales/index.php",
    label: "Inscripciones especiales",
    esExterna: true,
    isPublic: false,
    permisos: [SgeNombre.ADMIN_OFERTAS_LABORALES_ABM],
  },
];

export const APP_ROUTES: AppRoute[] = [
  INICIO_ROUTE,
  LABORATORIO_ROUTE,
  LABORATORIO_ABIERTO_ROUTE,
  MATERIA_ROUTE,
  CURSOS_ROUTE,
  EQUIPOS_ROUTE,
  BIBLIOTECA_ROUTE,
  ADMIN_ROUTE,
  REPORTES_ROUTE,
  ...SGE_1_ROUTE,
];

export const USER_ROUTES = (id: string): AppRoute[] => [
  {
    href: "/perfil/" + id,
    label: "Perfil",
    isPublic: false,
    permisos: [],
  },
  // {
  //   href: "/api/auth/signout",
  //   label: "Cerrar sesión",
  //   isPublic: false,
  //   permisos: [],
  // },
];

export const APP_ROUTES_MAP = APP_ROUTES.reduce(
  (acc, route) => {
    acc[route.href] = route;
    return acc;
  },
  {} as Record<string, AppRoute>,
);
