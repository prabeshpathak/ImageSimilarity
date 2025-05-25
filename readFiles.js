import fs from "fs";
import path from "path";

const imageExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".bmp",
  ".tiff",
];

export function readFiles(pathName, onFileContent, onError) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(pathName) || !fs.lstatSync(pathName).isDirectory()) {
      return reject(new Error("Not a directory"));
    }

    fs.readdir(pathName, async (err, filenames) => {
      if (err) {
        onError(err);
        return reject(err);
      }

      const imageFiles = filenames.filter((filename) => {
        const ext = path.extname(filename).toLowerCase();
        return imageExtensions.includes(ext);
      });

      try {
        await Promise.all(
          imageFiles.map((filename) => {
            return new Promise((res, rej) => {
              fs.readFile(
                path.join(pathName, filename),
                "utf-8",
                async (err) => {
                  if (err) {
                    onError(err);
                    return rej(err);
                  }

                  await onFileContent(filename);
                  res();
                }
              );
            });
          })
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}
