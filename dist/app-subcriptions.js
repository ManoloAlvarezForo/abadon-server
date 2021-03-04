"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pubsub = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _graphqlSubscriptions = require("graphql-subscriptions");

var _http = require("http");

var _authentication = require("./utils/authentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pubsub = new _graphqlSubscriptions.PubSub();
exports.pubsub = pubsub;
var configurations = {
  // Note: You may need sudo to run on port 443
  production: {
    ssl: true,
    port: 8443,
    hostname: "localhost"
  },
  development: {
    ssl: false,
    port: 4000,
    hostname: "localhost"
  }
};
var environment = process.env.NODE_ENV || "development";
var config = configurations[environment];
var apolloServer = new _apolloServerExpress.ApolloServer({
  schema: _schema["default"],
  context: function () {
    var _context = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var req, connection, token, user;
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = _ref.req, connection = _ref.connection;

              if (!connection) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", connection.context);

            case 5:
              token = req.headers.authorization || "";
              _context2.next = 8;
              return (0, _authentication.getUserAuthenticated)(token);

            case 8:
              user = _context2.sent;
              return _context2.abrupt("return", {
                user: user
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));

    function context(_x) {
      return _context.apply(this, arguments);
    }

    return context;
  }(),
  subscriptions: {
    onConnect: function () {
      var _onConnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(connectionParams, webSocket) {
        var token, user;
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!connectionParams.authorization) {
                  _context3.next = 6;
                  break;
                }

                token = connectionParams.authorization;
                _context3.next = 4;
                return (0, _authentication.getUserAuthenticated)(token);

              case 4:
                user = _context3.sent;
                return _context3.abrupt("return", {
                  user: user
                });

              case 6:
                throw new Error("You are not Authenticated!");

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2);
      }));

      function onConnect(_x2, _x3) {
        return _onConnect.apply(this, arguments);
      }

      return onConnect;
    }()
  }
});
var app = (0, _express["default"])();
apolloServer.applyMiddleware({
  app: app
});
var server = (0, _http.createServer)(app); // Add subscription support

apolloServer.installSubscriptionHandlers(server); //Db connection.

_mongoose["default"].Promise = global.Promise; // mongoose.connect('mongodb://localhost/url');
// Heroku url for Db: mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84
// Local: mongodb://localhost/twall

var promise = _mongoose["default"].connect("mongodb://localhost/twall", {
  useNewUrlParser: true
});

var port = process.env.PORT || 4000;
promise.then(function (db) {
  server.listen(config.port, function () {
    return console.log("\uD83D\uDE80 Theocratic Wall Server [".concat(environment, "] is running at http").concat(config.ssl ? "s" : "", "://").concat(config.hostname, ":").concat(config.port).concat(apolloServer.graphqlPath));
  });
});