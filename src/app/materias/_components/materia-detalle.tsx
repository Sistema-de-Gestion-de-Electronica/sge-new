import { CursosList } from "./cursos-list";
import { Curso, Materia, mockData } from './materias-datos-mock';

interface MateriaDetalleProps{
    id: string | undefined;
}

export const MateriaDetalle = ({id}: MateriaDetalleProps) => {

    //llamada a la api con el id
    const materia: Materia = mockData(id);

    return (
        <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center">
                <h1>{materia.nombre}</h1>
                <h2>Director/es de Cátedra: {materia.directorDeCatedra}</h2>
                <h2>Jefe/s de Trabajos Prácticos: {materia.JTP}</h2>
                <h2>Docentes / Ayudantes: </h2>

                <CursosList cursos={materia.cursos}/>
            </div>
            <div className="flex flex-col justify-center">
                <h2>Sobre la materia...</h2>
                <h2>Maaterial</h2>
            </div>
        </div>
    );
}