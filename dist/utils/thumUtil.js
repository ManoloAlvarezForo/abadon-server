"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildThumbnailBySize = exports.buildThumbnails = void 0;

var _sharp = _interopRequireDefault(require("sharp"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var buildThumbnails = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(urlPath, filename) {
    var formats, newUrlPath, hash, urlFileTarget, sizes, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            formats = {}; //   const sourcePath = path.join(__dirname, "../../images/products/", filename);

            newUrlPath = _path["default"].join(__dirname, urlPath);
            hash = "thumbnail_".concat(filename);
            urlFileTarget = _path["default"].join(__dirname, "../../images/products/", hash); //   const urlFileTarget = path.join(
            //     __dirname,
            //     "../../images/products/thumbnails/",
            //     filename
            //   );

            sizes = [{
              name: "thumbnail",
              size: {
                width: 234,
                height: 156
              }
            }, {
              name: "large",
              size: {
                width: 1000,
                height: 667
              }
            }, {
              name: "medium",
              size: {
                width: 750,
                height: 500
              }
            }, {
              name: "small",
              size: {
                width: 500,
                height: 333
              }
            }]; //   for (let index = 0; index < sizes.length; index++) {
            //     const element = sizes[index];
            //     formats[element.name] = await buildThumbnailBySize(
            //       urlPath,
            //       filename,
            //       urlFileTarget,
            //       element.size
            //     );
            //   }

            response = buildThumbnailBySize(newUrlPath, filename, urlFileTarget, sizes[0].size);
            console.log(formats);
            return _context.abrupt("return", response);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function buildThumbnails(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.buildThumbnails = buildThumbnails;

var buildThumbnailBySize = function buildThumbnailBySize(urlPath, filename, urlFileTarget, size) {
  var width = size.width,
      height = size.height;
  var hash = "thumbnail_".concat(filename);
  (0, _sharp["default"])(urlPath, {
    kernel: _sharp["default"].kernel.nearest,
    fit: "contain"
  }).resize(450).toFile(urlFileTarget, function (err, resizeImage) {
    if (err) {
      console.log(err);
    } else {
      console.log(resizeImage);
      console.log(filename);
    }
  });
}; // sharp(sourcePath, {
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


exports.buildThumbnailBySize = buildThumbnailBySize;