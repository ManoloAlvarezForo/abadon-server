"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreachingResolvers = exports.Preaching = void 0;

var PrechingResolver = _interopRequireWildcard(require("../resolvers/preaching"));

var NotificationResolvers = _interopRequireWildcard(require("../resolvers/notifications"));

var _app = require("../app");

var _apolloServer = require("apollo-server");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Preaching implements EventInterface {\n    id: String\n    lead: String\n    territories: [String]\n    title: String\n    date: String\n    time: String\n    location: String\n    description: String\n    moment: String\n    type: String\n  }\n\n  input PreachingInput {\n    lead: String\n    territories: [String]\n    title: String\n    date: String\n    time: String\n    location: String\n    description: String\n    moment: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Preaching = (0, _apolloServer.gql)(_templateObject());
exports.Preaching = Preaching;
var PreachingResolvers = {
  Query: {
    preachings: function preachings() {
      return PrechingResolver.getPreachings();
    }
  },
  Mutation: {
    addPreachingEvent: function () {
      var _addPreachingEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, context) {
        var event, currentUser, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event = _ref.event;
                _context.next = 3;
                return context.user;

              case 3:
                currentUser = _context.sent;

                if (currentUser) {
                  _context.next = 6;
                  break;
                }

                throw new Error("You are not Authenticated!");

              case 6:
                _context.next = 8;
                return PrechingResolver.addEvent(event);

              case 8:
                response = _context.sent;
                _context.next = 11;
                return NotificationResolvers.sendNotificationToAll("New Preaching event was created", "A new preaching event was created please review your calendar events in the Events option.", _app.pubsub);

              case 11:
                return _context.abrupt("return", response);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addPreachingEvent(_x, _x2, _x3) {
        return _addPreachingEvent.apply(this, arguments);
      }

      return addPreachingEvent;
    }()
  }
};
exports.PreachingResolvers = PreachingResolvers;