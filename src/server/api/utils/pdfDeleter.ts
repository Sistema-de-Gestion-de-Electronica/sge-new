import fs from "fs";
import path from "path";

export const deleteActaPDF = async (nombreActa: string): Promise<boolean> => {
  const fileName = `${nombreActa}.pdf`;
  const filePath = path.join(process.cwd(), "public", "actas", fileName);

  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          resolve(false);
        } else {
          reject(err);
        }
      } else {
        resolve(true);
      }
    });
  });
};
