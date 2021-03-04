"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pubsub = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("./graphql/schema");

var _graphqlSubscriptions = require("graphql-subscriptions");

var _http = require("http");

var _authentication = require("./utils/authentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pubsub = new _graphqlSubscriptions.PubSub();
exports.pubsub = pubsub;
var apolloServer = new _apolloServerExpress.ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: _schema.typeDefs,
  resolvers: _schema.resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
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
(0, _fs.existsSync)(_path["default"].join(__dirname, "../images")) || (0, _fs.mkdirSync)(_path["default"].join(__dirname, "../images")); // existsSync(path.join(__dirname, "../images/products")) ||
//   mkdirSync(path.join(__dirname, "../images/products"));
// existsSync(path.join(__dirname, "../images/products/thumbnails")) ||
//   mkdirSync(path.join(__dirname, "../images/products/thumbnails"));
// existsSync(path.join(__dirname, "../images/brands")) ||
//   mkdirSync(path.join(__dirname, "../images/brands"));
// existsSync(path.join(__dirname, "../images/brands/thumbnails")) ||
//   mkdirSync(path.join(__dirname, "../images/brands/thumbnails"));

var app = (0, _express["default"])();
app.use("/images", _express["default"]["static"](_path["default"].join(__dirname, "../images"))); // app.use(
//   "/images/brands",
//   express.static(path.join(__dirname, "../images/brands"))
// );

apolloServer.applyMiddleware({
  app: app
});
var server = (0, _http.createServer)(app); // Add subscription support

apolloServer.installSubscriptionHandlers(server); //Db connection.

_mongoose["default"].Promise = global.Promise; // Heroku Database configuration.
// var promise = mongoose.connect(
//   'mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84',
//   {
//     useNewUrlParser: true,
//   }
// );
// Local Database configuration.

var mongoPromise = _mongoose["default"].connect("mongodb://localhost/abadon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

var port = process.env.PORT || 4000; // const hostname = process.env.hostname;

var environment = process.env.NODE_ENV || "development";
mongoPromise.then(function () {
  server.listen(port, function () {
    return console.log("\uD83D\uDE80 Abadon Server [".concat(environment, "] environment running at port:").concat(port));
  });
});