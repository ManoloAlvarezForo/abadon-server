"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventInterfaceResolvers = exports.EventInterface = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  interface EventInterface {\n    title: String\n    date: String\n    time: String\n    location: String\n    description: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var EventInterface = (0, _apolloServer.gql)(_templateObject());
exports.EventInterface = EventInterface;
var EventInterfaceResolvers = {
  Query: {}
};
exports.EventInterfaceResolvers = EventInterfaceResolvers;