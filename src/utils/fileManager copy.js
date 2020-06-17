import fs from "fs";
import path from "path";

export const IMAGES_PATH = "images";

export const uploadFile = async (file) => {
  const { createReadStream, filename } = await file;
  const urlFile = path.join(__dirname, "../../images/products/", filename);
  const urlToSave = `/images/products/${filename}`;
  try {
    await new Promise((res) =>
      createReadStream().pipe(fs.createWriteStream(urlFile)).on("close", res)
    );

    // files.push(filename);
  } catch (error) {
    console.log(`[Error]: Error to uploadFile: ${filename}: ${error}`);
    return null;
  }

  return { urlToSave, filename };
};
