"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _event = _interopRequireDefault(require("./event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var SCHEMA_NAME = "publicMeeting";

_event["default"].discriminator(SCHEMA_NAME, new Schema({
  meetingType: String,
  president: String,
  speaker: String,
  watchtowerGuider: String,
  watchtowerReader: String,
  type: {
    type: String,
    "default": "meeting"
  }
}));

var _default = _mongoose["default"].model(SCHEMA_NAME);

exports["default"] = _default;