export const materiaReservaLaboratorio = ({
  esDiscrecional,
  discrecionalMateria,
  discrecionalTitulo,
  curso,
}: {
  esDiscrecional?: boolean;
  discrecionalMateria?: {
    nombre?: string;
  } | null;
  discrecionalTitulo?: string | null;
  curso?: {
    materia?: {
      nombre?: string | null;
    } | null;
  } | null;
}) => {
  if (esDiscrecional) {
    if (discrecionalMateria && discrecionalMateria.nombre) {
      return discrecionalMateria.nombre;
    }

    if (discrecionalTitulo) {
      return discrecionalTitulo;
    }

    return "-";
  }

  const materiaNombre = (curso?.materia?.nombre ?? "").trim();

  if (materiaNombre.length > 0) {
    return materiaNombre;
  }

  return "-";
};
