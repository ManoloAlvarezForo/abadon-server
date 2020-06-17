import { createWriteStream } from "fs";
import { getSize } from "./image";
import sharp from "sharp";
import path from "path";

export const uploadFile = async (file) => {
  let response = {};
  const { createReadStream, filename, mimetype } = await file;
  const urlFile = path.join(__dirname, "../../images/", filename);
  try {
    await new Promise((res) =>
      createReadStream().pipe(createWriteStream(urlFile)).on("close", res)
    );

    response = await buildThumbnailObject(urlFile, filename, mimetype, 0);
  } catch (error) {
    console.log(`[Error]: Error to uploadFile: ${filename}: ${error}`);
    return null;
  }

  return response;
};

export const uploadFiles = async (files) => {
  let response = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const { createReadStream, filename, mimetype } = await file;
    const urlFile = path.join(__dirname, "../../images/", filename);
    try {
      await new Promise((res) =>
        createReadStream().pipe(createWriteStream(urlFile)).on("close", res)
      );

      const thumbnail = await buildThumbnailObject(
        urlFile,
        filename,
        mimetype,
        0
      );
      response.push(thumbnail);
    } catch (error) {
      console.log(`[Error]: Error to uploadFile: ${filename}: ${error}`);
      return null;
    }
  }

  return response;
};

/**
 * Builds and creates the thumbnail file in server image folder based in the url target file.
 *
 * @param {string} urlFile String that represents the url file.
 * @param {string} urlFileTarget String that represents the url file target.
 * @param {string} width String that represents the file width.
 * @param {string} height String that represents the file height.
 */
export const buildThumb = (urlFile, urlFileTarget, width, height) => {
  return new Promise((resolve, reject) => {
    sharp(urlFile)
      .resize(width, height)
      .toFile(urlFileTarget, (err, resizeImage) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(resizeImage);
        }
      });
  });
};

/**
 * Builds and returns a thumbnail object created with different sizes.
 *
 * @param {string} urlFile String that represents the url file path.
 * @param {string} filename String that represnts the file name.
 * @param {string} mime String that represents the mime file.
 * @param {string} size String that resents the file size.
 */
export const buildThumbnailObject = async (urlFile, filename, mime, size) => {
  const { width, height, type } = await getSize(urlFile);
  const imagesPath = "../../images/";
  const urlToSave = `/images/${filename}`;

  let formats = {};
  let thumb = {
    width,
    height,
    ext: `.${type}`,
    mime,
    size,
    url: urlToSave,
  };

  const THUMBNAIL = {
    NAME: "thumbnail",
    WIDTH: 234,
    HEIGHT: 156,
  };

  const LARGE = { NAME: "large", WIDTH: 1000, HEIGHT: 667 };
  const MEDIUM = { NAME: "medium", WIDTH: 750, HEIGHT: 500 };
  const SMALL = { NAME: "small", WIDTH: 500, HEIGHT: 333 };

  if (width >= THUMBNAIL.WIDTH) {
    const { resizedWidth, resizedHeight } = calculateSize(
      width,
      height,
      THUMBNAIL.WIDTH
    );
    const {
      format,
      width: widthThumb,
      height: heightThumb,
      size,
    } = await buildThumb(
      urlFile,
      path.join(__dirname, imagesPath, `${THUMBNAIL.NAME}_${filename}`),
      resizedWidth,
      resizedHeight
    );

    formats[THUMBNAIL.NAME] = {
      ext: `.${format}`,
      mime: mime,
      width: widthThumb,
      height: heightThumb,
      size: size,
      url: `/images/${THUMBNAIL.NAME}_${filename}`,
    };
  }

  if (width >= SMALL.WIDTH) {
    const { resizedWidth, resizedHeight } = calculateSize(
      width,
      height,
      SMALL.WIDTH
    );
    const {
      format,
      width: widthThumb,
      height: heightThumb,
      size,
    } = await buildThumb(
      urlFile,
      path.join(__dirname, imagesPath, `${SMALL.NAME}_${filename}`),
      resizedWidth,
      resizedHeight
    );

    formats[SMALL.NAME] = {
      ext: `.${format}`,
      mime: mime,
      width: widthThumb,
      height: heightThumb,
      size: size,
      url: `/images/${SMALL.NAME}_${filename}`,
    };
  }

  if (width >= MEDIUM.WIDTH) {
    const { resizedWidth, resizedHeight } = calculateSize(
      width,
      height,
      MEDIUM.WIDTH
    );
    const {
      format,
      width: widthThumb,
      height: heightThumb,
      size,
    } = await buildThumb(
      urlFile,
      path.join(__dirname, imagesPath, `${MEDIUM.NAME}_${filename}`),
      resizedWidth,
      resizedHeight
    );

    formats[MEDIUM.NAME] = {
      ext: `.${format}`,
      mime: mime,
      width: widthThumb,
      height: heightThumb,
      size: size,
      url: `/images/${MEDIUM.NAME}_${filename}`,
    };
  }

  if (width >= LARGE.WIDTH) {
    const { resizedWidth, resizedHeight } = calculateSize(
      width,
      height,
      LARGE.WIDTH
    );
    const {
      format,
      width: widthThumb,
      height: heightThumb,
      size,
    } = await buildThumb(
      urlFile,
      path.join(__dirname, imagesPath, `${LARGE.NAME}_${filename}`),
      resizedWidth,
      resizedHeight
    );

    formats[LARGE.NAME] = {
      ext: `.${format}`,
      mime: mime,
      width: widthThumb,
      height: heightThumb,
      size: size,
      url: `/images/${LARGE.NAME}_${filename}`,
    };
  }

  thumb["formats"] = formats;

  return thumb;
};

const calculateSize = (width, height, targetWidth) => {
  const newHeight = (height / width) * targetWidth;
  const heightResponse = Math.round(newHeight);
  return { resizedWidth: targetWidth, resizedHeight: heightResponse };
};

// id": 3,
// "name": "dipronto_logo",
// "alternativeText": "",
// "caption": "",
// "width": 581,
// "height": 580,
// "formats": {},
// "hash": "dipronto_logo_62c5c93f01",
// "ext": ".jpeg",
// "mime": "image/jpeg",
// "size": 42.18,
// "url": "/uploads/dipronto_logo_62c5c93f01.jpeg",
// "previewUrl": null,
// "provider": "local",
// "provider_metadata": null,
// "created_at": "2020-05-24T03:47:41.916Z",
// "updated_at": "2020-05-24T03:47:41.916Z"
