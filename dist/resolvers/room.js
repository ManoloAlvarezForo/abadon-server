"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addElement = exports.getRoomById = exports.addRoom = exports.getRooms = void 0;

var _room = _interopRequireDefault(require("../models/room"));

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getRooms = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _room["default"].find({});

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getRooms() {
    return _ref.apply(this, arguments);
  };
}();

exports.getRooms = getRooms;

var addRoom = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(args) {
    var newRoom, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newRoom = new _room["default"](_objectSpread({}, args));
            _context2.next = 3;
            return newRoom.save();

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addRoom(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addRoom = addRoom;

var getRoomById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _room["default"].findById(id);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getRoomById(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getRoomById = getRoomById;

var addElement = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(roomId, element) {
    var foundRoom, savedRoom, objects, elementLastAdded;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getRoomById(roomId);

          case 2:
            foundRoom = _context4.sent;

            if (foundRoom) {
              _context4.next = 5;
              break;
            }

            throw Error("Room not found.");

          case 5:
            foundRoom.board.objects.push(_objectSpread({}, element));
            _context4.next = 8;
            return foundRoom.save();

          case 8:
            savedRoom = _context4.sent;
            console.log("[INFO]: element saved. in Room [\"".concat(savedRoom.roomName, "\"]")); // TODO: improve find the last entry implementation,
            // suggestion search in mongoose model with collection properties instead pop.

            objects = savedRoom.board.objects;
            elementLastAdded = objects.pop();

            _app.pubsub.publish("elementAdded", {
              elementAdded: elementLastAdded
            });

            return _context4.abrupt("return", elementLastAdded);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function addElement(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.addElement = addElement;