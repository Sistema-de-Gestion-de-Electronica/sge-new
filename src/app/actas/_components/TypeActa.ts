export type Estado = "ABIERTA" | "CERRADA";

export type Acta = {
  id: string;
  estado: Estado;
  label: string;
};