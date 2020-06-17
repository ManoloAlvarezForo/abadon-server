import { createWriteStream } from "fs";
import path from "path";

export const IMAGES_PATH = "images";

export const uploadFile = async (file, aditionalForPath = "img") => {
  const { createReadStream, filename } = await file;

  const urlFile = path.join(__dirname, "../../images", filename);
  const urlToSave = `/images/${filename}`;
  try {
    await new Promise((res) =>
      createReadStream().pipe(createWriteStream(urlFile)).on("close", res)
    );

    // files.push(filename);
  } catch (error) {
    console.log(`[Error]: Error to uploadFile: ${filename}: ${error}`);
    return null;
  }

  return urlToSave;
};
