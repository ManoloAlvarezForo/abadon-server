import * as UserResolver from "../resolvers/user";
import { gql } from "apollo-server";

export const User = gql`
  type User {
    id: String
    name: String
    email: String
  }
`;

export const UserResolvers = {
  Query: {
    users() {
      // validateAuthentication(context.user);
      return UserResolver.getUsers();
    },
  },
};
