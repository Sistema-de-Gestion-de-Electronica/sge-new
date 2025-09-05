// Script de prueba para inscripciones especiales
// Ejecutar con: node test-inscripcion-especial.js

const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

// Datos de prueba
const inscripcionTest = {
  nombre: "Juan",
  apellido: "Pérez",
  legajo: "12345",
  caso: "Materia no disponible en mi turno",
  justificacion: "Necesito cursar esta materia para avanzar en mi carrera",
  turnoAlternativa1: "Mañana",
  turnoAlternativa2: "Tarde",
  materias: [1, 2], // IDs de materias existentes en tu BD
};

async function testInscripcionEspecial() {
  try {
    console.log("Iniciando prueba de inscripción especial...");

    // Verificar que las materias existen
    const materiasExistentes = await prisma.materia.findMany({
      where: {
        id: {
          in: inscripcionTest.materias,
        },
      },
      select: {
        id: true,
        nombre: true,
      },
    });

    console.log("Materias encontradas:", materiasExistentes);

    if (materiasExistentes.length === 0) {
      console.log("No se encontraron materias.");
    }

    const inscripcion = await prisma.inscripcionEspecial.create({
      data: {
        nombre: inscripcionTest.nombre,
        apellido: inscripcionTest.apellido,
        legajo: inscripcionTest.legajo,
        caso: inscripcionTest.caso,
        justificacion: inscripcionTest.justificacion,
        turnoAlternativa1: inscripcionTest.turnoAlternativa1,
        turnoAlternativa2: inscripcionTest.turnoAlternativa2,
        estado: "PENDIENTE",
        materias: inscripcionTest.materias,
      },
    });

    console.log("Inscripción especial creada exitosamente:");
    console.log(JSON.stringify(inscripcion, null, 2));

    // Verificar que se creó correctamente
    const inscripcionVerificada = await prisma.inscripcionEspecial.findUnique({
      where: { id: inscripcion.id },
    });

    console.log("Verificación de la inscripción creada:");
    console.log(JSON.stringify(inscripcionVerificada, null, 2));
  } catch (error) {
    console.error("Error durante la prueba:", error);
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Conexión a la base de datos cerrada");
  }
}

// Ejecutar la prueba
testInscripcionEspecial();
