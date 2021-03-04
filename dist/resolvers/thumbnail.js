"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThumbnailsByFilter = exports.getThumbnailById = exports.addThumbnails = exports.addThumbnail = exports.getThumbnails = void 0;

var _thumbnail = _interopRequireDefault(require("../models/thumbnail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getThumbnails = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _thumbnail["default"].find({});

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getThumbnails() {
    return _ref.apply(this, arguments);
  };
}();

exports.getThumbnails = getThumbnails;

var addThumbnail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(thumb) {
    var newThumbnail, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newThumbnail = new _thumbnail["default"](_objectSpread({}, thumb));
            _context2.next = 4;
            return newThumbnail.save();

          case 4:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log("[Error]: Error to save thumbnail: ".concat(_context2.t0));
            throw Error("[Error]: Error to save thumbnail: ".concat(_context2.t0));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function addThumbnail(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addThumbnail = addThumbnail;

var addThumbnails = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(thumbs) {
    var response, index, thumb, newThumbnail, newThumb;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            response = [];
            _context3.prev = 1;
            index = 0;

          case 3:
            if (!(index < thumbs.length)) {
              _context3.next = 13;
              break;
            }

            thumb = thumbs[index];
            newThumbnail = new _thumbnail["default"](_objectSpread({}, thumb));
            _context3.next = 8;
            return newThumbnail.save();

          case 8:
            newThumb = _context3.sent;
            response.push(newThumb._id);

          case 10:
            index++;
            _context3.next = 3;
            break;

          case 13:
            return _context3.abrupt("return", response);

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](1);
            console.log("[Error]: Error to save thumbnail: ".concat(_context3.t0));
            throw Error("[Error]: Error to save thumbnail: ".concat(_context3.t0));

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 16]]);
  }));

  return function addThumbnails(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addThumbnails = addThumbnails;

var getThumbnailById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _thumbnail["default"].findById(id);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getThumbnailById(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getThumbnailById = getThumbnailById;

var getThumbnailsByFilter = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(query) {
    var properties,
        regexToMatch,
        propertiesToMatch,
        _args5 = arguments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            properties = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : [];
            regexToMatch = {
              $regex: new RegExp(query, "ig")
            };
            propertiesToMatch = properties.map(function (property) {
              return _defineProperty({}, property, regexToMatch);
            });

            if (!(query && properties.length > 0)) {
              _context5.next = 9;
              break;
            }

            _context5.next = 6;
            return _thumbnail["default"].aggregate([{
              $match: {
                $or: propertiesToMatch
              }
            }, {
              $addFields: {
                id: {
                  $toString: "$_id"
                }
              }
            }]);

          case 6:
            return _context5.abrupt("return", _context5.sent);

          case 9:
            _context5.next = 11;
            return _thumbnail["default"].find({});

          case 11:
            return _context5.abrupt("return", _context5.sent);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getThumbnailsByFilter(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getThumbnailsByFilter = getThumbnailsByFilter;