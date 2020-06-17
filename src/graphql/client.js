import {
  getClients,
  getClientById,
  getClientsByFilter,
  addClient,
} from "../resolvers/client";
import { gql } from "apollo-server";

export const Client = gql`
  type Client {
    id: String
    brand: String
    responsible: String
    nit: String
    address: String
    phone: String
    cellphone: String
    businesPhone: String
    accountBank: String
    bank: String
    products: [Product]
    createdDate: String
    thumb: Thumb
  }

  input ClientInput {
    brand: String!
    responsible: String
    nit: String
    address: String
    country: String
    city: String
    phone: String
    cellphone: String
    businesPhone: String
    accountBank: String
    bank: String
    products: [String]
  }
`;

export const ClientResolvers = {
  Query: {
    clients: () => {
      // validateAuthentication(context.user);
      return getClients();
    },
    client: (_, { id }) => {
      return getClientById(id);
    },
    clientsByFilter: (_, { query, properties }) => {
      return getClientsByFilter(query, properties);
    },
  },
  Mutation: {
    client: (_, { client, file }) => {
      return addClient(client, file);
    },
  },
};
