import { VotoActa, ValorVoto } from "./TypeVotoActa";

// =====================
export function loadMockVotos(cantidad = 12): VotoActa[] {
  const personas = [
    "María González",
    "Juan Pérez",
    "Lucía Romero",
    "Carlos Díaz",
    "Sofía Herrera",
    "Tomás Benítez",
    "Ana Suárez",
    "Federico Álvarez",
  ];
  const valores: ValorVoto[] = ["ACUERDO", "DESACUERDO", "PARCIAL"];
  const comentarios = [
    "Coincido con la propuesta tal como está",
    "Preferiría revisar el punto 3",
    "Faltan métricas de seguimiento",
    "",
    null,
    "Sugiero posponer la decisión para la próxima reunión",
  ];

  const now = Date.now();
  return Array.from({ length: cantidad }).map((_, i) => {
    const persona = personas[i % personas.length]!;
    const valor = valores[i % valores.length]!;
    const comentario = comentarios[i % comentarios.length] ?? null;
    const fecha = new Date(now - (i * 36 + 12) * 60 * 60 * 1000).toISOString();

    return {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${i}-${Math.random()}`,
      persona,
      valor,
      comentario,
      fecha,
    } satisfies VotoActa;
  });
}