"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMeetingResolvers = exports.PublicMeeting = void 0;

var PublicMeetingResolver = _interopRequireWildcard(require("../resolvers/publicMeeting"));

var _apolloServer = require("apollo-server");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type PublicMeeting implements EventInterface {\n    id: String\n    title: String\n    date: String\n    time: String\n    location: String\n    description: String\n    meetingType: String\n    president: String\n    speaker: String\n    watchtowerGuider: String\n    watchtowerReader: String\n    type: String\n  }\n\n  input PublicMeetingInput {\n    title: String\n    date: String\n    time: String\n    location: String\n    description: String\n    meetingType: String\n    president: String\n    speaker: String\n    watchtowerGuider: String\n    watchtowerReader: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PublicMeeting = (0, _apolloServer.gql)(_templateObject());
exports.PublicMeeting = PublicMeeting;
var PublicMeetingResolvers = {
  Query: {
    publicMeetings: function publicMeetings() {
      return PublicMeetingResolver.getPublicMeetings();
    }
  },
  Mutation: {
    addPublicMeeting: function addPublicMeeting(_, _ref) {
      var event = _ref.event;
      return PublicMeetingResolver.addEvent(event);
    }
  }
};
exports.PublicMeetingResolvers = PublicMeetingResolvers;