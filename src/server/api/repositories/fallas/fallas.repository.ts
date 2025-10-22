import type { z } from "zod";
import { type PrismaClient } from "@/generated/prisma";
import type {
  inputReportarFallasInstrumento,
  inputReportarFallasPc,
  inputGetFallaPorId,
  inputGestionarFallas,
  inputCambiarEstadoFalla,
  inputGetHistorialPorFallaId,
  inputGetHistorialPorEquipoId,
  inputEliminarFalla,
} from "@/shared/filters/fallas-filter.schema";
import { formatDateToSeconds, formatDateToDays } from "../../utils/dateFormat";

type InputReportarFallasInstrumento = z.infer<typeof inputReportarFallasInstrumento>;
type InputReportarFallasPc = z.infer<typeof inputReportarFallasPc>;
type InputGetFallaPorId = z.infer<typeof inputGetFallaPorId>;
type InputGestionarFallas = z.infer<typeof inputGestionarFallas>;
type InputCambiarEstadoFalla = z.infer<typeof inputCambiarEstadoFalla>;
type InputGetHistorialPorFallaId = z.infer<typeof inputGetHistorialPorFallaId>;
type InputEliminarFalla = z.infer<typeof inputEliminarFalla>;
type InputGetHistorialPorEquipoId = z.infer<typeof inputGetHistorialPorEquipoId>;

type Context = { db: PrismaClient; session: { user: { id: string } } };
type ContextReadOnly = { db: PrismaClient; session?: { user: { id: string } } };

const ESTADOS_EQUIPO = {
  ROTO: "Roto",
  DESCARTE: "Descarte",
  NORMAL: "Normal",
} as const;

const ESTADOS_FALLA = {
  FALLADO: "FALLADO",
  EN_REPARACION: "EN_REPARACION",
  REPARADO: "REPARADO",
  DESCARTADO: "DESCARTADO",
  ELIMINADO: "ELIMINADO",
} as const;

const TIPOS_FALLA = {
  PC: "PC",
  INSTRUMENTO: "Instrumento",
} as const;

type CreateHistorialData = {
  fallaId: number;
  fallas: string[];
  descripcionEquipo: string | null;
  descripcionFalla: string;
  reportadoPorId: string | null;
  asignadoAId: string | null;
  estado: string;
  fechaReporte: Date;
};

const createHistorialEntry = async (tx: any, data: CreateHistorialData) => {
  return (tx as any).fallaHistorial.create({ data });
};

const updateEquipoEstado = async (tx: any, equipoId: number, estadoNombre: string) => {
  const estado = await (tx as any).equipoEstado.findFirst({
    where: { nombre: estadoNombre },
    select: { id: true },
  });
  if ((estado as any)?.id) {
    await (tx as any).equipo.update({
      where: { id: equipoId },
      data: { estadoId: (estado as any).id },
    });
  }
};

export const createFallaInstrumento = async (ctx: Context, input: InputReportarFallasInstrumento) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const equipoId = input.esInventariado && input.instrumento ? Number(input.instrumento) : null;

  return ctx.db.$transaction(async (tx) => {
    const nuevaFalla = await tx.falla.create({
      data: {
        equipoId: equipoId ?? undefined,
        tipoFalla: TIPOS_FALLA.INSTRUMENTO,
        descripcionEquipo: input.descripcionEquipo,
        descripcionFalla: input.descripcionFalla ?? "No input",
        estado: ESTADOS_FALLA.FALLADO,
        reportadoPorId: ctx.session.user.id,
      },
    });

    await createHistorialEntry(tx, {
      fallaId: nuevaFalla.id,
      fallas: [],
      descripcionEquipo: nuevaFalla.descripcionEquipo,
      descripcionFalla: nuevaFalla.descripcionFalla,
      reportadoPorId: nuevaFalla.reportadoPorId,
      asignadoAId: nuevaFalla.asignadoAId,
      estado: nuevaFalla.estado,
      fechaReporte: nuevaFalla.fechaReporte,
    });

    if (equipoId) {
      await updateEquipoEstado(tx, equipoId, ESTADOS_EQUIPO.ROTO);
    }

    return nuevaFalla;
  });
};

export const createFallaPC = async (ctx: Context, input: InputReportarFallasPc) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const equipo = await ctx.db.equipo.findUnique({
    where: { inventarioId: input.nroEquipo },
  });

  if (!equipo) {
    throw new Error("El equipo indicado no existe");
  }

  return ctx.db.$transaction(async (tx) => {
    const nuevaFalla = await tx.falla.create({
      data: {
        equipoId: equipo.id,
        tipoFalla: TIPOS_FALLA.PC,
        descripcionFalla: input.descripcionFalla,
        fallas: input.fallas,
        estado: ESTADOS_FALLA.FALLADO,
        reportadoPorId: ctx.session.user.id,
      },
    });

    await createHistorialEntry(tx, {
      fallaId: nuevaFalla.id,
      fallas: nuevaFalla.fallas ?? [],
      descripcionEquipo: null,
      descripcionFalla: nuevaFalla.descripcionFalla,
      reportadoPorId: nuevaFalla.reportadoPorId,
      asignadoAId: nuevaFalla.asignadoAId,
      estado: nuevaFalla.estado,
      fechaReporte: nuevaFalla.fechaReporte,
    });

    await updateEquipoEstado(tx, equipo.id, ESTADOS_EQUIPO.ROTO);

    return nuevaFalla;
  });
};

type FallaWithRelations = {
  id: number;
  equipoId: number | null;
  tipoFalla: string;
  fallas: string[];
  descripcionEquipo: string | null;
  descripcionFalla: string;
  condicion: string | null;
  fechaReporte: Date;
  reportadoPorId: string | null;
  asignadoAId: string | null;
  estado: string;
  palabrasClave: string | null;
  equipo: {
    inventarioId: string;
    modelo: string;
    laboratorio: { nombre: string } | null;
    marca: { nombre: string } | null;
    tipo: { nombre: string } | null;
    estado: { nombre: string } | null;
  } | null;
  reportadoPor: { nombre: string; apellido: string } | null;
  asignadoA: { nombre: string; apellido: string } | null;
};

const transformFallaData = (falla: FallaWithRelations) => ({
  ...falla,
  laboratorio: falla.equipo?.laboratorio?.nombre ?? "-",
  equipo: falla.equipo?.inventarioId ?? (falla.equipoId ? `Equipo ${falla.equipoId}` : "-"),
  marca: falla.equipo?.marca?.nombre ?? "-",
  modelo: falla.equipo?.modelo ?? "-",
  reportadoPor: falla.reportadoPor ?? { nombre: "-", apellido: "" },
  asignadoA: falla.asignadoA ?? { nombre: "-", apellido: "" },
  fechaReporte: falla.fechaReporte ? formatDateToDays(new Date(falla.fechaReporte)) : "-",
});

export const findAllFallas = async (ctx: ContextReadOnly, input: any) => {
  const {
    pageSize = "20",
    pageIndex = "0",
    orderBy = "fechaReporte",
    orderDirection = "desc",
    searchText = "",
    laboratorio = "",
    marca = "",
    modelo = "",
    reportadoPor = "",
    asignadoA = "",
    estado = "",
    filterByUserId = "false",
  } = input;

  const pageSizeNum = parseInt(pageSize);
  const pageIndexNum = parseInt(pageIndex);
  const skip = pageIndexNum * pageSizeNum;

  const whereClause: any = {
    NOT: { estado: ESTADOS_FALLA.ELIMINADO },
  };

  if (filterByUserId === "true") {
    whereClause.reportadoPorId = ctx.session?.user?.id;
  }

  if (laboratorio) {
    whereClause.equipo = {
      ...whereClause.equipo,
      laboratorioId: parseInt(laboratorio),
    };
  }

  if (marca) {
    whereClause.equipo = {
      ...whereClause.equipo,
      marcaId: parseInt(marca),
    };
  }

  if (modelo) {
    whereClause.equipo = {
      ...whereClause.equipo,
      modelo: { contains: modelo, mode: "insensitive" },
    };
  }

  if (reportadoPor) {
    whereClause.reportadoPorId = reportadoPor;
  }

  if (asignadoA) {
    whereClause.asignadoAId = asignadoA;
  }

  if(estado){
    whereClause.estado = estado;
  }

  if (searchText) {
    whereClause.OR = [
      { descripcionFalla: { contains: searchText, mode: "insensitive" } },
      { palabrasClave: { contains: searchText, mode: "insensitive" } },
      { equipo: { numeroSerie: { contains: searchText, mode: "insensitive" } } },
      /*{ equipo: { inventarioId: { contains: searchText, mode: "insensitive" } } },
      { equipo: { numeroSerie: { contains: searchText, mode: "insensitive" } } },
      { equipo: { laboratorio: { nombre: { contains: searchText, mode: "insensitive" } } } },
      { equipo: { marca: { nombre: { contains: searchText, mode: "insensitive" } } } },
      { equipo: { modelo: { contains: searchText, mode: "insensitive" } } },
      { reportadoPor: { nombre: { contains: searchText, mode: "insensitive" } } },
      { reportadoPor: { apellido: { contains: searchText, mode: "insensitive" } } },
      { asignadoA: { nombre: { contains: searchText, mode: "insensitive" } } },
      { asignadoA: { apellido: { contains: searchText, mode: "insensitive" } } },*/
    ];
  }

  const orderByClause: any = {};
  if (orderBy === "laboratorio_nombre") {
    orderByClause.equipo = { laboratorio: { nombre: orderDirection } };
  } else if (orderBy === "equipo_nroEquipo") {
    orderByClause.equipo = { inventarioId: orderDirection };
  } else if (orderBy === "marca_nombre") {
    orderByClause.equipo = { marca: { nombre: orderDirection } };
  } else if (orderBy === "modelo_nombre") {
    orderByClause.equipo = { modelo: orderDirection };
  } else if (orderBy === "reportadoPor_nombre") {
    orderByClause.reportadoPor = { nombre: orderDirection };
  } else if (orderBy === "asignadoA_nombre") {
    orderByClause.asignadoA = { nombre: orderDirection };
  } else {
    orderByClause[orderBy] = orderDirection;
  }

  const [fallas, totalCount] = await Promise.all([
    ctx.db.falla.findMany({
      where: whereClause,
      include: {
        equipo: {
          include: {
            laboratorio: true,
            marca: true,
            tipo: true,
            estado: true,
          },
        },
        reportadoPor: true,
        asignadoA: true,
      },
      orderBy: orderByClause,
      skip,
      take: pageSizeNum,
    }),
    ctx.db.falla.count({
      where: whereClause,
    }),
  ]);

  const fallasTransformadas = fallas.map((falla: any) => transformFallaData(falla));

  return {
    count: totalCount,
    fallas: fallasTransformadas,
    pageIndex: pageIndexNum,
    pageSize: pageSizeNum,
  };
};

export const findFallaById = async (ctx: ContextReadOnly, input: InputGetFallaPorId) => {
  const falla = await ctx.db.falla.findUnique({
    include: {
      equipo: {
        include: {
          laboratorio: true,
          marca: true,
          tipo: true,
          estado: true,
        },
      },
      reportadoPor: true,
      asignadoA: true,
    },
    where: {
      id: input.id,
    },
  });

  if (!falla) {
    throw new Error(`Falla con ID ${String(input.id)} no encontrada`);
  }

  return {
    id: falla.id,
    laboratorio: falla.equipo?.laboratorio?.nombre ?? "-",
    nroEquipo: falla.equipo?.inventarioId ?? (falla.equipoId ? `Equipo ${falla.equipoId}` : "-"),
    marca: falla.equipo?.marca?.nombre ?? "-",
    modelo: falla.equipo?.modelo ?? "-",
    fallas: falla.fallas ?? [],
    descripcionFalla: falla.descripcionFalla ?? "-",
    reportadoPor: falla.reportadoPor ?? null,
    asignadoA: falla.asignadoA ?? null,
    fechaReporte: falla.fechaReporte ? formatDateToSeconds(new Date(falla.fechaReporte)) : "-",
    estado: falla.estado ?? "-",
    palabrasClave: falla.palabrasClave ?? "-",
  };
};

const mapEstadoFallaToEquipo = (estadoFalla: string): string | null => {
  const mapping: Record<string, string> = {
    [ESTADOS_FALLA.FALLADO]: ESTADOS_EQUIPO.ROTO,
    [ESTADOS_FALLA.DESCARTADO]: ESTADOS_EQUIPO.DESCARTE,
    [ESTADOS_FALLA.REPARADO]: ESTADOS_EQUIPO.NORMAL,
    [ESTADOS_FALLA.ELIMINADO]: ESTADOS_EQUIPO.NORMAL,
  };
  return mapping[estadoFalla] ?? null;
};

export const updateEstadoFalla = async (ctx: Context, input: InputCambiarEstadoFalla) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const updateData: {
    estado: string;
    descripcionFalla?: string;
    asignadoA?: { connect: { id: string } } | { disconnect: true };
  } = {
    estado: input.estado,
  };

  if (typeof input.descripcionFalla === "string") {
    updateData.descripcionFalla = input.descripcionFalla;
  }

  if (typeof input.asignadoA === "string") {
    updateData.asignadoA = input.asignadoA ? { connect: { id: input.asignadoA } } : { disconnect: true };
  }

  return ctx.db.$transaction(async (tx) => {
    const fallaActualizada = await tx.falla.update({
      where: { id: input.id },
      data: updateData,
      select: {
        id: true,
        equipoId: true,
        estado: true,
        descripcionFalla: true,
        reportadoPorId: true,
        asignadoAId: true,
        tipoFalla: true,
        descripcionEquipo: true,
        fallas: true,
        fechaReporte: true,
      },
    });

    const nombreEstadoEquipo = mapEstadoFallaToEquipo(fallaActualizada.estado);

    if (fallaActualizada.equipoId && nombreEstadoEquipo) {
      await updateEquipoEstado(tx, fallaActualizada.equipoId, nombreEstadoEquipo);
    }

    await createHistorialEntry(tx, {
      fallaId: fallaActualizada.id,
      fallas: fallaActualizada.fallas ?? [],
      descripcionEquipo: fallaActualizada.descripcionEquipo,
      descripcionFalla: fallaActualizada.descripcionFalla ?? "",
      reportadoPorId: fallaActualizada.reportadoPorId,
      asignadoAId: fallaActualizada.asignadoAId,
      estado: fallaActualizada.estado,
      fechaReporte: fallaActualizada.fechaReporte,
    });

    return fallaActualizada;
  });
};

export const updateFalla = async (ctx: Context, input: InputGestionarFallas) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  const updateData: {
    descripcionFalla?: string;
    palabrasClave?: string;
    asignadoA?: { connect: { id: string } } | { disconnect: true };
  } = {};

  if (typeof input.descripcionFalla === "string") {
    updateData.descripcionFalla = input.descripcionFalla;
  }

  if (typeof input.asignadoA === "string") {
    updateData.asignadoA = input.asignadoA ? { connect: { id: input.asignadoA } } : { disconnect: true };
  }

  if (typeof input.palabraClave === "string") {
    updateData.palabrasClave = input.palabraClave;
  }

  try {
    return await ctx.db.falla.update({
      where: { id: input.id },
      data: updateData,
    });
  } catch (error) {
    throw new Error(`Error al actualizar falla con ID ${String(input.id)}: ${String(error)}`);
  }
};

export const deleteFalla = async (ctx: Context, input: InputEliminarFalla) => {
  if (!ctx.session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  try {
    return await ctx.db.$transaction(async (tx) => {
      const falla = await tx.falla.findUnique({
        where: { id: input.id },
        select: { equipoId: true },
      });
      const fallaEliminada = await tx.falla.update({
        where: { id: input.id },
        data: { estado: ESTADOS_FALLA.ELIMINADO },
      });
      if (falla?.equipoId) {
        await updateEquipoEstado(tx, falla.equipoId, ESTADOS_EQUIPO.NORMAL);
      }
      return fallaEliminada;
    });
  } catch (error) {
    throw new Error(`Error al eliminar falla con ID ${String(input.id)}: ${String(error)}`);
  }
};

type HistorialWithRelations = {
  id: number;
  fallaId: number;
  fallas: string[];
  descripcionEquipo: string | null;
  descripcionFalla: string;
  reportadoPorId: string | null;
  asignadoAId: string | null;
  estado: string;
  fechaReporte: Date;
  fechaCambioEstado: Date;
  falla: {
    equipoId: number | null;
    equipo: {
      inventarioId: string;
      modelo: string;
      laboratorio: { nombre: string } | null;
      marca: { nombre: string } | null;
      tipo: { nombre: string } | null;
      estado: { nombre: string } | null;
    } | null;
  } | null;
  reportadoPor: { nombre: string; apellido: string } | null;
  asignadoA: { nombre: string; apellido: string } | null;
};

const transformHistorialData = (h: any) => ({
  id: h.id,
  fallaId: h.fallaId,
  equipo: h.falla?.equipo?.inventarioId ?? (h.falla?.equipoId ? `Equipo ${h.falla?.equipoId}` : "-"),
  laboratorio: h.falla?.equipo?.laboratorio?.nombre ?? "-",
  marca: h.falla?.equipo?.marca?.nombre ?? "-",
  modelo: h.falla?.equipo?.modelo ?? "-",
  fallas: h.fallas ?? [],
  descripcionEquipo: h.descripcionEquipo ?? null,
  descripcionFalla: h.descripcionFalla ?? "",
  reportadoPor: h.reportadoPor ?? { nombre: "-", apellido: "" },
  asignadoA: h.asignadoA ?? { nombre: "-", apellido: "" },
  estado: h.estado,
  fechaReporte: formatDateToDays(new Date(h.fechaReporte)),
  fechaCambioEstado: formatDateToSeconds(new Date(h.fechaCambioEstado)),
});

export const findHistorialByFallaId = async (ctx: ContextReadOnly, input: InputGetHistorialPorFallaId) => {
  try {
    const dbWithHist = ctx.db as unknown as {
      fallaHistorial: {
        findMany: (args: {
          where: { fallaId: number };
          include: any;
          orderBy: { fechaCambioEstado: "desc" };
        }) => Promise<HistorialWithRelations[]>;
      };
    };

    const historial = await dbWithHist.fallaHistorial.findMany({
      where: { fallaId: input.fallaId },
      include: {
        falla: {
          include: {
            equipo: {
              include: { laboratorio: true, marca: true, tipo: true, estado: true },
            },
          },
        },
        reportadoPor: true,
        asignadoA: true,
      },
      orderBy: { fechaCambioEstado: "desc" },
    });

    return historial.map(transformHistorialData);
  } catch (error) {
    throw new Error(`Error al obtener historial de falla ${String(input.fallaId)}: ${String(error)}`);
  }
};

export const findHistorialByEquipoId = async (ctx: ContextReadOnly, input: InputGetHistorialPorEquipoId) => {
  try {
    const historial = await ctx.db.fallaHistorial.findMany({
      where: {
        falla: {
          equipoId: input.equipoId,
        },
      },
      include: {
        falla: {
          include: {
            equipo: {
              include: { laboratorio: true, marca: true, tipo: true, estado: true },
            },
          },
        },
        reportadoPor: true,
        asignadoA: true,
      },
      orderBy: { fechaCambioEstado: "desc" },
    });

    return historial.map(transformHistorialData);
  } catch (error) {
    throw new Error(`Error al obtener historial de falla del equipo ${String(input.equipoId)}: ${String(error)}`);
  }
};
