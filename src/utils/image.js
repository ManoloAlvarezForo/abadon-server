import sizeOf from "image-size";

export const getSize = (urlFile) => {
  return new Promise((resolve, reject) => {
    sizeOf(urlFile, function (err, dimensions) {
      if (err) {
        reject(err);
      }
      resolve(dimensions);
    });
  });
};
