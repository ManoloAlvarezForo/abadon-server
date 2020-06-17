import fs from "fs";
// const imageThumbnail = require("image-thumbnail");
// const imageThumbnail = require("image-thumbnail");
import sharp from "sharp";
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
    const urlFileTarget = path.join(
      __dirname,
      "../../images/products/thumbnails/",
      filename
    );
    sharp(urlFile, {
      kernel: sharp.kernel.nearest,
      fit: "contain",
      position: "right top",
    })
      .resize(250, 250)
      .toFile(urlFileTarget, (err, resizeImage) => {
        if (err) {
          console.log(err);
        } else {
          console.log(resizeImage);
          console.log(filename);
        }
      });

    // files.push(filename);
  } catch (error) {
    console.log(`[Error]: Error to uploadFile: ${filename}: ${error}`);
    return null;
  }

  return urlToSave;
};
