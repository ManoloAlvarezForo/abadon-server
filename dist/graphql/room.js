"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomResolvers = exports.Room = void 0;

var RoomResolver = _interopRequireWildcard(require("../resolvers/room"));

var _graphqlSubscriptions = require("graphql-subscriptions");

var _app = require("../app");

var _apolloServer = require("apollo-server");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Board {\n    objects: [Element]\n  }\n\n  input BoardInput {\n    objects: [ElementInput]\n  }\n\n  type Element {\n    id: String\n    elementId: String\n    angle: Int\n    backgroundColor: String\n    fill: String\n    fillRule: String\n    flipX: Boolean\n    flipY: Boolean\n    globalCompositeOperation: String\n    height: Int\n    left: Int\n    opacity: Int\n    originX: String\n    originY: String\n    paintFirst: String\n    rx: Int\n    ry: Int\n    scaleX: Int\n    scaleY: Int\n    skewX: Int\n    skewY: Int\n    strokeDashArray: [Int]\n    strokeDashOffset: Int\n    strokeLineCap: String\n    strokeLineJoin: String\n    strokeMiterLimit: Int\n    strokeWidth: Int\n    top: Int\n    transformMatrix: [Int]\n    type: String\n    visible: Boolean\n    width: Int\n  }\n\n  input ElementInput {\n    fill: String\n    left: Int\n    top: Int\n    height: Int\n    width: Int\n    type: String\n  }\n\n  type Room {\n    id: String\n    roomName: String\n    roomId: String\n    board: Board\n    createdDate: String\n  }\n\n  input RoomInput {\n    roomName: String\n    board: BoardInput\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Room = (0, _apolloServer.gql)(_templateObject());
exports.Room = Room;
var RoomResolvers = {
  Subscription: {
    elementAdded: {
      subscribe: (0, _graphqlSubscriptions.withFilter)(function () {
        return _app.pubsub.asyncIterator("elementAdded");
      }, function (payload, variables, context) {
        var user = context.user; // The payload in that case is the new preaching and the variables comes from the params.
        // return payload.commentAdded.repository_name === variables.repoFullName;

        return true;
      })
    }
  },
  Query: {
    rooms: function rooms() {
      // validateAuthentication(context.user);
      return RoomResolver.getRooms();
    },
    roomById: function roomById(_, _ref) {
      var id = _ref.id;
      return RoomResolver.getRoomById(id);
    }
  },
  Mutation: {
    addRoom: function addRoom(_, _ref2) {
      var room = _ref2.room;
      return RoomResolver.addRoom(room);
    },
    addElementToRoom: function addElementToRoom(_, _ref3) {
      var id = _ref3.id,
          element = _ref3.element;
      return RoomResolver.addElement(id, element);
    }
  }
};
exports.RoomResolvers = RoomResolvers;