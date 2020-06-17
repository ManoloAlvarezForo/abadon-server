import * as AuthenticationResolver from "../resolvers/authentication";
import { gql } from "apollo-server";

export const Authentication = gql`
  type AuthPayLoad {
    token: String
    user: User
  }

  type ValidToken {
    isValid: Boolean
  }
`;

export const AuthenticationResolvers = {
  Query: {
    isValidToken(_, { token }, context) {
      // validateAuthentication(context.user);
      return AuthenticationResolver.isValidToken(token);
    },
  },
  Mutation: {
    signup(_, args) {
      return AuthenticationResolver.signup(args);
    },
    login(_, args) {
      console.log(`[INFO] Login process...`);
      return AuthenticationResolver.login(args);
    },
  },
};
