"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//TODO Please Refactor this schema like another.
var Schema = _mongoose["default"].Schema;
/**
 * Product mongoose schema.
 */

var _default = _mongoose["default"].model("publisher", new Schema({
  name: String,
  avatar: String,
  lastName: String,
  fullNane: String,
  phone: String,
  isLeader: {
    type: String,
    "default": false
  },
  isPartOfLifeAndMinistry: {
    type: String,
    "default": false
  },
  isReaderForTheMeetings: {
    type: String,
    "default": false
  },
  genre: String,
  age: String,
  createdDate: {
    type: String,
    "default": (0, _moment["default"])().format()
  }
}));

exports["default"] = _default;