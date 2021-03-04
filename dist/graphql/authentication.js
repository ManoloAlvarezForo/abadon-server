"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationResolvers = exports.Authentication = void 0;

var AuthenticationResolver = _interopRequireWildcard(require("../resolvers/authentication"));

var _apolloServer = require("apollo-server");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type AuthPayLoad {\n    token: String\n    user: User\n  }\n\n  type ValidToken {\n    isValid: Boolean\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Authentication = (0, _apolloServer.gql)(_templateObject());
exports.Authentication = Authentication;
var AuthenticationResolvers = {
  Query: {
    isValidToken: function isValidToken(_, _ref, context) {
      var token = _ref.token;
      // validateAuthentication(context.user);
      return AuthenticationResolver.isValidToken(token);
    }
  },
  Mutation: {
    signup: function signup(_, args) {
      return AuthenticationResolver.signup(args);
    },
    login: function login(_, args) {
      console.log("[INFO] Login process...");
      return AuthenticationResolver.login(args);
    }
  }
};
exports.AuthenticationResolvers = AuthenticationResolvers;