export type Turno = "Mañana" | "Tarde" | "Noche";
export type Sede = "Medrano" | "Mozart";

export type Curso = {
    id: number;
    materiaId: string | undefined;
    profesor: string;
    ayudantes?: string[];
    horario: string;
    turno: Turno;
    sede: Sede;
}

export type Materia = {
  id: string | undefined;
  nombre: string;
  codigo: number;
  directorDeCatedra: string;
  JTP?: string;
  cursos: Curso[];
};

export function mockData(id: string | undefined): Materia {
  return {
    id,
    codigo: 95,
    nombre: "Física Elctrónica",
    directorDeCatedra: "SUAREZ, FEDERICO",
    JTP:"-",
    cursos: [
      {
        id: 2521,
        materiaId: id,
        profesor: "SUAREZ, FEDERICO",
        horario: "Lunes de 08:30 a 12:30 hs y Jueves de 08:30 a 12:30 hs",
        turno: "Mañana",
        sede: "Medrano",
      },
      {
        id: 2522,
        materiaId: id,
        profesor: "SUPANITSKY, ALBERTO DANIEL",
        ayudantes: ["MARTINEZ, LUIS ALBERTO"],
        horario: "Lunes de 19:00 a 23:00 hs y Jueves de 19:00 a 23:00 hs",
        turno: "Noche",
        sede: "Medrano",
      },
      {
        id: 2571,
        materiaId: id,
        profesor: "NESPRIAS, FRANCISCO JOSE GABRIEL",
        horario: "Martes de 19:00 a 23:00 hs y Viernes de 19:00 a 23:00 hs",
        turno: "Noche",
        sede: "Mozart",
      },
    ],
  };
}
