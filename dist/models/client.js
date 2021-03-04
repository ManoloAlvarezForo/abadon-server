"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var SCHEMA_NAME = "client";

var _default = _mongoose["default"].model(SCHEMA_NAME, new Schema({
  brand: String,
  responsible: String,
  thumb: {
    type: Schema.Types.ObjectId,
    ref: "thumbnail"
  },
  nit: {
    type: String,
    "default": ""
  },
  address: {
    type: String,
    "default": ""
  },
  country: {
    type: String,
    "default": ""
  },
  city: {
    type: String,
    "default": ""
  },
  phone: String,
  cellphone: String,
  businesPhone: String,
  accountBank: String,
  bank: String,
  createdDate: {
    type: String,
    "default": (0, _moment["default"])().format()
  }
}));

exports["default"] = _default;