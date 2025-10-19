export type InscripcionEspecialData = {
  id: number;
  solicitante: {
    id: string;
    nombre: string | null;
    apellido: string | null;
    legajo: string | null;
    email: string;
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
  fechaSolicitud: string;
  fechaRespuesta: string;
  vinoPresencialmente?: boolean | null;
  fueContactado?: boolean | null;
};
