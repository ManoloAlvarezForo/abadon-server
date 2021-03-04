"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resolvers = exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

var _lodash = require("lodash");

var _user = require("./user");

var _authentication = require("./authentication");

var _eventInterface = require("./eventInterface");

var _preaching = require("./preaching");

var _publicMeeting = require("./publicMeeting");

var _event = require("./event");

var _notification = require("./notification");

var _product = require("./product");

var _room = require("./room");

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  type Subscription {\n    newNotificationsAmmount: Int\n    notificationSent: Notification\n    productAdded: Product\n    elementAdded: Element\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  type Mutation {\n    signup(email: String, password: String, name: String): AuthPayLoad\n    login(email: String, password: String): AuthPayLoad\n    addPreachingEvent(event: PreachingInput): Preaching\n    addPublicMeeting(event: PublicMeetingInput): PublicMeeting\n    sendNotificationByUserId(\n      userId: String\n      title: String\n      text: String\n    ): Notification\n    addProduct(product: ProductInput, file: Upload!): Product\n    addRoom(room: RoomInput): Room\n    addElementToRoom(element: ElementInput, id: String): Element\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query {\n    users: [User]\n    isValidToken(token: String): ValidToken\n    preachings: [Preaching]\n    publicMeetings: [PublicMeeting]\n    eventById(id: String): Event\n    allEvents: [EventOutput]\n    getEventsByDate(fromDate: String, toDate: String): [EventOutput]\n    getEventsByMonth(month: String, year: String, locale: String): [EventOutput]\n    getUnreadNotificationsSize(userId: String): UnreadNotificationsSize\n    recentEvents(today: String): [EventOutput]\n    products: [Product]\n    productsByFilter(query: String, properties: [String]): [Product]\n    rooms: [Room]\n    roomById(id: String): Room\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Query = (0, _apolloServer.gql)(_templateObject());
var Mutation = (0, _apolloServer.gql)(_templateObject2());
var Subscription = (0, _apolloServer.gql)(_templateObject3()); // const resolvers = {};

var typeDefs = [_user.User, _authentication.Authentication, _eventInterface.EventInterface, _preaching.Preaching, _publicMeeting.PublicMeeting, _event.Event, _notification.Notification, Query, Mutation, Subscription, _product.Product, _room.Room];
exports.typeDefs = typeDefs;
var resolvers = (0, _lodash.merge)(resolvers, _user.UserResolvers, _authentication.AuthenticationResolvers, _preaching.PreachingResolvers, _publicMeeting.PublicMeetingResolvers, _event.EventResolvers, _notification.NotificationResolvers, _product.ProductResolvers, _room.RoomResolvers); // export default makeExecutableSchema({
//   typeDefs: [
//     User,
//     Authentication,
//     EventInterface,
//     Preaching,
//     PublicMeeting,
//     Event,
//     Notification,
//     Query,
//     Mutation,
//     Subscription,
//     Product,
//     Room,
//   ],
//   resolvers: merge(
//     resolvers,
//     UserResolvers,
//     AuthenticationResolvers,
//     PreachingResolvers,
//     PublicMeetingResolvers,
//     EventResolvers,
//     NotificationResolvers,
//     ProductResolvers,
//     RoomResolvers
//   ),
//   resolverValidationOptions: { requireResolversForResolveType: false },
// });

exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;