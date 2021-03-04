"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.IMAGES_PATH = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var IMAGES_PATH = "images";
exports.IMAGES_PATH = IMAGES_PATH;

var uploadFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    var _yield$file, createReadStream, filename, urlFile, urlToSave;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return file;

          case 2:
            _yield$file = _context.sent;
            createReadStream = _yield$file.createReadStream;
            filename = _yield$file.filename;
            urlFile = _path["default"].join(__dirname, "../../images/products/", filename);
            urlToSave = "/images/products/".concat(filename);
            _context.prev = 7;
            _context.next = 10;
            return new Promise(function (res) {
              return createReadStream().pipe(_fs["default"].createWriteStream(urlFile)).on("close", res);
            });

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](7);
            console.log("[Error]: Error to uploadFile: ".concat(filename, ": ").concat(_context.t0));
            return _context.abrupt("return", null);

          case 16:
            return _context.abrupt("return", {
              urlToSave: urlToSave,
              filename: filename
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 12]]);
  }));

  return function uploadFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadFile = uploadFile;