export type ValorVoto = "ACUERDO" | "DESACUERDO" | "ACUERDO_PARCIAL";

export type VotoActa = {
  id: number;
  actaId: number;
  consejeroId: string;
  persona: string;
  posicion: ValorVoto;
  comentario?: string | null;
  fechaEmision: string;
};
