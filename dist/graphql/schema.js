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

var _client = require("./client");

var _category = require("./category");

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  type Subscription {\n    newNotificationsAmmount: Int\n    notificationSent: Notification\n    productAdded: Product\n    elementAdded: Element\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  type Mutation {\n    signup(email: String, password: String, name: String): AuthPayLoad\n    login(email: String, password: String): AuthPayLoad\n    addPreachingEvent(event: PreachingInput): Preaching\n    addPublicMeeting(event: PublicMeetingInput): PublicMeeting\n    sendNotificationByUserId(\n      userId: String\n      title: String\n      text: String\n    ): Notification\n    product(\n      clientId: String\n      product: ProductInput\n      files: [Upload!]!\n    ): Product\n    client(client: ClientInput, file: Upload!): Client\n    category(category: CategoryInput, file: Upload!): Category\n    addSubcategory(\n      targetCategoryId: String\n      category: CategoryInput\n      file: Upload!\n    ): Category\n    setSubcategoriesToCategory(targetId: String, categories: [String]): Category\n    comment(comment: String, productId: String, userId: String): Comment\n    addRoom(room: RoomInput): Room\n    addElementToRoom(element: ElementInput, id: String): Element\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Query {\n    users: [User]\n    isValidToken(token: String): ValidToken\n    preachings: [Preaching]\n    publicMeetings: [PublicMeeting]\n    eventById(id: String): Event\n    allEvents: [EventOutput]\n    getEventsByDate(fromDate: String, toDate: String): [EventOutput]\n    getEventsByMonth(month: String, year: String, locale: String): [EventOutput]\n    getUnreadNotificationsSize(userId: String): UnreadNotificationsSize\n    recentEvents(today: String): [EventOutput]\n    products: [Product]\n    product(id: String): Product\n    productsByFilter(query: String, properties: [String]): [Product]\n    productCategories: [ProductCategory]\n    productsByCategory(categoryId: String): [Product]\n    promoProductsByCategory(categoryId: String): [Product]\n    clients: [Client]\n    client(id: String): Client\n    clientsByFilter(query: String, properties: [String]): [Client]\n    categories(parentId: String): [Category]\n    category(id: String): Category\n    comments(productId: String): [Comment]\n    rooms: [Room]\n    roomById(id: String): Room\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Query = (0, _apolloServer.gql)(_templateObject());
var Mutation = (0, _apolloServer.gql)(_templateObject2());
var Subscription = (0, _apolloServer.gql)(_templateObject3()); // const resolvers = {};

var typeDefs = [_user.User, _authentication.Authentication, _eventInterface.EventInterface, _preaching.Preaching, _publicMeeting.PublicMeeting, _event.Event, _notification.Notification, Query, Mutation, Subscription, _product.Product, _room.Room, _client.Client, _category.Category];
exports.typeDefs = typeDefs;
var resolvers = (0, _lodash.merge)(resolvers, _user.UserResolvers, _authentication.AuthenticationResolvers, _eventInterface.EventInterfaceResolvers, _preaching.PreachingResolvers, _publicMeeting.PublicMeetingResolvers, _event.EventResolvers, _notification.NotificationResolvers, _product.ProductResolvers, _room.RoomResolvers, _client.ClientResolvers, _category.CategoryResolvers);
exports.resolvers = resolvers;
var _default = {
  typeDefs: typeDefs,
  resolvers: resolvers
};
exports["default"] = _default;