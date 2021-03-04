"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.IMAGES_PATH = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var IMAGES_PATH = "images";
exports.IMAGES_PATH = IMAGES_PATH;

var uploadFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    var aditionalForPath,
        _yield$file,
        createReadStream,
        filename,
        urlFile,
        urlToSave,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            aditionalForPath = _args.length > 1 && _args[1] !== undefined ? _args[1] : "img";
            _context.next = 3;
            return file;

          case 3:
            _yield$file = _context.sent;
            createReadStream = _yield$file.createReadStream;
            filename = _yield$file.filename;
            urlFile = _path["default"].join(__dirname, "../../images", filename);
            urlToSave = "/images/".concat(filename);
            _context.prev = 8;
            _context.next = 11;
            return new Promise(function (res) {
              return createReadStream().pipe((0, _fs.createWriteStream)(urlFile)).on("close", res);
            });

          case 11:
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](8);
            console.log("[Error]: Error to uploadFile: ".concat(filename, ": ").concat(_context.t0));
            return _context.abrupt("return", null);

          case 17:
            return _context.abrupt("return", urlToSave);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 13]]);
  }));

  return function uploadFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadFile = uploadFile;