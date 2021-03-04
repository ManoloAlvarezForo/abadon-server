"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var SCHEMA_NAME = "category";

var _default = _mongoose["default"].model(SCHEMA_NAME, new Schema({
  name: String,
  label: String,
  parent: {
    type: Schema.Types.ObjectId,
    ref: "category",
    "default": null
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: "category",
    "default": []
  }],
  thumb: {
    type: Schema.Types.ObjectId,
    ref: "thumbnail"
  },
  createdDate: {
    type: String,
    "default": (0, _moment["default"])().format()
  }
}));

exports["default"] = _default;