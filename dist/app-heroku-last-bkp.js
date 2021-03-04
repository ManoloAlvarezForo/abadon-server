"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("./graphql/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var http = require("http");

var apollo = new _apolloServerExpress.ApolloServer({
  introspection: true,
  playground: true,
  schema: _schema["default"]
});
var app = (0, _express["default"])();
apollo.applyMiddleware({
  app: app
});
var server = http.createServer(app); // Add subscription support

apollo.installSubscriptionHandlers(server); //Db connection.

_mongoose["default"].Promise = global.Promise; // mongoose.connect('mongodb://localhost/url');
// Heroku url for Db: mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84
// Local: mongodb://localhost/twall

var promise = _mongoose["default"].connect("mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84", {
  useNewUrlParser: true
});

var port = process.env.PORT || 4000;
var hostname = process.env.hostname;
var environment = process.env.NODE_ENV;
promise.then(function (db) {
  server.listen(port, function () {
    return console.log("\uD83D\uDE80 Teocratic Wall Server (".concat(environment, ") environment running at"), "http' : ''}://".concat(hostname, ":").concat(port));
  });
});