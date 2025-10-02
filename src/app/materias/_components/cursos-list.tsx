import { Curso } from "./materias-datos-mock"

interface CursosListProps{
    cursos: Curso[]
}

export const CursosList = ({cursos}: CursosListProps) => {
  return (
    <>
        {
            cursos.map((curso) => (
                <h3>{curso.materiaId}</h3>
            ))
        }
    </>
  )
}
