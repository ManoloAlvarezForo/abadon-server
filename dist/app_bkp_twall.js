"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServerExpress = require("apollo-server-express");

var _path = _interopRequireDefault(require("path"));

var _schema = _interopRequireDefault(require("./graphql/schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import schemas from './graphql/schemas';
// import resolvers from './graphql/resolvers';
var fs = require("fs");

var https = require("https");

var http = require("http"); // const {getUserId} = require('./utils/utils')


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
var config = configurations[environment]; // const schema = makeExecutableSchema({
//   typeDefs: schemas,
//   resolvers,
//   resolverValidationOptions: { requireResolversForResolveType: false },
// });

var apollo = new _apolloServerExpress.ApolloServer({
  schema: _schema["default"]
});
var app = (0, _express["default"])();
apollo.applyMiddleware({
  app: app
}); // Create the HTTPS or HTTP server, per configuration
//Fixed to load cert and key files using path and __dirname

var keyPath = _path["default"].join(__dirname, "./ssl_files/noox-key.pem");

var key = fs.readFileSync(keyPath);

var certPath = _path["default"].join(__dirname, "./ssl_files/noox-cert.pem");

var cert = fs.readFileSync(certPath);
var server;

if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer({
    key: key,
    cert: cert
  }, app);
} else {
  server = http.createServer(app);
} // Add subscription support


apollo.installSubscriptionHandlers(server); //Db connection.

_mongoose["default"].Promise = global.Promise; // mongoose.connect('mongodb://localhost/url');
// Heroku url for Db: mongodb://heroku_83d9bs84:tb9qh5oc92uku07c1q9v1g8rof@ds121696.mlab.com:21696/heroku_83d9bs84
// Local: mongodb://localhost/twall

var promise = _mongoose["default"].connect("mongodb://localhost/twall", {
  useNewUrlParser: true
});

var port = process.env.PORT || 4000;
promise.then(function (db) {
  server.listen(config.port, function () {
    return console.log("\uD83D\uDE80 Teocratic Wall Server (".concat(environment, ") environment running at"), "http".concat(config.ssl ? "s" : "", "://").concat(config.hostname, ":").concat(config.port).concat(apollo.graphqlPath));
  });
});