"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var SALE_NAME = "sale";

var _default = _mongoose["default"].model(SALE_NAME, new Schema({
  client: String,
  nit: String,
  nitName: String,
  date: String,
  time: String,
  paymentType: String,
  pay: Number,
  change: Number,
  products: [Object],
  createdDate: {
    type: String,
    "default": (0, _moment["default"])().format()
  }
}));

exports["default"] = _default;