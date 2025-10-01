import fs from 'fs';
import path from 'path';

export const saveActaPDF = async (fileBuffer: Buffer, date: Date): Promise<string> => {

  // Formatear la fecha como "DD-MM-YYYY"
  const fileName = `${formatDate(date)}.pdf`;
  const filePath = path.join(process.cwd(), "public", "actas", fileName);


  // Verificar si la carpeta 'actas' existe y crearla si no
  const dirPath = path.join(process.cwd(), "public", "actas");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Guardar el archivo en el servidor
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`/actas/${fileName}`);
      }
    });
  });
};

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');  // Asegura que el día tenga dos dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0');  // Mes (0 es enero, por eso sumamos 1)
  const year = date.getFullYear();  // Año

  return `${day}-${month}-${year}`;
};
