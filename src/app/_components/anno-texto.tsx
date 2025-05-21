export const AnnoTexto = ({ anio }: { anio: number }) => {
  switch (anio) {
    case 1:
      return "1er. Año";
    case 2:
      return "2do. Año";
    case 3:
      return "3er. Año";
    case 4:
      return "4to. Año";
    case 5:
      return "5to. Año";
    case 6:
      return "6to. Año";
    default:
      return "Año";
  }
};
