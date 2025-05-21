
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.LibroScalarFieldEnum = {
  id: 'id',
  bibliotecaId: 'bibliotecaId',
  inventarioId: 'inventarioId',
  titulo: 'titulo',
  anio: 'anio',
  isbn: 'isbn',
  laboratorioId: 'laboratorioId',
  armarioId: 'armarioId',
  estanteId: 'estanteId',
  autorId: 'autorId',
  idiomaId: 'idiomaId',
  editorialId: 'editorialId',
  sedeId: 'sedeId',
  disponible: 'disponible',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.LibroMateriaScalarFieldEnum = {
  libroId: 'libroId',
  materiaId: 'materiaId',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.LibroAutorScalarFieldEnum = {
  id: 'id',
  autorNombre: 'autorNombre',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.LibroIdiomaScalarFieldEnum = {
  id: 'id',
  idioma: 'idioma',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.LibroEditorialScalarFieldEnum = {
  id: 'id',
  editorial: 'editorial',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.CursoScalarFieldEnum = {
  id: 'id',
  horaInicio1: 'horaInicio1',
  duracion1: 'duracion1',
  horaInicio2: 'horaInicio2',
  duracion2: 'duracion2',
  dia1: 'dia1',
  dia2: 'dia2',
  profesorId: 'profesorId',
  anioDeCarrera: 'anioDeCarrera',
  activo: 'activo',
  ac: 'ac',
  sedeId: 'sedeId',
  materiaId: 'materiaId',
  divisionId: 'divisionId',
  turno: 'turno',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.CursoAyudanteScalarFieldEnum = {
  cursoId: 'cursoId',
  userId: 'userId',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId',
  fechaModificacion: 'fechaModificacion',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.DivisionScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  anio: 'anio',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId',
  fechaModificacion: 'fechaModificacion',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.EquipoScalarFieldEnum = {
  id: 'id',
  inventarioId: 'inventarioId',
  modelo: 'modelo',
  numeroSerie: 'numeroSerie',
  observaciones: 'observaciones',
  palabrasClave: 'palabrasClave',
  imagen: 'imagen',
  tipoId: 'tipoId',
  marcaId: 'marcaId',
  sedeId: 'sedeId',
  laboratorioId: 'laboratorioId',
  armarioId: 'armarioId',
  estanteId: 'estanteId',
  estadoId: 'estadoId',
  disponible: 'disponible',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.EquipoMarcaScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.EquipoTipoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  imagen: 'imagen',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.EquipoEstadoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.LaboratorioScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  tienePc: 'tienePc',
  esReservable: 'esReservable',
  incluirEnReporte: 'incluirEnReporte',
  sedeId: 'sedeId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.ArmarioScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  laboratorioId: 'laboratorioId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.EstanteScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  armarioId: 'armarioId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.SoftwareScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  version: 'version',
  estado: 'estado',
  windows: 'windows',
  linux: 'linux',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.SoftwareLaboratorioScalarFieldEnum = {
  softwareId: 'softwareId',
  laboratorioId: 'laboratorioId',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.MailsScalarFieldEnum = {
  id: 'id',
  emisor: 'emisor',
  para: 'para',
  cc: 'cc',
  cco: 'cco',
  contenido: 'contenido',
  asunto: 'asunto',
  fechaEnvio: 'fechaEnvio'
};

exports.Prisma.MateriaScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  codigo: 'codigo',
  anio: 'anio',
  duracion: 'duracion',
  tipo: 'tipo',
  directorUsuarioId: 'directorUsuarioId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.MateriaJefeTpScalarFieldEnum = {
  materiaId: 'materiaId',
  userId: 'userId'
};

exports.Prisma.MateriaCorrelativaScalarFieldEnum = {
  materiaPrerequisitoId: 'materiaPrerequisitoId',
  correlativaId: 'correlativaId',
  estatusCorrelativa: 'estatusCorrelativa',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.ReservaScalarFieldEnum = {
  id: 'id',
  estatus: 'estatus',
  fechaHoraInicio: 'fechaHoraInicio',
  fechaHoraFin: 'fechaHoraFin',
  tipo: 'tipo',
  asistio: 'asistio',
  motivoRechazo: 'motivoRechazo',
  usuarioSolicitoId: 'usuarioSolicitoId',
  usuarioAprobadorId: 'usuarioAprobadorId',
  usuarioRechazadoId: 'usuarioRechazadoId',
  usuarioRenovoId: 'usuarioRenovoId',
  usuarioRecibioId: 'usuarioRecibioId',
  usuarioTutorId: 'usuarioTutorId',
  fechaRenovacion: 'fechaRenovacion',
  fechaAprobacion: 'fechaAprobacion',
  fechaRechazo: 'fechaRechazo',
  fechaRecibido: 'fechaRecibido',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  mostrarEnPantalla: 'mostrarEnPantalla'
};

exports.Prisma.ReservaEquipoScalarFieldEnum = {
  id: 'id',
  fechaEntregado: 'fechaEntregado',
  reservaId: 'reservaId',
  equipoId: 'equipoId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.ReservaLibroScalarFieldEnum = {
  id: 'id',
  fechaEntregado: 'fechaEntregado',
  reservaId: 'reservaId',
  libroId: 'libroId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.ReservaLaboratorioCerradoScalarFieldEnum = {
  id: 'id',
  descripcion: 'descripcion',
  requierePC: 'requierePC',
  requiereProyector: 'requiereProyector',
  reservaId: 'reservaId',
  sedeId: 'sedeId',
  laboratorioId: 'laboratorioId',
  cursoId: 'cursoId',
  esDiscrecional: 'esDiscrecional',
  discrecionalTitulo: 'discrecionalTitulo',
  discrecionalMateriaId: 'discrecionalMateriaId',
  discrecionalDocenteId: 'discrecionalDocenteId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.ReservaLaboratorioCerradoEquipoScalarFieldEnum = {
  id: 'id',
  cantidad: 'cantidad',
  reservaLaboratorioCerradoId: 'reservaLaboratorioCerradoId',
  equipoId: 'equipoId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.ReservaLaboratorioAbiertoScalarFieldEnum = {
  id: 'id',
  especialidad: 'especialidad',
  descripcion: 'descripcion',
  concurrentes: 'concurrentes',
  laboratorioAbiertoTipo: 'laboratorioAbiertoTipo',
  reservaId: 'reservaId',
  sedeId: 'sedeId',
  laboratorioId: 'laboratorioId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.ReservaLaboratorioAbiertoEquipoScalarFieldEnum = {
  id: 'id',
  cantidad: 'cantidad',
  reservaLaboratorioAbiertoId: 'reservaLaboratorioAbiertoId',
  equipoId: 'equipoId',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.PantallaScalarFieldEnum = {
  id: 'id',
  sedeId: 'sedeId',
  docente: 'docente',
  materia: 'materia',
  laboratorio: 'laboratorio',
  fechaHoraInicio: 'fechaHoraInicio',
  fechaHoraFin: 'fechaHoraFin',
  usuarioCreadorId: 'usuarioCreadorId',
  fechaCreacion: 'fechaCreacion'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  refresh_expires_in: 'refresh_expires_in',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  refresh_token_expires_in: 'refresh_token_expires_in'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.SedeScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  nombre: 'nombre',
  apellido: 'apellido',
  fechaNacimiento: 'fechaNacimiento',
  direccion: 'direccion',
  piso: 'piso',
  departamento: 'departamento',
  ciudad: 'ciudad',
  codigoPostal: 'codigoPostal',
  telefonoCasa: 'telefonoCasa',
  telefonoCelular: 'telefonoCelular',
  telefonoLaboral: 'telefonoLaboral',
  documentoNumero: 'documentoNumero',
  legajo: 'legajo',
  gitlab: 'gitlab',
  penalizaciones: 'penalizaciones',
  esDocente: 'esDocente',
  esTutor: 'esTutor',
  fechaRegistro: 'fechaRegistro',
  fechaUltimoAcceso: 'fechaUltimoAcceso',
  fechaUltimaActualizacion: 'fechaUltimaActualizacion',
  documentoTipoId: 'documentoTipoId',
  provinciaIso: 'provinciaIso',
  paisIso: 'paisIso'
};

exports.Prisma.TutorScalarFieldEnum = {
  userId: 'userId',
  diasHorarios: 'diasHorarios',
  activo: 'activo',
  especialidad: 'especialidad',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.UsuarioRolScalarFieldEnum = {
  userId: 'userId',
  rolId: 'rolId',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.RolScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.RolPermisoScalarFieldEnum = {
  rolId: 'rolId',
  permisoId: 'permisoId',
  fechaCreacion: 'fechaCreacion',
  usuarioCreadorId: 'usuarioCreadorId'
};

exports.Prisma.PermisoScalarFieldEnum = {
  id: 'id',
  sgeNombre: 'sgeNombre',
  nombre: 'nombre',
  rubro: 'rubro',
  incluido: 'incluido',
  fechaCreacion: 'fechaCreacion',
  fechaModificacion: 'fechaModificacion',
  usuarioCreadorId: 'usuarioCreadorId',
  usuarioModificadorId: 'usuarioModificadorId'
};

exports.Prisma.ProvinciaScalarFieldEnum = {
  iso: 'iso',
  nombre: 'nombre',
  paisIso: 'paisIso'
};

exports.Prisma.PaisScalarFieldEnum = {
  iso: 'iso',
  nombreEspanol: 'nombreEspanol',
  nombreIngles: 'nombreIngles',
  iso3: 'iso3',
  codigoNumerico: 'codigoNumerico'
};

exports.Prisma.DocumentoTipoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.CursoDia = exports.$Enums.CursoDia = {
  LUNES: 'LUNES',
  MARTES: 'MARTES',
  MIERCOLES: 'MIERCOLES',
  JUEVES: 'JUEVES',
  VIERNES: 'VIERNES',
  SABADO: 'SABADO',
  DOMINGO: 'DOMINGO'
};

exports.TurnoCurso = exports.$Enums.TurnoCurso = {
  MANANA: 'MANANA',
  TARDE: 'TARDE',
  NOCHE: 'NOCHE'
};

exports.MateriaDuracion = exports.$Enums.MateriaDuracion = {
  ANUAL: 'ANUAL',
  CUATRIMESTRAL: 'CUATRIMESTRAL',
  AMBOS: 'AMBOS'
};

exports.MateriaTipo = exports.$Enums.MateriaTipo = {
  INTEGRADORA: 'INTEGRADORA',
  OBLIGATORIA: 'OBLIGATORIA',
  ELECTIVA: 'ELECTIVA'
};

exports.EstatusCorrelativa = exports.$Enums.EstatusCorrelativa = {
  CURSAR_REGULARIZADA: 'CURSAR_REGULARIZADA',
  CURSAR_APROBADA: 'CURSAR_APROBADA',
  RENDIR_APROBADA: 'RENDIR_APROBADA'
};

exports.ReservaEstatus = exports.$Enums.ReservaEstatus = {
  PENDIENTE: 'PENDIENTE',
  FINALIZADA: 'FINALIZADA',
  CANCELADA: 'CANCELADA',
  RECHAZADA: 'RECHAZADA'
};

exports.ReservaTipo = exports.$Enums.ReservaTipo = {
  LABORATORIO_ABIERTO: 'LABORATORIO_ABIERTO',
  LABORATORIO_CERRADO: 'LABORATORIO_CERRADO',
  INVENTARIO: 'INVENTARIO',
  LIBRO: 'LIBRO'
};

exports.LaboratorioAbiertoTipo = exports.$Enums.LaboratorioAbiertoTipo = {
  LA: 'LA',
  TLA_BASICA: 'TLA_BASICA',
  TLA: 'TLA'
};

exports.SgeNombre = exports.$Enums.SgeNombre = {
  ADMIN_QUERY: 'ADMIN_QUERY',
  ADMIN_MODIFICAR_ATRIBUTOS: 'ADMIN_MODIFICAR_ATRIBUTOS',
  ADMIN_MODIFICAR_ATRIBUTOS_ADMIN: 'ADMIN_MODIFICAR_ATRIBUTOS_ADMIN',
  ADMIN_VER_PANEL_ADMIN: 'ADMIN_VER_PANEL_ADMIN',
  ADMIN_ABM_USUARIOS: 'ADMIN_ABM_USUARIOS',
  ADMIN_ES_ALUMNO: 'ADMIN_ES_ALUMNO',
  ADMIN_ES_DOCENTE: 'ADMIN_ES_DOCENTE',
  ADMIN_ACCESO_SVN: 'ADMIN_ACCESO_SVN',
  ADMIN_ES_TUTOR: 'ADMIN_ES_TUTOR',
  ADMIN_ES_PANOL: 'ADMIN_ES_PANOL',
  ADMIN_ES_CONSEJERO: 'ADMIN_ES_CONSEJERO',
  ADMIN_ES_ADMINISTRADOR_WEB: 'ADMIN_ES_ADMINISTRADOR_WEB',
  ADMIN_ACTUALIZAR_ACTA_CONSEJEROS: 'ADMIN_ACTUALIZAR_ACTA_CONSEJEROS',
  ADMIN_VER_RESULTADOS_ACTA: 'ADMIN_VER_RESULTADOS_ACTA',
  ADMIN_VER_NOTIFICACIONES_INDEX: 'ADMIN_VER_NOTIFICACIONES_INDEX',
  ADMIN_VER_FICHA_USUARIO: 'ADMIN_VER_FICHA_USUARIO',
  ADMIN_AGREGAR_USUARIOS_A_GRUPOS: 'ADMIN_AGREGAR_USUARIOS_A_GRUPOS',
  ADMIN_OFERTAS_LABORALES_ABM: 'ADMIN_OFERTAS_LABORALES_ABM',
  RES_LAB_RESERVAR_CURSO_AUTO: 'RES_LAB_RESERVAR_CURSO_AUTO',
  RES_LAB_VER_RESERVAS_CURSO_AUTO: 'RES_LAB_VER_RESERVAS_CURSO_AUTO',
  RES_LAB_REALIZAR_RESERVA_DISCRECIONAL: 'RES_LAB_REALIZAR_RESERVA_DISCRECIONAL',
  RES_LAB_CONFIRMAR_RESERVAS: 'RES_LAB_CONFIRMAR_RESERVAS',
  RES_LAB_VER_TODO_RESERVAS: 'RES_LAB_VER_TODO_RESERVAS',
  RES_LAB_VER_RESERVAS_GENERALES_DOCENTES: 'RES_LAB_VER_RESERVAS_GENERALES_DOCENTES',
  RES_LAB_RESERVAR_CATEDRA_AUTO: 'RES_LAB_RESERVAR_CATEDRA_AUTO',
  RES_LAB_VER_RESERVAS_CATEDRA: 'RES_LAB_VER_RESERVAS_CATEDRA',
  RES_LAB_ABM_PANTALLA: 'RES_LAB_ABM_PANTALLA',
  APLICACIONES_VER_LISTADO: 'APLICACIONES_VER_LISTADO',
  APLICACIONES_ABM: 'APLICACIONES_ABM',
  LABORATORIOS_ABM: 'LABORATORIOS_ABM',
  APLICACIONES_CARGAR_PRACTICA_AUTO: 'APLICACIONES_CARGAR_PRACTICA_AUTO',
  LAB_ABIERTO_RESERVAR: 'LAB_ABIERTO_RESERVAR',
  LAB_ABIERTO_VER_MIS_RESERVAS: 'LAB_ABIERTO_VER_MIS_RESERVAS',
  LAB_ABIERTO_VER_PLANILLA_TUTORES: 'LAB_ABIERTO_VER_PLANILLA_TUTORES',
  LAB_ABIERTO_CONFIRMAR_RESERVAS: 'LAB_ABIERTO_CONFIRMAR_RESERVAS',
  LAB_ABIERTO_SUSPENDER_ALUMNO: 'LAB_ABIERTO_SUSPENDER_ALUMNO',
  LAB_ABIERTO_DESSUSPENDER_ALUMNO: 'LAB_ABIERTO_DESSUSPENDER_ALUMNO',
  LAB_ABIERTO_TUTORES_ABM: 'LAB_ABIERTO_TUTORES_ABM',
  MATERIAS_ABM: 'MATERIAS_ABM',
  MATERIAS_VER_LISTADO: 'MATERIAS_VER_LISTADO',
  MATERIAS_ADMINISTRAR_CORRELATIVA: 'MATERIAS_ADMINISTRAR_CORRELATIVA',
  CURSOS_MOSTRAR_TODOS: 'CURSOS_MOSTRAR_TODOS',
  CURSOS_ABM: 'CURSOS_ABM',
  CURSOS_VER_MIS_CURSOS_AUTO: 'CURSOS_VER_MIS_CURSOS_AUTO',
  DIVISIONES_ABM: 'DIVISIONES_ABM',
  DIVISIONES_VER_LISTADO: 'DIVISIONES_VER_LISTADO',
  ARMARIOS_ABM: 'ARMARIOS_ABM',
  ESTANTES_ABM: 'ESTANTES_ABM',
  EQUIPOS_ABM: 'EQUIPOS_ABM',
  EQUIPOS_VER_LISTADO: 'EQUIPOS_VER_LISTADO',
  EQUIPOS_BUSCAR_EQUIPO: 'EQUIPOS_BUSCAR_EQUIPO',
  EQUIPOS_REPORTE_ARMARIO: 'EQUIPOS_REPORTE_ARMARIO',
  EQUIPOS_REPORTE_TIPO: 'EQUIPOS_REPORTE_TIPO',
  EQUIPOS_ADMIN_VER_UBICACION: 'EQUIPOS_ADMIN_VER_UBICACION',
  EQUIPOS_REPORTE_LABORATORIO: 'EQUIPOS_REPORTE_LABORATORIO',
  EQUIPOS_ABM_MANUALES: 'EQUIPOS_ABM_MANUALES',
  EQUIPOS_PRESTAMO_PRESTAR: 'EQUIPOS_PRESTAMO_PRESTAR',
  EQUIPOS_PRESTAMO_VER_PRESTAMOS: 'EQUIPOS_PRESTAMO_VER_PRESTAMOS',
  EQUIPOS_PRESTAMO_VER_MIS_PRESTAMOS: 'EQUIPOS_PRESTAMO_VER_MIS_PRESTAMOS',
  EQUIPOS_TIPO_ABM: 'EQUIPOS_TIPO_ABM',
  BIBLIOTECA_ABM_LIBRO: 'BIBLIOTECA_ABM_LIBRO',
  BIBLIOTECA_VER_LISTADO: 'BIBLIOTECA_VER_LISTADO',
  BIBLIOTECA_BUSCAR_LIBRO: 'BIBLIOTECA_BUSCAR_LIBRO',
  BIBLIOTECA_VER_DETALLES_LIBRO: 'BIBLIOTECA_VER_DETALLES_LIBRO',
  BIBLIOTECA_EDITORIALES_ABM: 'BIBLIOTECA_EDITORIALES_ABM',
  BIBLIOTECA_PRESTAMO_PRESTAR: 'BIBLIOTECA_PRESTAMO_PRESTAR',
  BIBLIOTECA_PRESTAMO_VER_PRESTAMOS: 'BIBLIOTECA_PRESTAMO_VER_PRESTAMOS',
  BIBLIOTECA_PRESTAMO_VER_MIS_PRESTAMOS: 'BIBLIOTECA_PRESTAMO_VER_MIS_PRESTAMOS',
  CONV_ELECTROCOMPONENTES_REQUERIR_CERTIFICADO: 'CONV_ELECTROCOMPONENTES_REQUERIR_CERTIFICADO',
  CONV_ELECTROCOMPONENTES_VER_DETALLES: 'CONV_ELECTROCOMPONENTES_VER_DETALLES',
  CONV_ELECTROCOMPONENTES_ADMIN_CERTIFICADOS: 'CONV_ELECTROCOMPONENTES_ADMIN_CERTIFICADOS',
  CONV_ELECTROCOMPONENTES_ELIMINAR_CERTIFICADO: 'CONV_ELECTROCOMPONENTES_ELIMINAR_CERTIFICADO',
  CONV_MAYER_REQUERIR_CERTIFICADO: 'CONV_MAYER_REQUERIR_CERTIFICADO',
  CONV_MAYER_VER_MIS_PEDIDOS: 'CONV_MAYER_VER_MIS_PEDIDOS',
  CONV_MAYER_ENVIAR_RESUMEN: 'CONV_MAYER_ENVIAR_RESUMEN',
  CONV_MAYER_ADMIN_PEDIDOS: 'CONV_MAYER_ADMIN_PEDIDOS',
  REP_FALLAS_BUSCAR_REP_FALLAS: 'REP_FALLAS_BUSCAR_REP_FALLAS',
  REP_FALLAS_REPORTAR_FALLAS: 'REP_FALLAS_REPORTAR_FALLAS',
  REP_FALLAS_ADMIN_REP_FALLAS: 'REP_FALLAS_ADMIN_REP_FALLAS',
  ACTIVIDADES_USUARIO_SGE_PUBLICAR_ADMIN: 'ACTIVIDADES_USUARIO_SGE_PUBLICAR_ADMIN',
  ACTIVIDADES_USUARIO_SGE_VER_PUBLICACIONES: 'ACTIVIDADES_USUARIO_SGE_VER_PUBLICACIONES',
  ACTIVIDADES_ABIERTAS_PUBLICAR_ADMIN: 'ACTIVIDADES_ABIERTAS_PUBLICAR_ADMIN',
  ACTIVIDADES_ABIERTAS_VER_PUBLICACIONES: 'ACTIVIDADES_ABIERTAS_VER_PUBLICACIONES'
};

exports.Prisma.ModelName = {
  Libro: 'Libro',
  LibroMateria: 'LibroMateria',
  LibroAutor: 'LibroAutor',
  LibroIdioma: 'LibroIdioma',
  LibroEditorial: 'LibroEditorial',
  Curso: 'Curso',
  CursoAyudante: 'CursoAyudante',
  Division: 'Division',
  Equipo: 'Equipo',
  EquipoMarca: 'EquipoMarca',
  EquipoTipo: 'EquipoTipo',
  EquipoEstado: 'EquipoEstado',
  Laboratorio: 'Laboratorio',
  Armario: 'Armario',
  Estante: 'Estante',
  Software: 'Software',
  SoftwareLaboratorio: 'SoftwareLaboratorio',
  Mails: 'Mails',
  Materia: 'Materia',
  MateriaJefeTp: 'MateriaJefeTp',
  MateriaCorrelativa: 'MateriaCorrelativa',
  Reserva: 'Reserva',
  ReservaEquipo: 'ReservaEquipo',
  ReservaLibro: 'ReservaLibro',
  ReservaLaboratorioCerrado: 'ReservaLaboratorioCerrado',
  ReservaLaboratorioCerradoEquipo: 'ReservaLaboratorioCerradoEquipo',
  ReservaLaboratorioAbierto: 'ReservaLaboratorioAbierto',
  ReservaLaboratorioAbiertoEquipo: 'ReservaLaboratorioAbiertoEquipo',
  Pantalla: 'Pantalla',
  Account: 'Account',
  Session: 'Session',
  VerificationToken: 'VerificationToken',
  Sede: 'Sede',
  User: 'User',
  Tutor: 'Tutor',
  UsuarioRol: 'UsuarioRol',
  Rol: 'Rol',
  RolPermiso: 'RolPermiso',
  Permiso: 'Permiso',
  Provincia: 'Provincia',
  Pais: 'Pais',
  DocumentoTipo: 'DocumentoTipo'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
