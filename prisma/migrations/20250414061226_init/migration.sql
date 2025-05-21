-- CreateEnum
CREATE TYPE "TurnoCurso" AS ENUM ('MANANA', 'TARDE', 'NOCHE');

-- CreateEnum
CREATE TYPE "CursoDia" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');

-- CreateEnum
CREATE TYPE "MateriaDuracion" AS ENUM ('ANUAL', 'CUATRIMESTRAL', 'AMBOS');

-- CreateEnum
CREATE TYPE "MateriaTipo" AS ENUM ('INTEGRADORA', 'OBLIGATORIA', 'ELECTIVA');

-- CreateEnum
CREATE TYPE "EstatusCorrelativa" AS ENUM ('CURSAR_REGULARIZADA', 'CURSAR_APROBADA', 'RENDIR_APROBADA');

-- CreateEnum
CREATE TYPE "SgeNombre" AS ENUM ('ADMIN_QUERY', 'ADMIN_MODIFICAR_ATRIBUTOS', 'ADMIN_MODIFICAR_ATRIBUTOS_ADMIN', 'ADMIN_VER_PANEL_ADMIN', 'ADMIN_ABM_USUARIOS', 'ADMIN_ES_ALUMNO', 'ADMIN_ES_DOCENTE', 'ADMIN_ACCESO_SVN', 'ADMIN_ES_TUTOR', 'ADMIN_ES_PANOL', 'ADMIN_ES_CONSEJERO', 'ADMIN_ES_ADMINISTRADOR_WEB', 'ADMIN_ACTUALIZAR_ACTA_CONSEJEROS', 'ADMIN_VER_RESULTADOS_ACTA', 'ADMIN_VER_NOTIFICACIONES_INDEX', 'ADMIN_VER_FICHA_USUARIO', 'ADMIN_AGREGAR_USUARIOS_A_GRUPOS', 'ADMIN_OFERTAS_LABORALES_ABM', 'RES_LAB_RESERVAR_CURSO_AUTO', 'RES_LAB_VER_RESERVAS_CURSO_AUTO', 'RES_LAB_REALIZAR_RESERVA_DISCRECIONAL', 'RES_LAB_CONFIRMAR_RESERVAS', 'RES_LAB_VER_TODO_RESERVAS', 'RES_LAB_VER_RESERVAS_GENERALES_DOCENTES', 'RES_LAB_RESERVAR_CATEDRA_AUTO', 'RES_LAB_VER_RESERVAS_CATEDRA', 'RES_LAB_ABM_PANTALLA', 'APLICACIONES_VER_LISTADO', 'APLICACIONES_ABM', 'LABORATORIOS_ABM', 'APLICACIONES_CARGAR_PRACTICA_AUTO', 'LAB_ABIERTO_RESERVAR', 'LAB_ABIERTO_VER_MIS_RESERVAS', 'LAB_ABIERTO_VER_PLANILLA_TUTORES', 'LAB_ABIERTO_CONFIRMAR_RESERVAS', 'LAB_ABIERTO_SUSPENDER_ALUMNO', 'LAB_ABIERTO_DESSUSPENDER_ALUMNO', 'LAB_ABIERTO_TUTORES_ABM', 'MATERIAS_ABM', 'MATERIAS_VER_LISTADO', 'MATERIAS_ADMINISTRAR_CORRELATIVA', 'CURSOS_MOSTRAR_TODOS', 'CURSOS_ABM', 'CURSOS_VER_MIS_CURSOS_AUTO', 'DIVISIONES_ABM', 'DIVISIONES_VER_LISTADO', 'ARMARIOS_ABM', 'ESTANTES_ABM', 'EQUIPOS_ABM', 'EQUIPOS_VER_LISTADO', 'EQUIPOS_BUSCAR_EQUIPO', 'EQUIPOS_REPORTE_ARMARIO', 'EQUIPOS_REPORTE_TIPO', 'EQUIPOS_ADMIN_VER_UBICACION', 'EQUIPOS_REPORTE_LABORATORIO', 'EQUIPOS_ABM_MANUALES', 'EQUIPOS_PRESTAMO_PRESTAR', 'EQUIPOS_PRESTAMO_VER_PRESTAMOS', 'EQUIPOS_PRESTAMO_VER_MIS_PRESTAMOS', 'EQUIPOS_TIPO_ABM', 'BIBLIOTECA_ABM_LIBRO', 'BIBLIOTECA_VER_LISTADO', 'BIBLIOTECA_BUSCAR_LIBRO', 'BIBLIOTECA_VER_DETALLES_LIBRO', 'BIBLIOTECA_EDITORIALES_ABM', 'BIBLIOTECA_PRESTAMO_PRESTAR', 'BIBLIOTECA_PRESTAMO_VER_PRESTAMOS', 'BIBLIOTECA_PRESTAMO_VER_MIS_PRESTAMOS', 'CONV_ELECTROCOMPONENTES_REQUERIR_CERTIFICADO', 'CONV_ELECTROCOMPONENTES_VER_DETALLES', 'CONV_ELECTROCOMPONENTES_ADMIN_CERTIFICADOS', 'CONV_ELECTROCOMPONENTES_ELIMINAR_CERTIFICADO', 'CONV_MAYER_REQUERIR_CERTIFICADO', 'CONV_MAYER_VER_MIS_PEDIDOS', 'CONV_MAYER_ENVIAR_RESUMEN', 'CONV_MAYER_ADMIN_PEDIDOS', 'REP_FALLAS_BUSCAR_REP_FALLAS', 'REP_FALLAS_REPORTAR_FALLAS', 'REP_FALLAS_ADMIN_REP_FALLAS', 'ACTIVIDADES_USUARIO_SGE_PUBLICAR_ADMIN', 'ACTIVIDADES_USUARIO_SGE_VER_PUBLICACIONES', 'ACTIVIDADES_ABIERTAS_PUBLICAR_ADMIN', 'ACTIVIDADES_ABIERTAS_VER_PUBLICACIONES');

-- CreateEnum
CREATE TYPE "ReservaEstatus" AS ENUM ('PENDIENTE', 'FINALIZADA', 'CANCELADA', 'RECHAZADA');

-- CreateEnum
CREATE TYPE "ReservaTipo" AS ENUM ('LABORATORIO_ABIERTO', 'LABORATORIO_CERRADO', 'INVENTARIO', 'LIBRO');

-- CreateEnum
CREATE TYPE "LaboratorioAbiertoTipo" AS ENUM ('LA', 'TLA_BASICA', 'TLA');

-- CreateTable
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "bibliotecaId" TEXT,
    "inventarioId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "isbn" TEXT,
    "laboratorioId" INTEGER NOT NULL,
    "armarioId" INTEGER,
    "estanteId" INTEGER,
    "autorId" INTEGER NOT NULL,
    "idiomaId" INTEGER NOT NULL,
    "editorialId" INTEGER NOT NULL,
    "sedeId" INTEGER NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibroMateria" (
    "libroId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "LibroMateria_pkey" PRIMARY KEY ("libroId","materiaId")
);

-- CreateTable
CREATE TABLE "LibroAutor" (
    "id" SERIAL NOT NULL,
    "autorNombre" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "LibroAutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibroIdioma" (
    "id" SERIAL NOT NULL,
    "idioma" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "LibroIdioma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibroEditorial" (
    "id" SERIAL NOT NULL,
    "editorial" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "LibroEditorial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "horaInicio1" TEXT NOT NULL,
    "duracion1" TEXT NOT NULL,
    "horaInicio2" TEXT,
    "duracion2" TEXT,
    "dia1" "CursoDia" NOT NULL,
    "dia2" "CursoDia",
    "profesorId" TEXT NOT NULL,
    "anioDeCarrera" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL,
    "ac" TEXT NOT NULL,
    "sedeId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "turno" "TurnoCurso" NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursoAyudante" (
    "cursoId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "CursoAyudante_pkey" PRIMARY KEY ("cursoId","userId")
);

-- CreateTable
CREATE TABLE "Division" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipo" (
    "id" SERIAL NOT NULL,
    "inventarioId" TEXT NOT NULL,
    "modelo" TEXT,
    "numeroSerie" TEXT,
    "observaciones" TEXT,
    "palabrasClave" TEXT,
    "imagen" TEXT,
    "tipoId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,
    "sedeId" INTEGER NOT NULL,
    "laboratorioId" INTEGER NOT NULL,
    "armarioId" INTEGER,
    "estanteId" INTEGER,
    "estadoId" INTEGER NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipoMarca" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "EquipoMarca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipoTipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "EquipoTipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipoEstado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "EquipoEstado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laboratorio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tienePc" BOOLEAN NOT NULL DEFAULT false,
    "esReservable" BOOLEAN NOT NULL DEFAULT false,
    "incluirEnReporte" BOOLEAN NOT NULL DEFAULT false,
    "sedeId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Laboratorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "laboratorioId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Armario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "armarioId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Estante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Software" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "windows" BOOLEAN NOT NULL DEFAULT true,
    "linux" BOOLEAN NOT NULL DEFAULT false,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftwareLaboratorio" (
    "softwareId" INTEGER NOT NULL,
    "laboratorioId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "SoftwareLaboratorio_pkey" PRIMARY KEY ("softwareId","laboratorioId")
);

-- CreateTable
CREATE TABLE "Mails" (
    "id" SERIAL NOT NULL,
    "emisor" TEXT NOT NULL,
    "para" TEXT NOT NULL,
    "cc" TEXT NOT NULL,
    "cco" TEXT NOT NULL,
    "contenido" JSONB NOT NULL,
    "asunto" TEXT NOT NULL,
    "fechaEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "duracion" "MateriaDuracion" NOT NULL,
    "tipo" "MateriaTipo" NOT NULL,
    "directorUsuarioId" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaJefeTp" (
    "materiaId" INTEGER NOT NULL,
    "jefeTrabajoPracticoUsuarioId" TEXT NOT NULL,

    CONSTRAINT "MateriaJefeTp_pkey" PRIMARY KEY ("materiaId","jefeTrabajoPracticoUsuarioId")
);

-- CreateTable
CREATE TABLE "MateriaCorrelativa" (
    "materiaPrerequisitoId" INTEGER NOT NULL,
    "correlativaId" INTEGER NOT NULL,
    "estatusCorrelativa" "EstatusCorrelativa" NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "MateriaCorrelativa_pkey" PRIMARY KEY ("estatusCorrelativa","materiaPrerequisitoId","correlativaId")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "estatus" "ReservaEstatus" NOT NULL,
    "fechaHoraInicio" TIMESTAMP(3) NOT NULL,
    "fechaHoraFin" TIMESTAMP(3) NOT NULL,
    "tipo" "ReservaTipo" NOT NULL,
    "asistio" BOOLEAN NOT NULL DEFAULT true,
    "motivoRechazo" TEXT,
    "usuarioSolicitoId" TEXT NOT NULL,
    "usuarioAprobadorId" TEXT,
    "usuarioRechazadoId" TEXT,
    "usuarioRenovoId" TEXT,
    "usuarioRecibioId" TEXT,
    "usuarioTutorId" TEXT,
    "fechaRenovacion" TIMESTAMP(3),
    "fechaAprobacion" TIMESTAMP(3),
    "fechaRechazo" TIMESTAMP(3),
    "fechaRecibido" TIMESTAMP(3),
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL,
    "mostrarEnPantalla" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaEquipo" (
    "id" SERIAL NOT NULL,
    "fechaEntregado" TIMESTAMP(3) NOT NULL,
    "reservaId" INTEGER NOT NULL,
    "equipoId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "ReservaEquipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaLibro" (
    "id" SERIAL NOT NULL,
    "fechaEntregado" TIMESTAMP(3) NOT NULL,
    "reservaId" INTEGER NOT NULL,
    "libroId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "ReservaLibro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaLaboratorioCerrado" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL DEFAULT '',
    "requierePC" BOOLEAN NOT NULL DEFAULT false,
    "requiereProyector" BOOLEAN NOT NULL DEFAULT false,
    "reservaId" INTEGER NOT NULL,
    "sedeId" INTEGER NOT NULL,
    "laboratorioId" INTEGER,
    "cursoId" INTEGER,
    "esDiscrecional" BOOLEAN NOT NULL DEFAULT false,
    "discrecionalTitulo" TEXT NOT NULL DEFAULT '',
    "discrecionalMateriaId" INTEGER,
    "discrecionalDocenteId" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "ReservaLaboratorioCerrado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaLaboratorioCerradoEquipo" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "reservaLaboratorioCerradoId" INTEGER NOT NULL,
    "equipoId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "ReservaLaboratorioCerradoEquipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaLaboratorioAbierto" (
    "id" SERIAL NOT NULL,
    "especialidad" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL DEFAULT '',
    "concurrentes" INTEGER NOT NULL,
    "laboratorioAbiertoTipo" "LaboratorioAbiertoTipo" NOT NULL,
    "reservaId" INTEGER NOT NULL,
    "sedeId" INTEGER NOT NULL,
    "laboratorioId" INTEGER,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "ReservaLaboratorioAbierto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaLaboratorioAbiertoEquipo" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "reservaLaboratorioAbiertoId" INTEGER NOT NULL,
    "equipoId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "ReservaLaboratorioAbiertoEquipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pantalla" (
    "id" SERIAL NOT NULL,
    "sedeId" INTEGER NOT NULL,
    "docente" TEXT NOT NULL,
    "materia" TEXT,
    "laboratorio" TEXT,
    "fechaHoraInicio" TIMESTAMP(3) NOT NULL,
    "fechaHoraFin" TIMESTAMP(3) NOT NULL,
    "usuarioCreadorId" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pantalla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "refresh_expires_in" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Sede" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Sede_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN,
    "image" TEXT NOT NULL DEFAULT '/default-avatar.svg',
    "nombre" TEXT,
    "apellido" TEXT,
    "fechaNacimiento" DATE,
    "direccion" TEXT,
    "piso" TEXT,
    "departamento" TEXT,
    "ciudad" TEXT,
    "codigoPostal" TEXT,
    "telefonoCasa" TEXT,
    "telefonoCelular" TEXT,
    "telefonoLaboral" TEXT,
    "documentoNumero" TEXT,
    "legajo" TEXT,
    "gitlab" TEXT,
    "penalizaciones" INTEGER NOT NULL DEFAULT 0,
    "esDocente" BOOLEAN NOT NULL DEFAULT false,
    "esTutor" BOOLEAN NOT NULL DEFAULT false,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaUltimoAcceso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaUltimaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentoTipoId" INTEGER,
    "provinciaIso" TEXT,
    "paisIso" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "userId" TEXT NOT NULL,
    "diasHorarios" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL,
    "especialidad" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UsuarioRol" (
    "userId" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("userId","rolId")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolPermiso" (
    "rolId" INTEGER NOT NULL,
    "permisoId" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,

    CONSTRAINT "RolPermiso_pkey" PRIMARY KEY ("rolId","permisoId")
);

-- CreateTable
CREATE TABLE "Permiso" (
    "id" SERIAL NOT NULL,
    "sgeNombre" "SgeNombre" NOT NULL,
    "nombre" TEXT NOT NULL,
    "rubro" TEXT NOT NULL,
    "incluido" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCreadorId" TEXT NOT NULL,
    "usuarioModificadorId" TEXT NOT NULL,

    CONSTRAINT "Permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "iso" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "paisIso" TEXT NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("iso","paisIso")
);

-- CreateTable
CREATE TABLE "Pais" (
    "iso" TEXT NOT NULL,
    "nombreEspanol" TEXT NOT NULL,
    "nombreIngles" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "codigoNumerico" INTEGER NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("iso")
);

-- CreateTable
CREATE TABLE "DocumentoTipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "DocumentoTipo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Libro_inventarioId_key" ON "Libro"("inventarioId");

-- CreateIndex
CREATE INDEX "Libro_titulo_idx" ON "Libro"("titulo" ASC);

-- CreateIndex
CREATE INDEX "Libro_anio_idx" ON "Libro"("anio" DESC);

-- CreateIndex
CREATE INDEX "Libro_bibliotecaId_idx" ON "Libro"("bibliotecaId");

-- CreateIndex
CREATE INDEX "Libro_inventarioId_idx" ON "Libro"("inventarioId");

-- CreateIndex
CREATE UNIQUE INDEX "LibroAutor_autorNombre_key" ON "LibroAutor"("autorNombre");

-- CreateIndex
CREATE INDEX "LibroAutor_autorNombre_idx" ON "LibroAutor"("autorNombre" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "LibroIdioma_idioma_key" ON "LibroIdioma"("idioma");

-- CreateIndex
CREATE INDEX "LibroIdioma_idioma_idx" ON "LibroIdioma"("idioma" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "LibroEditorial_editorial_key" ON "LibroEditorial"("editorial");

-- CreateIndex
CREATE INDEX "LibroEditorial_editorial_idx" ON "LibroEditorial"("editorial" ASC);

-- CreateIndex
CREATE INDEX "Curso_anioDeCarrera_idx" ON "Curso"("anioDeCarrera" ASC);

-- CreateIndex
CREATE INDEX "Curso_activo_idx" ON "Curso" USING HASH ("activo");

-- CreateIndex
CREATE INDEX "Curso_turno_idx" ON "Curso" USING HASH ("turno");

-- CreateIndex
CREATE UNIQUE INDEX "Division_nombre_key" ON "Division"("nombre");

-- CreateIndex
CREATE INDEX "Division_anio_idx" ON "Division"("anio" ASC);

-- CreateIndex
CREATE INDEX "Division_nombre_idx" ON "Division"("nombre" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_inventarioId_key" ON "Equipo"("inventarioId");

-- CreateIndex
CREATE INDEX "Equipo_modelo_idx" ON "Equipo"("modelo" ASC);

-- CreateIndex
CREATE INDEX "Equipo_numeroSerie_idx" ON "Equipo"("numeroSerie" ASC);

-- CreateIndex
CREATE INDEX "EquipoMarca_nombre_idx" ON "EquipoMarca"("nombre" ASC);

-- CreateIndex
CREATE INDEX "EquipoTipo_nombre_idx" ON "EquipoTipo"("nombre" ASC);

-- CreateIndex
CREATE INDEX "EquipoEstado_nombre_idx" ON "EquipoEstado"("nombre" ASC);

-- CreateIndex
CREATE INDEX "Laboratorio_nombre_idx" ON "Laboratorio"("nombre" ASC);

-- CreateIndex
CREATE INDEX "Laboratorio_tienePc_idx" ON "Laboratorio" USING HASH ("tienePc");

-- CreateIndex
CREATE INDEX "Laboratorio_esReservable_idx" ON "Laboratorio" USING HASH ("esReservable");

-- CreateIndex
CREATE UNIQUE INDEX "Mails_id_key" ON "Mails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_codigo_key" ON "Materia"("codigo");

-- CreateIndex
CREATE INDEX "Materia_nombre_idx" ON "Materia"("nombre" ASC);

-- CreateIndex
CREATE INDEX "Materia_anio_idx" ON "Materia"("anio" ASC);

-- CreateIndex
CREATE INDEX "Materia_duracion_idx" ON "Materia"("duracion");

-- CreateIndex
CREATE INDEX "Materia_tipo_idx" ON "Materia"("tipo");

-- CreateIndex
CREATE INDEX "Reserva_tipo_idx" ON "Reserva" USING HASH ("tipo");

-- CreateIndex
CREATE INDEX "Reserva_estatus_idx" ON "Reserva" USING HASH ("estatus");

-- CreateIndex
CREATE INDEX "Reserva_usuarioSolicitoId_idx" ON "Reserva" USING HASH ("usuarioSolicitoId");

-- CreateIndex
CREATE INDEX "Reserva_fechaHoraInicio_idx" ON "Reserva"("fechaHoraInicio" ASC);

-- CreateIndex
CREATE INDEX "Reserva_fechaHoraFin_idx" ON "Reserva"("fechaHoraFin" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ReservaEquipo_reservaId_key" ON "ReservaEquipo"("reservaId");

-- CreateIndex
CREATE INDEX "ReservaEquipo_fechaEntregado_idx" ON "ReservaEquipo"("fechaEntregado" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ReservaLibro_reservaId_key" ON "ReservaLibro"("reservaId");

-- CreateIndex
CREATE INDEX "ReservaLibro_fechaEntregado_idx" ON "ReservaLibro"("fechaEntregado" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ReservaLaboratorioCerrado_reservaId_key" ON "ReservaLaboratorioCerrado"("reservaId");

-- CreateIndex
CREATE UNIQUE INDEX "ReservaLaboratorioAbierto_reservaId_key" ON "ReservaLaboratorioAbierto"("reservaId");

-- CreateIndex
CREATE INDEX "ReservaLaboratorioAbierto_especialidad_idx" ON "ReservaLaboratorioAbierto"("especialidad" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Sede_nombre_key" ON "Sede"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name" ASC);

-- CreateIndex
CREATE INDEX "User_apellido_idx" ON "User"("apellido" ASC);

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email" ASC);

-- CreateIndex
CREATE INDEX "usuario_legajo_hash_idx" ON "User" USING HASH ("legajo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_legajo_asc_idx" ON "User"("legajo" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_userId_key" ON "Tutor"("userId");

-- CreateIndex
CREATE INDEX "Tutor_especialidad_idx" ON "Tutor"("especialidad");

-- CreateIndex
CREATE UNIQUE INDEX "Rol_nombre_key" ON "Rol"("nombre");

-- CreateIndex
CREATE INDEX "Rol_nombre_idx" ON "Rol"("nombre" ASC);

-- CreateIndex
CREATE INDEX "Permiso_nombre_idx" ON "Permiso"("nombre" ASC);

-- CreateIndex
CREATE INDEX "Permiso_sgeNombre_idx" ON "Permiso"("sgeNombre");

-- CreateIndex
CREATE UNIQUE INDEX "Permiso_nombre_rubro_key" ON "Permiso"("nombre", "rubro");

-- CreateIndex
CREATE UNIQUE INDEX "Permiso_sgeNombre_key" ON "Permiso"("sgeNombre");

-- CreateIndex
CREATE INDEX "Provincia_nombre_idx" ON "Provincia"("nombre");

-- CreateIndex
CREATE INDEX "Pais_nombreEspanol_idx" ON "Pais"("nombreEspanol" ASC);

-- CreateIndex
CREATE INDEX "Pais_iso3_idx" ON "Pais"("iso3");

-- CreateIndex
CREATE INDEX "Pais_codigoNumerico_idx" ON "Pais"("codigoNumerico");

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_laboratorioId_fkey" FOREIGN KEY ("laboratorioId") REFERENCES "Laboratorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_armarioId_fkey" FOREIGN KEY ("armarioId") REFERENCES "Armario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_estanteId_fkey" FOREIGN KEY ("estanteId") REFERENCES "Estante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "LibroAutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_idiomaId_fkey" FOREIGN KEY ("idiomaId") REFERENCES "LibroIdioma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_editorialId_fkey" FOREIGN KEY ("editorialId") REFERENCES "LibroEditorial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Libro" ADD CONSTRAINT "Libro_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibroMateria" ADD CONSTRAINT "LibroMateria_libroId_fkey" FOREIGN KEY ("libroId") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibroMateria" ADD CONSTRAINT "LibroMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoAyudante" ADD CONSTRAINT "CursoAyudante_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoAyudante" ADD CONSTRAINT "CursoAyudante_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "EquipoTipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "EquipoMarca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_laboratorioId_fkey" FOREIGN KEY ("laboratorioId") REFERENCES "Laboratorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_armarioId_fkey" FOREIGN KEY ("armarioId") REFERENCES "Armario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_estanteId_fkey" FOREIGN KEY ("estanteId") REFERENCES "Estante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "EquipoEstado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laboratorio" ADD CONSTRAINT "Laboratorio_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armario" ADD CONSTRAINT "Armario_laboratorioId_fkey" FOREIGN KEY ("laboratorioId") REFERENCES "Laboratorio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estante" ADD CONSTRAINT "Estante_armarioId_fkey" FOREIGN KEY ("armarioId") REFERENCES "Armario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareLaboratorio" ADD CONSTRAINT "SoftwareLaboratorio_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareLaboratorio" ADD CONSTRAINT "SoftwareLaboratorio_laboratorioId_fkey" FOREIGN KEY ("laboratorioId") REFERENCES "Laboratorio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_directorUsuarioId_fkey" FOREIGN KEY ("directorUsuarioId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaJefeTp" ADD CONSTRAINT "MateriaJefeTp_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaJefeTp" ADD CONSTRAINT "MateriaJefeTp_jefeTrabajoPracticoUsuarioId_fkey" FOREIGN KEY ("jefeTrabajoPracticoUsuarioId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaCorrelativa" ADD CONSTRAINT "MateriaCorrelativa_materiaPrerequisitoId_fkey" FOREIGN KEY ("materiaPrerequisitoId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaCorrelativa" ADD CONSTRAINT "MateriaCorrelativa_correlativaId_fkey" FOREIGN KEY ("correlativaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioSolicitoId_fkey" FOREIGN KEY ("usuarioSolicitoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioAprobadorId_fkey" FOREIGN KEY ("usuarioAprobadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioRechazadoId_fkey" FOREIGN KEY ("usuarioRechazadoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioRenovoId_fkey" FOREIGN KEY ("usuarioRenovoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioRecibioId_fkey" FOREIGN KEY ("usuarioRecibioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_usuarioTutorId_fkey" FOREIGN KEY ("usuarioTutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaEquipo" ADD CONSTRAINT "ReservaEquipo_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaEquipo" ADD CONSTRAINT "ReservaEquipo_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLibro" ADD CONSTRAINT "ReservaLibro_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLibro" ADD CONSTRAINT "ReservaLibro_libroId_fkey" FOREIGN KEY ("libroId") REFERENCES "Libro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioCerrado" ADD CONSTRAINT "ReservaLaboratorioCerrado_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioCerrado" ADD CONSTRAINT "ReservaLaboratorioCerrado_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioCerrado" ADD CONSTRAINT "ReservaLaboratorioCerrado_laboratorioId_fkey" FOREIGN KEY ("laboratorioId") REFERENCES "Laboratorio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioCerrado" ADD CONSTRAINT "ReservaLaboratorioCerrado_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioCerrado" ADD CONSTRAINT "ReservaLaboratorioCerrado_discrecionalMateriaId_fkey" FOREIGN KEY ("discrecionalMateriaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioCerrado" ADD CONSTRAINT "ReservaLaboratorioCerrado_discrecionalDocenteId_fkey" FOREIGN KEY ("discrecionalDocenteId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioCerradoEquipo" ADD CONSTRAINT "ReservaLaboratorioCerradoEquipo_reservaLaboratorioCerradoI_fkey" FOREIGN KEY ("reservaLaboratorioCerradoId") REFERENCES "ReservaLaboratorioCerrado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioCerradoEquipo" ADD CONSTRAINT "ReservaLaboratorioCerradoEquipo_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "EquipoTipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioAbierto" ADD CONSTRAINT "ReservaLaboratorioAbierto_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioAbierto" ADD CONSTRAINT "ReservaLaboratorioAbierto_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioAbierto" ADD CONSTRAINT "ReservaLaboratorioAbierto_laboratorioId_fkey" FOREIGN KEY ("laboratorioId") REFERENCES "Laboratorio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioAbiertoEquipo" ADD CONSTRAINT "ReservaLaboratorioAbiertoEquipo_reservaLaboratorioAbiertoI_fkey" FOREIGN KEY ("reservaLaboratorioAbiertoId") REFERENCES "ReservaLaboratorioAbierto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaLaboratorioAbiertoEquipo" ADD CONSTRAINT "ReservaLaboratorioAbiertoEquipo_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "EquipoTipo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pantalla" ADD CONSTRAINT "Pantalla_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Sede"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_documentoTipoId_fkey" FOREIGN KEY ("documentoTipoId") REFERENCES "DocumentoTipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_provinciaIso_paisIso_fkey" FOREIGN KEY ("provinciaIso", "paisIso") REFERENCES "Provincia"("iso", "paisIso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_paisIso_fkey" FOREIGN KEY ("paisIso") REFERENCES "Pais"("iso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolPermiso" ADD CONSTRAINT "RolPermiso_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolPermiso" ADD CONSTRAINT "RolPermiso_permisoId_fkey" FOREIGN KEY ("permisoId") REFERENCES "Permiso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provincia" ADD CONSTRAINT "Provincia_paisIso_fkey" FOREIGN KEY ("paisIso") REFERENCES "Pais"("iso") ON DELETE CASCADE ON UPDATE CASCADE;
