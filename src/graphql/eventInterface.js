import { gql } from "apollo-server";

export const EventInterface = gql`
  interface EventInterface {
    title: String
    date: String
    time: String
    location: String
    description: String
  }
`;

export const EventInterfaceResolvers = {
  Query: {},
};
