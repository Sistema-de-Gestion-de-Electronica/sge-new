import { TurnoCurso } from "@/generated/prisma";

/**
 * Devuelve una fecha con el formato yyyy-MM-dd
 * @param plusExtraDays cantidad de dias a añadir a la fecha actual, por defecto es 0
 * @returns fecha con el formato yyyy-MM-dd
 */
export const getDate = (plusExtraDays = 0) => {
  const today = new Date();

  const dayPlusDays = new Date(today.getTime() + plusExtraDays * 24 * 60 * 60 * 1000);

  const todayISO = dayPlusDays.toISOString();

  const todayISOSplit = todayISO.split("T");

  const yyyyMMdd = todayISOSplit[0];

  if (yyyyMMdd) {
    return yyyyMMdd;
  }

  return "";
};

/**
 * Devuelve una fecha con el formato yyyy-MM-dd
 * @param day fecha con el formato yyyy-MM-dd
 * @returns fecha con el formato Date
 */
export const getDateISO = (day: string) => {
  return new Date(day);
};

/**
 * Devuelve una fecha con el formato yyyy-MM-dd HH:mm
 * @param day fecha con el formato Date
 * @returns fecha con el formato yyyy-MM-dd HH:mm
 * @example
 * getDateTimeISO(new Date("2023-01-01T10:00")); // Devuelve "2023-01-01 10:00"
 */
export const getDateTimeISO = (day: Date) => {
  const dateISOSplit = day.toISOString().split("T");

  return `${dateISOSplit[0]} ${dateISOSplit[1]}`;
};

/**
 * Devuelve una fecha con el formato yyyy-MM-dd
 * @param date fecha con el formato Date
 * @returns fecha con el formato yyyy-MM-dd
 */
export const getDateISOString = (date: Date | undefined | null) => {
  if (!date) return "";

  const dateIso = date.toISOString();

  const dateISOSplit = dateIso.split("T");

  const yyyyMMdd = dateISOSplit[0];

  if (yyyyMMdd) {
    return yyyyMMdd;
  }

  return "";
};

/**
 * Devuelve una fecha con el formato hh:mm:ss
 * @param date fecha con el formato Date
 * @returns fecha con el formato hh:mm:ss
 */
export const getTimeISOString = (date: Date | undefined) => {
  if (!date) return "";

  return new Date(date ?? "").toLocaleTimeString("es-AR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Devuelve true si la fecha pasada es una fecha pasada
 * @param fecha fecha a comprobar
 * @returns true si la fecha pasada es una fecha pasada
 * @example
 * esFechaPasada("2023-01-01"); // false
 */
export const esFechaPasada = (fecha: string | Date | undefined) => {
  if (!fecha) return false;

  const date = new Date(fecha);

  const now = new Date();

  return date < now;
};

/**
 * Devuelve una fecha en formato Date
 * @param fecha Fecha en formato yyyy-MM-dd
 * @returns fecha en formato Date
 * @example
 * armarFechaReserva("2023-01-01"); // Devuelve Date("2023-01-01T00:00:00")
 */
export const armarFechaSinHorasALas0000 = (fecha: string) => {
  const nuevaFecha = new Date(`${fecha}`);

  nuevaFecha.setHours(0, 0, 0, 0);

  return nuevaFecha;
};

/**
 * Devuelve una fecha en formato Date
 * @param fecha Fecha en formato yyyy-MM-dd
 * @param hora Hora en formato HH:mm
 * @returns fecha en formato Date
 * @example
 * armarFechaReserva("2023-01-01", "10:00"); // Devuelve Date("2023-01-01T10:00")
 */
export const armarFechaReserva = (fecha: string, hora: string) => {
  if (!fecha || !hora) return new Date();

  const nuevaFecha = new Date(`${fecha}T${hora}`);

  const timeZoneOffset = new Date().getTimezoneOffset() / 60; // Obtener el offset en horas

  const ajusteHoras = 3 - timeZoneOffset;

  nuevaFecha.setHours(nuevaFecha.getHours() + ajusteHoras);

  return nuevaFecha;
};

export const construirFechaReservaSinOffset = (fecha?: string | undefined) => {
  if (!fecha) return new Date();

  const nuevaFecha = fecha ? new Date(`${fecha}`) : new Date();

  const timeZoneOffset = new Date().getTimezoneOffset() / 60; // Obtener el offset en horas

  const ajusteHoras = timeZoneOffset - 3;

  nuevaFecha.setHours(nuevaFecha.getHours() + ajusteHoras);

  return nuevaFecha;
};

export const getTimeISOStringSinOffset = (fecha: Date | undefined) => {
  const date = fecha ?? new Date();

  const timeZoneOffset = date.getTimezoneOffset() / 60; // Obtener el offset en horas

  const ajusteHoras = timeZoneOffset - 3;

  date.setHours(date.getHours() + ajusteHoras);

  return date.toLocaleTimeString("es-AR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Mapeo de horarios por turno
export const horariosTurnos: Record<string, Record<number, string>> = {
  MANANA: {
    0: "07:45",
    1: "08:30",
    2: "09:15",
    3: "10:15",
    4: "11:00",
    5: "11:45",
    6: "12:30",
  },
  TARDE: {
    0: "13:30",
    1: "14:15",
    2: "15:00",
    3: "16:00",
    4: "16:45",
    5: "17:30",
    6: "18:15",
  },
  NOCHE: {
    0: "18:15",
    1: "19:00",
    2: "19:45",
    3: "20:45",
    4: "21:30",
    5: "22:15",
    6: "23:00",
  },
};

const getHoraCon45MinutosMas = (horaString: string): string => {
  const horaSplit = horaString.split(":");
  if (horaSplit.length !== 2) {
    return "";
  }

  let hora = parseInt(horaSplit[0]!, 10);
  let minuto = parseInt(horaSplit[1]!, 10);

  // Sumar 45 minutos
  minuto += 45;

  // Ajustar hora y minutos si es necesario
  if (minuto >= 60) {
    hora += Math.floor(minuto / 60);
    minuto = minuto % 60;
  }

  // Ajustar la hora si es necesario
  if (hora >= 24) {
    hora = hora % 24;
  }

  // Formatear con ceros a la izquierda
  const horaFormateada = hora.toString().padStart(2, "0");
  const minutoFormateado = minuto.toString().padStart(2, "0");

  return `${horaFormateada}:${minutoFormateado}`;
};

export const calcularTurnoHora = (turno: string, horaInicio: number, horaFin: number) => {
  const horaInicioTexto = horariosTurnos[turno]?.[horaInicio];
  const horaFinTexto = getHoraCon45MinutosMas(horariosTurnos[turno]?.[horaFin] ?? "");

  return `${horaInicioTexto} a ${horaFinTexto}`;
};

// Función para obtener la hora en formato HH:mm según el turno y la hora (entero)
export function obtenerHoraInicioFin(
  hora: number,
  turno: string,
  duracion: number,
): { horaInicio: string; horaFin: string } {
  const horaInicio = horariosTurnos[turno]?.[hora];
  const horaFin = horariosTurnos[turno]?.[hora + duracion - 1];

  if (!horaInicio || !horaFin) {
    throw new Error(`Hora de inicio o fin inválida para el turno ${turno} y hora ${hora}`);
  }

  const fechaFinHoraEntera = getHoraCon45MinutosMas(horaFin);

  return { horaInicio, horaFin: fechaFinHoraEntera };
}

/**
 * Establece las horas en una fecha dada
 * @param date Fecha original
 * @param hours Horas a establecer
 * @returns Nueva fecha con la hora establecida
 */
export const setHours = (date: Date, hours: number): Date => {
  const newDate = new Date(date);
  newDate.setHours(hours);
  return newDate;
};

/**
 * Establece los minutos en una fecha dada
 * @param date Fecha original
 * @param minutes Minutos a establecer
 * @returns Nueva fecha con los minutos establecidos
 */
export const setMinutes = (date: Date, minutes: number): Date => {
  const newDate = new Date(date);
  newDate.setMinutes(minutes);
  return newDate;
};

/**
 * Añade minutos a una fecha dada
 * @param date Fecha original
 * @param minutes Minutos a añadir
 * @returns Nueva fecha con los minutos añadidos
 */
export const addMinutes = (date: Date, minutes: number): Date => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
};

/**
 * Devuelve una fecha en formato DD/MM/YYYY
 * @param fecha Fecha en formato Date (Contiene hora, minutos y segundos)
 * @returns Fecha en formato DD/MM/YYYY
 */
export const getFechaHumanoDDMMYYYY = (fecha: Date | undefined | null) => {
  if (!fecha) return "";

  const dateISOSplit = fecha.toISOString().split("T")[0]?.split("-").reverse().join("/");

  return dateISOSplit;
};

/**
 * Devuelve una fecha en formato dddd DD de MMMM de YYYY
 * @param fecha Fecha en formato Date (Contiene hora, minutos y segundos)
 * @returns Fecha en formato dddd DD de MMMM de YYYY
 */
export const getFechaHumanoTexto = (fecha: Date | undefined) => {
  if (!fecha) return "";

  const dayName = fecha.toLocaleString("es-ES", { weekday: "long" });
  const nombreDia = dayName[0]?.toUpperCase() + dayName.slice(1);

  const day = fecha.getDate();
  const monthName = fecha.toLocaleString("es-ES", { month: "long" });
  const nombreMes = monthName[0]?.toUpperCase() + monthName.slice(1);

  const year = fecha.getFullYear();

  return `${nombreDia} ${day} de ${nombreMes} de ${year}`;
};

/**
 * Devuelve una fecha en formato dddd DD de MMMM de YYYY
 * @param fecha Fecha en formato Date (Contiene hora, minutos y segundos)
 * @returns Fecha en formato dddd DD de MMMM de YYYY
 */
export const getFechaddddDDMMYYYY = (fecha: Date | undefined) => {
  if (!fecha) return "";

  const dayName = fecha.toLocaleString("es-ES", { weekday: "long" });
  const nombreDia = dayName[0]?.toUpperCase() + dayName.slice(1);

  const day = fecha.getDate();
  const month = fecha.getMonth() + 1;
  const year = fecha.getFullYear();

  return `${nombreDia} ${day}/${month}/${year}`;
};

const mapCurso = new Map<TurnoCurso, string>([
  [TurnoCurso.MANANA, "Mañana"],
  [TurnoCurso.TARDE, "Tarde"],
  [TurnoCurso.NOCHE, "Noche"],
]);

export const getTurnoTexto = (turno: TurnoCurso | undefined) => {
  if (!turno) return "";

  return mapCurso.get(turno) ?? "";
};

// Función para convertir una cadena de hora en minutos desde la medianoche
function parseTimeToMinutes(timeStr: string): number {
  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = parseInt(hoursStr!, 10);
  const minutes = parseInt(minutesStr!, 10);
  return hours * 60 + minutes;
}

const MANANA_START = parseTimeToMinutes("07:45");
const TARDE_START = parseTimeToMinutes("13:30");
const NOCHE_START = parseTimeToMinutes("18:15");

// Tu función calcularTurnoTexto
export const calcularTurnoTexto = (fecha: Date): string => {
  const minutosDesdeMediaNoche = fecha.getHours() * 60 + fecha.getMinutes();

  if (minutosDesdeMediaNoche >= NOCHE_START) {
    return getTurnoTexto(TurnoCurso.NOCHE);
  }

  if (minutosDesdeMediaNoche >= TARDE_START) {
    return getTurnoTexto(TurnoCurso.TARDE);
  }

  if (minutosDesdeMediaNoche >= MANANA_START) {
    return getTurnoTexto(TurnoCurso.MANANA);
  }

  return getTurnoTexto(TurnoCurso.MANANA);
};
