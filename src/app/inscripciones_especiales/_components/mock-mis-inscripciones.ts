export type InscripcionesEspecialesData = {
  id: number;
  solicitante: {
    id: string;
    nombre: string | null;
    apellido: string | null;
    legajo: string | null;
    email: string | null;
    image: string | null;
    name: string | null;
  };
  caso: string;
  materias: string[];
  justificacion: string;
  turnoAlternativa1: string;
  turnoAlternativa2: string;
  estado: string;
  respuesta: string;
  fechaRespuesta: string;
  fechaSolicitud: string;
};

export const MOCK_INSCRIPCIONES_ESPECIALES: InscripcionesEspecialesData[] = [
  {
    id: 15233,
    solicitante: {
      id: "1",
      nombre: "Martin",
      apellido: "Gonzalez",
      legajo: "12345",
      email: "martin.gonzalez@example.com",
      image: "https://example.com/martin.jpg",
      name: "Martin Gonzalez"
    },
    caso: "Excepcion de correlativas",
    materias: ["Matematica", "Historia"],
    justificacion: "La justificacion es que necesito aprobar estas materias para poder avanzar en mi carrera",
    turnoAlternativa1: "Lunes: Tarde, Noche | Martes: Mañana",
    turnoAlternativa2: "Lunes: Mañana, Tarde, Noche | Martes: Mañana, Tarde, Noche | Miércoles: Mañana | Jueves: Tarde, Noche | Viernes: Tarde, Noche | Sabado: Mañana",
    estado: "PENDIENTE",
    fechaSolicitud: "2023-01-01",
    respuesta: "",
    fechaRespuesta: "",
  },
  {
    id: 67890,
    solicitante: {
      id: "2",
      nombre: "Ana",
      apellido: "Lopez",
      legajo: "67890",
      email: "ana.lopez@example.com",
      image: "https://example.com/ana.jpg",
      name: "Ana Lopez"
    },
    caso: "Excepcion de correlativas",
    materias: ["Biologia", "Quimica"],
    justificacion: "La justificacion es que necesito aprobar estas materias para poder avanzar en mi carrera",
    turnoAlternativa1: "Lunes: Mañana | Martes: Tarde",
    turnoAlternativa2: "Miércoles: Tarde | Jueves: Noche",
    estado: "ACEPTADA",
    fechaSolicitud: "2023-01-05",
    respuesta: "Se aceptó la solicitud",
    fechaRespuesta: "2023-01-06",
  },
  {
    id: 13579,
    solicitante: {
      id: "3",
      nombre: "Pedro",
      apellido: "Martinez",
      legajo: "13579",
      email: "pedro.martinez@example.com",
      image: "https://example.com/pedro.jpg",
      name: "Pedro Martinez"
    },
    caso: "Ordenanza 1648",
    materias: ["Fisica", "Quimica"],
    justificacion: "La justificacion es que necesito aprobar estas materias para poder avanzar en mi carrera",
    turnoAlternativa1: "Lunes: Tarde | Martes: Noche",
    turnoAlternativa2: "Miércoles: Mañana | Jueves: Tarde",
    estado: "ACEPTADA_CON_CONDICION",
    fechaSolicitud: "2023-01-10",
    respuesta:
      "Se aceptó la solicitud con condiciones, se debera rendir y aprobar los finales de las materias correlativas antes de julio",
    fechaRespuesta: "2023-01-11",
  },
  {
    id: 24680,
    solicitante: {
      id: "4",
      nombre: "Maria",
      apellido: "Fernandez",
      legajo: "24680",
      email: "maria.fernandez@example.com",
      image: "https://example.com/maria.jpg",
      name: "Maria Fernandez"
    },
    caso: "Cambios de carrera",
    materias: ["Matematica", "Historia"],
    justificacion: "La justificacion es que necesito aprobar estas materias para poder avanzar en mi carrera",
    turnoAlternativa1: "Lunes: Mañana | Martes: Tarde",
    turnoAlternativa2: "Miércoles: Tarde | Jueves: Noche",
    estado: "PENDIENTE",
    fechaSolicitud: "2023-01-07",
    respuesta: "",
    fechaRespuesta: "",
  },
];

export type RespuestaInscripcionesEspeciales = {
  solicitudes: InscripcionesEspecialesData[];
  count: number;
  pageIndex: number;
  pageSize: number;
}

export const MOCK_RESPUESTA_MIS_INSCRIPCIONES_ESPECIALES: RespuestaInscripcionesEspeciales = {
  solicitudes: MOCK_INSCRIPCIONES_ESPECIALES,
  count: MOCK_INSCRIPCIONES_ESPECIALES.length,
  pageIndex: 0,
  pageSize: 10,
}
