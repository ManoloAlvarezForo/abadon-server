"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventResolvers = exports.Event = void 0;

var EventResolver = _interopRequireWildcard(require("../resolvers/event"));

var _apolloServer = require("apollo-server");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  union Events = Preaching | PublicMeeting\n  union Event = Preaching | PublicMeeting\n\n  type EventOutput {\n    date: String\n    events: [Events]\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Event = (0, _apolloServer.gql)(_templateObject());
exports.Event = Event;
var EventResolvers = {
  Query: {
    allEvents: function allEvents() {
      return EventResolver.getEvents();
    },
    getEventsByDate: function getEventsByDate(_, _ref) {
      var fromDate = _ref.fromDate,
          toDate = _ref.toDate;
      return EventResolver.getEventsByDate(fromDate, toDate);
    },
    getEventsByMonth: function getEventsByMonth(_, _ref2) {
      var month = _ref2.month,
          year = _ref2.year,
          locale = _ref2.locale;
      return EventResolver.getEventsByMonth(month, year, locale);
    },
    eventById: function eventById(_, _ref3) {
      var id = _ref3.id;
      return EventResolver.getEventById(id);
    },
    recentEvents: function recentEvents(_, _ref4) {
      var today = _ref4.today;
      return EventResolver.getRecentEvents(today);
    }
  },
  Event: {
    __resolveType: function __resolveType(obj) {
      if (obj.kind === "preaching") {
        return "Preaching";
      }

      if (obj.kind === "publicMeeting") {
        return "PublicMeeting";
      }

      return null;
    }
  },
  Events: {
    __resolveType: function __resolveType(obj) {
      if (obj.kind === "preaching") {
        return "Preaching";
      }

      if (obj.kind === "publicMeeting") {
        return "PublicMeeting";
      }

      return null;
    }
  }
};
exports.EventResolvers = EventResolvers;