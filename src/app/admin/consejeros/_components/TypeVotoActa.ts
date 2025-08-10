export type ValorVoto = "ACUERDO" | "DESACUERDO" | "PARCIAL";

export type VotoActa = {
  id: string;
  persona: string;
  valor: ValorVoto;
  comentario?: string | null;
  fecha: string; // ISO string
};