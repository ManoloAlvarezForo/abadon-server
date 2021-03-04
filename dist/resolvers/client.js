"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClientsByFilter = exports.getClientById = exports.addClient = exports.getClients = void 0;

var _client = _interopRequireDefault(require("../models/client"));

var _fileManager = require("../utils/fileManager");

var _thumbnail = require("./thumbnail");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getClients = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _client["default"].find({}).populate("thumb");

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getClients() {
    return _ref.apply(this, arguments);
  };
}();

exports.getClients = getClients;

var addClient = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(client, file) {
    var newClient, thumb, thumbnailSaved, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newClient = new _client["default"](_objectSpread({}, client));
            _context2.next = 3;
            return (0, _fileManager.uploadFile)(file);

          case 3:
            thumb = _context2.sent;

            if (thumb) {
              _context2.next = 6;
              break;
            }

            throw Error("[Error]: to upload file.");

          case 6:
            thumb["name"] = client.brand;
            _context2.next = 9;
            return (0, _thumbnail.addThumbnail)(thumb);

          case 9:
            thumbnailSaved = _context2.sent;
            newClient.thumb = thumbnailSaved._id;
            _context2.next = 13;
            return newClient.save();

          case 13:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addClient(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addClient = addClient;

var getClientById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _client["default"].findById(id).populate("thumb");

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getClientById(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getClientById = getClientById;

var getClientsByFilter = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query) {
    var properties,
        regexToMatch,
        propertiesToMatch,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            properties = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : [];
            regexToMatch = {
              $regex: new RegExp(query, "ig")
            };
            propertiesToMatch = properties.map(function (property) {
              return _defineProperty({}, property, regexToMatch);
            });

            if (!(query && properties.length > 0)) {
              _context4.next = 9;
              break;
            }

            _context4.next = 6;
            return _client["default"].aggregate([{
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
            return _context4.abrupt("return", _context4.sent);

          case 9:
            _context4.next = 11;
            return _client["default"].find({});

          case 11:
            return _context4.abrupt("return", _context4.sent);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getClientsByFilter(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getClientsByFilter = getClientsByFilter;