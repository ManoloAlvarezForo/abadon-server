"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientResolvers = exports.Client = void 0;

var _client2 = require("../resolvers/client");

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Client {\n    id: String\n    brand: String\n    responsible: String\n    nit: String\n    address: String\n    phone: String\n    cellphone: String\n    businesPhone: String\n    accountBank: String\n    bank: String\n    products: [Product]\n    createdDate: String\n    thumb: Thumb\n  }\n\n  input ClientInput {\n    brand: String!\n    responsible: String\n    nit: String\n    address: String\n    country: String\n    city: String\n    phone: String\n    cellphone: String\n    businesPhone: String\n    accountBank: String\n    bank: String\n    products: [String]\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Client = (0, _apolloServer.gql)(_templateObject());
exports.Client = Client;
var ClientResolvers = {
  Query: {
    clients: function clients() {
      // validateAuthentication(context.user);
      return (0, _client2.getClients)();
    },
    client: function client(_, _ref) {
      var id = _ref.id;
      return (0, _client2.getClientById)(id);
    },
    clientsByFilter: function clientsByFilter(_, _ref2) {
      var query = _ref2.query,
          properties = _ref2.properties;
      return (0, _client2.getClientsByFilter)(query, properties);
    }
  },
  Mutation: {
    client: function client(_, _ref3) {
      var _client = _ref3.client,
          file = _ref3.file;
      return (0, _client2.addClient)(_client, file);
    }
  }
};
exports.ClientResolvers = ClientResolvers;