import sharp from "sharp";
import path from "path";

export const buildThumbnails = async (urlPath, filename) => {
  let formats = {};

  //   const sourcePath = path.join(__dirname, "../../images/products/", filename);
  const newUrlPath = path.join(__dirname, urlPath);
  const hash = `thumbnail_${filename}`;
  const urlFileTarget = path.join(__dirname, "../../images/products/", hash);

  //   const urlFileTarget = path.join(
  //     __dirname,
  //     "../../images/products/thumbnails/",
  //     filename
  //   );

  const sizes = [
    {
      name: "thumbnail",
      size: { width: 234, height: 156 },
    },
    { name: "large", size: { width: 1000, height: 667 } },
    { name: "medium", size: { width: 750, height: 500 } },
    { name: "small", size: { width: 500, height: 333 } },
  ];

  //   for (let index = 0; index < sizes.length; index++) {
  //     const element = sizes[index];
  //     formats[element.name] = await buildThumbnailBySize(
  //       urlPath,
  //       filename,
  //       urlFileTarget,
  //       element.size
  //     );
  //   }

  const response = buildThumbnailBySize(
    newUrlPath,
    filename,
    urlFileTarget,
    sizes[0].size
  );

  console.log(formats);

  return response;
};

export const buildThumbnailBySize = (
  urlPath,
  filename,
  urlFileTarget,
  size
) => {
  const { width, height } = size;
  const hash = `thumbnail_${filename}`;
  sharp(urlPath, {
    kernel: sharp.kernel.nearest,
    fit: "contain",
  })
    .resize(450)
    .toFile(urlFileTarget, (err, resizeImage) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resizeImage);
        console.log(filename);
      }
    });
};

// sharp(sourcePath, {
//   kernel: sharp.kernel.nearest,
//   fit: "contain",
// })
//   .resize(234, 156)
//   .toFile(urlFileTarget, (err, resizeImage) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const url = "/images/products/" + hash;
// return {
//   hash: hash,
//   ext: `.${resizedImage.format}`,
//   mime: mime,
//   width: resizedImage.width,
//   height: resizedImage.height,
//   size: resizedImage.size,
//   url: url,
// };
//     }
//   });
