"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildThumbnailObject = exports.buildThumb = exports.uploadFiles = exports.uploadFile = void 0;

var _fs = require("fs");

var _image = require("./image");

var _sharp = _interopRequireDefault(require("sharp"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var uploadFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    var response, _yield$file, createReadStream, filename, mimetype, urlFile;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = {};
            _context.next = 3;
            return file;

          case 3:
            _yield$file = _context.sent;
            createReadStream = _yield$file.createReadStream;
            filename = _yield$file.filename;
            mimetype = _yield$file.mimetype;
            urlFile = _path["default"].join(__dirname, "../../images/", filename);
            _context.prev = 8;
            _context.next = 11;
            return new Promise(function (res) {
              return createReadStream().pipe((0, _fs.createWriteStream)(urlFile)).on("close", res);
            });

          case 11:
            _context.next = 13;
            return buildThumbnailObject(urlFile, filename, mimetype, 0);

          case 13:
            response = _context.sent;
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](8);
            console.log("[Error]: Error to uploadFile: ".concat(filename, ": ").concat(_context.t0));
            return _context.abrupt("return", null);

          case 20:
            return _context.abrupt("return", response);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 16]]);
  }));

  return function uploadFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadFile = uploadFile;

var uploadFiles = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(files) {
    var response, _loop, index, _ret;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            response = [];
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(index) {
              var file, _yield$file2, createReadStream, filename, mimetype, urlFile, thumbnail;

              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      file = files[index];
                      _context2.next = 3;
                      return file;

                    case 3:
                      _yield$file2 = _context2.sent;
                      createReadStream = _yield$file2.createReadStream;
                      filename = _yield$file2.filename;
                      mimetype = _yield$file2.mimetype;
                      urlFile = _path["default"].join(__dirname, "../../images/", filename);
                      _context2.prev = 8;
                      _context2.next = 11;
                      return new Promise(function (res) {
                        return createReadStream().pipe((0, _fs.createWriteStream)(urlFile)).on("close", res);
                      });

                    case 11:
                      _context2.next = 13;
                      return buildThumbnailObject(urlFile, filename, mimetype, 0);

                    case 13:
                      thumbnail = _context2.sent;
                      response.push(thumbnail);
                      _context2.next = 21;
                      break;

                    case 17:
                      _context2.prev = 17;
                      _context2.t0 = _context2["catch"](8);
                      console.log("[Error]: Error to uploadFile: ".concat(filename, ": ").concat(_context2.t0));
                      return _context2.abrupt("return", {
                        v: null
                      });

                    case 21:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop, null, [[8, 17]]);
            });
            index = 0;

          case 3:
            if (!(index < files.length)) {
              _context3.next = 11;
              break;
            }

            return _context3.delegateYield(_loop(index), "t0", 5);

          case 5:
            _ret = _context3.t0;

            if (!(_typeof(_ret) === "object")) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", _ret.v);

          case 8:
            index++;
            _context3.next = 3;
            break;

          case 11:
            return _context3.abrupt("return", response);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));

  return function uploadFiles(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Builds and creates the thumbnail file in server image folder based in the url target file.
 *
 * @param {string} urlFile String that represents the url file.
 * @param {string} urlFileTarget String that represents the url file target.
 * @param {string} width String that represents the file width.
 * @param {string} height String that represents the file height.
 */


exports.uploadFiles = uploadFiles;

var buildThumb = function buildThumb(urlFile, urlFileTarget, width, height) {
  return new Promise(function (resolve, reject) {
    (0, _sharp["default"])(urlFile).resize(width, height).toFile(urlFileTarget, function (err, resizeImage) {
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


exports.buildThumb = buildThumb;

var buildThumbnailObject = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(urlFile, filename, mime, size) {
    var _yield$getSize, width, height, type, imagesPath, urlToSave, formats, thumb, THUMBNAIL, LARGE, MEDIUM, SMALL, _calculateSize, resizedWidth, resizedHeight, _yield$buildThumb, format, widthThumb, heightThumb, _size, _calculateSize2, _resizedWidth, _resizedHeight, _yield$buildThumb2, _format, _widthThumb, _heightThumb, _size2, _calculateSize3, _resizedWidth2, _resizedHeight2, _yield$buildThumb3, _format2, _widthThumb2, _heightThumb2, _size3, _calculateSize4, _resizedWidth3, _resizedHeight3, _yield$buildThumb4, _format3, _widthThumb3, _heightThumb3, _size4;

    return regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _image.getSize)(urlFile);

          case 2:
            _yield$getSize = _context4.sent;
            width = _yield$getSize.width;
            height = _yield$getSize.height;
            type = _yield$getSize.type;
            imagesPath = "../../images/";
            urlToSave = "/images/".concat(filename);
            formats = {};
            thumb = {
              width: width,
              height: height,
              ext: ".".concat(type),
              mime: mime,
              size: size,
              url: urlToSave
            };
            THUMBNAIL = {
              NAME: "thumbnail",
              WIDTH: 234,
              HEIGHT: 156
            };
            LARGE = {
              NAME: "large",
              WIDTH: 1000,
              HEIGHT: 667
            };
            MEDIUM = {
              NAME: "medium",
              WIDTH: 750,
              HEIGHT: 500
            };
            SMALL = {
              NAME: "small",
              WIDTH: 500,
              HEIGHT: 333
            };

            if (!(width >= THUMBNAIL.WIDTH)) {
              _context4.next = 24;
              break;
            }

            _calculateSize = calculateSize(width, height, THUMBNAIL.WIDTH), resizedWidth = _calculateSize.resizedWidth, resizedHeight = _calculateSize.resizedHeight;
            _context4.next = 18;
            return buildThumb(urlFile, _path["default"].join(__dirname, imagesPath, "".concat(THUMBNAIL.NAME, "_").concat(filename)), resizedWidth, resizedHeight);

          case 18:
            _yield$buildThumb = _context4.sent;
            format = _yield$buildThumb.format;
            widthThumb = _yield$buildThumb.width;
            heightThumb = _yield$buildThumb.height;
            _size = _yield$buildThumb.size;
            formats[THUMBNAIL.NAME] = {
              ext: ".".concat(format),
              mime: mime,
              width: widthThumb,
              height: heightThumb,
              size: _size,
              url: "/images/".concat(THUMBNAIL.NAME, "_").concat(filename)
            };

          case 24:
            if (!(width >= SMALL.WIDTH)) {
              _context4.next = 34;
              break;
            }

            _calculateSize2 = calculateSize(width, height, SMALL.WIDTH), _resizedWidth = _calculateSize2.resizedWidth, _resizedHeight = _calculateSize2.resizedHeight;
            _context4.next = 28;
            return buildThumb(urlFile, _path["default"].join(__dirname, imagesPath, "".concat(SMALL.NAME, "_").concat(filename)), _resizedWidth, _resizedHeight);

          case 28:
            _yield$buildThumb2 = _context4.sent;
            _format = _yield$buildThumb2.format;
            _widthThumb = _yield$buildThumb2.width;
            _heightThumb = _yield$buildThumb2.height;
            _size2 = _yield$buildThumb2.size;
            formats[SMALL.NAME] = {
              ext: ".".concat(_format),
              mime: mime,
              width: _widthThumb,
              height: _heightThumb,
              size: _size2,
              url: "/images/".concat(SMALL.NAME, "_").concat(filename)
            };

          case 34:
            if (!(width >= MEDIUM.WIDTH)) {
              _context4.next = 44;
              break;
            }

            _calculateSize3 = calculateSize(width, height, MEDIUM.WIDTH), _resizedWidth2 = _calculateSize3.resizedWidth, _resizedHeight2 = _calculateSize3.resizedHeight;
            _context4.next = 38;
            return buildThumb(urlFile, _path["default"].join(__dirname, imagesPath, "".concat(MEDIUM.NAME, "_").concat(filename)), _resizedWidth2, _resizedHeight2);

          case 38:
            _yield$buildThumb3 = _context4.sent;
            _format2 = _yield$buildThumb3.format;
            _widthThumb2 = _yield$buildThumb3.width;
            _heightThumb2 = _yield$buildThumb3.height;
            _size3 = _yield$buildThumb3.size;
            formats[MEDIUM.NAME] = {
              ext: ".".concat(_format2),
              mime: mime,
              width: _widthThumb2,
              height: _heightThumb2,
              size: _size3,
              url: "/images/".concat(MEDIUM.NAME, "_").concat(filename)
            };

          case 44:
            if (!(width >= LARGE.WIDTH)) {
              _context4.next = 54;
              break;
            }

            _calculateSize4 = calculateSize(width, height, LARGE.WIDTH), _resizedWidth3 = _calculateSize4.resizedWidth, _resizedHeight3 = _calculateSize4.resizedHeight;
            _context4.next = 48;
            return buildThumb(urlFile, _path["default"].join(__dirname, imagesPath, "".concat(LARGE.NAME, "_").concat(filename)), _resizedWidth3, _resizedHeight3);

          case 48:
            _yield$buildThumb4 = _context4.sent;
            _format3 = _yield$buildThumb4.format;
            _widthThumb3 = _yield$buildThumb4.width;
            _heightThumb3 = _yield$buildThumb4.height;
            _size4 = _yield$buildThumb4.size;
            formats[LARGE.NAME] = {
              ext: ".".concat(_format3),
              mime: mime,
              width: _widthThumb3,
              height: _heightThumb3,
              size: _size4,
              url: "/images/".concat(LARGE.NAME, "_").concat(filename)
            };

          case 54:
            thumb["formats"] = formats;
            return _context4.abrupt("return", thumb);

          case 56:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3);
  }));

  return function buildThumbnailObject(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.buildThumbnailObject = buildThumbnailObject;

var calculateSize = function calculateSize(width, height, targetWidth) {
  var newHeight = height / width * targetWidth;
  var heightResponse = Math.round(newHeight);
  return {
    resizedWidth: targetWidth,
    resizedHeight: heightResponse
  };
}; // id": 3,
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