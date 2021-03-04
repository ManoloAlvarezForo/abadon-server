"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Options for the base model.
 */
var baseOptions = {
  discriminatorKey: "kind",
  // our discriminator key.
  collection: "events" // the name of our collection.

};
/**
 * Schema class.
 */

var Schema = _mongoose["default"].Schema;
/**
 * Base Event schema.
 */

var eventSchema = new Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
  createdDate: {
    type: String,
    "default": (0, _moment["default"])().format()
  }
}, baseOptions);

var _default = _mongoose["default"].model("Event", eventSchema);

exports["default"] = _default;