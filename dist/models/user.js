"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var SCHEMA_NAME = "user";

var _default = _mongoose["default"].model(SCHEMA_NAME, new Schema({
  name: String,
  email: String,
  password: String
}));

exports["default"] = _default;